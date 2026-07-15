// ============================================================
// GDP, Income & Expenditure (Part 1) — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }
function parseNums(str){
  return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}
function svgEl(tag, attrs){
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
function fmtBig(n){
  if (Math.abs(n) >= 1e9) return (n/1e9).toFixed(2)+'B';
  if (Math.abs(n) >= 1e6) return (n/1e6).toFixed(2)+'M';
  if (Math.abs(n) >= 1e3) return (n/1e3).toFixed(2)+'K';
  return fmt(n,2);
}

/* ============================================================
   01 — Circular flow diagram (static)
   ============================================================ */
(function(){
  const container = document.getElementById('circularFlowChart');
  if (!container) return;
  const W=480, H=220;
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:520px;'});
  // households box
  svg.appendChild(svgEl('rect', {x:20, y:80, width:120, height:60, rx:8, fill:'#2B2560'}));
  const hLabel = svgEl('text', {x:80, y:114, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':11, fill:'#fff', 'font-weight':'700'});
  hLabel.textContent = 'Households';
  svg.appendChild(hLabel);
  // firms box
  svg.appendChild(svgEl('rect', {x:340, y:80, width:120, height:60, rx:8, fill:'#C77F1E'}));
  const fLabel = svgEl('text', {x:400, y:114, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':11, fill:'#fff', 'font-weight':'700'});
  fLabel.textContent = 'Firms';
  svg.appendChild(fLabel);
  // top arrow: labor/capital -> income £100
  svg.appendChild(svgEl('line', {x1:140, y1:90, x2:340, y2:90, stroke:'#2F8F6B', 'stroke-width':2, 'marker-end':'url(#arrow1)'}));
  const t1 = svgEl('text', {x:240, y:80, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#1c5b41'});
  t1.textContent = 'Income £100 ← Labor & Capital';
  svg.appendChild(t1);
  // bottom arrow: goods/services <- expenditure £100
  svg.appendChild(svgEl('line', {x1:340, y1:130, x2:140, y2:130, stroke:'#8B5CF6', 'stroke-width':2, 'marker-end':'url(#arrow2)'}));
  const t2 = svgEl('text', {x:240, y:150, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#5b3fa6'});
  t2.textContent = 'Goods & Services ← Expenditure £100';
  svg.appendChild(t2);
  // arrow markers
  const defs = svgEl('defs', {});
  const marker1 = svgEl('marker', {id:'arrow1', markerWidth:8, markerHeight:8, refX:6, refY:3, orient:'auto'});
  marker1.appendChild(svgEl('path', {d:'M0,0 L6,3 L0,6 Z', fill:'#2F8F6B'}));
  defs.appendChild(marker1);
  const marker2 = svgEl('marker', {id:'arrow2', markerWidth:8, markerHeight:8, refX:6, refY:3, orient:'auto'});
  marker2.appendChild(svgEl('path', {d:'M0,0 L6,3 L0,6 Z', fill:'#8B5CF6'}));
  defs.appendChild(marker2);
  svg.insertBefore(defs, svg.firstChild);
  container.appendChild(svg);
})();

/* ============================================================
   02 — Value-added calculator
   ============================================================ */
(function(){
  const input = document.getElementById('vaInput');
  const tableContainer = document.getElementById('vaTable');
  if (!input) return;
  function render(){
    const receipts = parseNums(input.value);
    let html = '<table class="exhibit" style="margin:0; min-width:320px;"><tr><th>Stage</th><th>Receipts</th><th>Value Added</th></tr>';
    let prev = 0, total = 0;
    receipts.forEach((r, i) => {
      const va = r - prev;
      total += va;
      html += `<tr><td>${i+1}</td><td class="num">${fmt(r,2)}</td><td class="num">${fmt(va,2)}</td></tr>`;
      prev = r;
    });
    html += `<tr><td><strong>Total</strong></td><td class="num">—</td><td class="num"><strong>${fmt(total,2)}</strong></td></tr>`;
    html += '</table>';
    tableContainer.innerHTML = html;
  }
  input.addEventListener('input', render);
  render();
})();

/* ============================================================
   03 — Nominal/Real GDP & deflator calculator
   ============================================================ */
(function(){
  const pBaseI = document.getElementById('gdpPBase'), pCurI = document.getElementById('gdpPCurrent');
  const qBaseI = document.getElementById('gdpQBase'), qCurI = document.getElementById('gdpQCurrent');
  const out = document.getElementById('gdpOut');
  if (!pBaseI) return;
  function render(){
    const pBase = parseFloat(pBaseI.value), pCur = parseFloat(pCurI.value);
    const qBase = parseFloat(qBaseI.value), qCur = parseFloat(qCurI.value);
    const nominal = pCur * qCur;
    const real = pBase * qCur;
    const deflator = (nominal/real) * 100;
    out.innerHTML = `
      <div class="stat-readout"><div class="k">Nominal GDP</div><div class="v">${fmtBig(nominal)}</div></div>
      <div class="stat-readout"><div class="k">Real GDP</div><div class="v">${fmtBig(real)}</div></div>
      <div class="stat-readout"><div class="k">Deflator</div><div class="v">${fmt(deflator,1)}</div></div>
    `;
  }
  [pBaseI,pCurI,qBaseI,qCurI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   04 — GDP components calculator + bar chart
   ============================================================ */
(function(){
  const cI = document.getElementById('gcC'), iI = document.getElementById('gcI'),
        gI = document.getElementById('gcG'), nxI = document.getElementById('gcNX');
  const result = document.getElementById('gcResult');
  const chartContainer = document.getElementById('gcChart');
  if (!cI) return;
  function render(){
    const c = parseFloat(cI.value), i = parseFloat(iI.value), g = parseFloat(gI.value), nx = parseFloat(nxI.value);
    const gdp = c+i+g+nx;
    result.textContent = `GDP = ${fmtBig(gdp)}`;
    // stacked bar
    const parts = [
      {label:'C', val:c, color:'#2B2560'},
      {label:'I', val:i, color:'#2F8F6B'},
      {label:'G', val:g, color:'#C77F1E'},
      {label:'X−M', val:nx, color:'#8B5CF6'},
    ];
    const total = parts.reduce((a,p)=>a+Math.abs(p.val),0);
    const wrap = document.createElement('div');
    wrap.style.display='flex'; wrap.style.height='40px'; wrap.style.borderRadius='6px'; wrap.style.overflow='hidden';
    parts.forEach(p => {
      if (p.val === 0) return;
      const seg = document.createElement('div');
      seg.style.width = (Math.abs(p.val)/total*100)+'%';
      seg.style.background = p.color;
      seg.style.display='flex'; seg.style.alignItems='center'; seg.style.justifyContent='center';
      seg.style.color='#fff'; seg.style.fontFamily='var(--font-mono)'; seg.style.fontSize='.68rem'; seg.style.fontWeight='700';
      seg.title = `${p.label}: ${fmt(p.val,0)}`;
      seg.textContent = p.label;
      wrap.appendChild(seg);
    });
    chartContainer.innerHTML = '';
    chartContainer.appendChild(wrap);
  }
  [cI,iI,gI,nxI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   05 — Saving/Investment/Fiscal/Trade identity solver
   ============================================================ */
(function(){
  const sI = document.getElementById('idS'), iI = document.getElementById('idI'), gtI = document.getElementById('idGT');
  const result = document.getElementById('idResult'), steps = document.getElementById('idSteps');
  if (!sI) return;
  function render(){
    const s = parseFloat(sI.value), i = parseFloat(iI.value), gt = parseFloat(gtI.value);
    const xm = s - i - gt;
    result.textContent = `Trade balance (X−M) = ${fmt(xm,1)}%`;
    steps.textContent = `${s} = ${i} + ${gt} + (X−M) → X−M = ${fmt(xm,1)}%`;
  }
  [sI,iI,gtI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   Check-in mini quizzes
   ============================================================ */
(function(){
  document.querySelectorAll('.checkin').forEach(box => {
    const btns = box.querySelectorAll('.opt-btn');
    const feedback = box.querySelector('.checkin-feedback');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        btns.forEach(b => b.disabled = true);
        btns.forEach(b => { if (b.dataset.correct === 'true') b.classList.add('correct'); });
        if (btn.dataset.correct !== 'true') btn.classList.add('incorrect');
        feedback.classList.add('show');
        markSectionProgress(box.closest('section').id);
      });
    });
  });
})();

/* ============================================================
   Sidebar scroll-spy + progress + mobile toggle
   ============================================================ */
const sectionIds = ['sec-gdpdefinition','sec-valueadded','sec-nominalreal','sec-components','sec-savingidentity','sec-quiz'];
const visited = new Set();

function markSectionProgress(id){
  if (sectionIds.includes(id)){
    visited.add(id);
    updateProgress();
  }
}
function updateProgress(){
  const pct = Math.round((visited.size / sectionIds.length) * 100);
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressPct');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
  sectionIds.forEach(id => {
    const link = document.querySelector(`.toc a[data-sec="${id}"]`);
    if (link && visited.has(id)) link.classList.add('done');
  });
  try { localStorage.setItem('cfa-progress-gdp-income', String(pct)); } catch(e) {}
}

(function(){
  const links = document.querySelectorAll('.toc a[data-sec]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.toc a[data-sec="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting){
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        markSectionProgress(id);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle){
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.querySelectorAll('.toc a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
  }
})();

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ = [
  {
    concept: "What Is GDP?",
    q: "GDP can be measured using which two approaches that yield the same result?",
    opts: ["Income and expenditure", "Profit and loss", "Supply and demand"],
    correct: 0,
    exp: "The income approach (summing all income earned) and the expenditure approach (summing all spending) must yield identical totals, since one person's spending is another's income."
  },
  {
    concept: "What Is GDP?",
    q: "A person spends 3 hours per week doing their own home repairs instead of hiring a contractor. How does this affect GDP?",
    opts: ["It increases GDP by the market value of the repairs", "It has no effect on GDP, since no market transaction occurred", "It decreases GDP"],
    correct: 1,
    exp: "GDP only counts market transactions with an observable price. Unpaid household labor, however valuable, is excluded."
  },
  {
    concept: "The Value-Added Method",
    q: "A steel producer sells $2,000 of steel to a car manufacturer, who uses it (plus other inputs) to build a car sold for $30,000. What is the steel's direct contribution to GDP?",
    opts: ["$2,000, counted separately", "$0 directly — its value is embedded in the car's final $30,000 price", "$32,000"],
    correct: 1,
    exp: "The steel is an intermediate good; only the final sale price of the car counts toward GDP, and the steel's value is already included within it."
  },
  {
    concept: "Nominal vs. Real GDP",
    q: "A country produced identical output in two consecutive years, but prices rose 5%. What happened to nominal GDP and real GDP respectively?",
    opts: ["Both rose 5%", "Nominal GDP rose 5%, real GDP was unchanged", "Nominal GDP was unchanged, real GDP fell 5%"],
    correct: 1,
    exp: "Nominal GDP reflects current prices, so it rises with inflation even with flat output. Real GDP, using fixed base-year prices, only moves when actual output moves — so it stays flat."
  },
  {
    concept: "Nominal vs. Real GDP",
    q: "The GDP deflator is calculated as:",
    opts: ["(Real GDP / Nominal GDP) × 100", "(Nominal GDP / Real GDP) × 100", "Nominal GDP − Real GDP"],
    correct: 1,
    exp: "GDP deflator = (Nominal GDP / Real GDP) × 100 — it measures how much of nominal GDP's change is due to price changes rather than real output changes."
  },
  {
    concept: "Nominal vs. Real GDP",
    q: "If nominal GDP grew 8% and the GDP deflator rose from 100 to 103, approximately what was real GDP growth?",
    opts: ["11%", "About 5%", "8%"],
    correct: 1,
    exp: "Real GDP growth ≈ nominal growth − inflation ≈ 8% − 3% = 5%."
  },
  {
    concept: "The Components of GDP",
    q: "In the expenditure approach, GDP = C + I + G + (X − M). What does the 'I' represent?",
    opts: ["Interest payments on government debt", "Business investment in capital goods plus inventory changes", "Individual income tax revenue"],
    correct: 1,
    exp: "I is gross private domestic investment — spending on capital goods (plant, equipment) plus the change in business inventories."
  },
  {
    concept: "The Components of GDP",
    q: "A household's marginal propensity to consume (MPC) is 0.6. What is its marginal propensity to save (MPS)?",
    opts: ["0.6", "0.4", "1.6"],
    correct: 1,
    exp: "MPC + MPS = 1, so MPS = 1 − 0.6 = 0.4."
  },
  {
    concept: "The Components of GDP",
    q: "Which factor is the primary driver of consumption spending, according to the standard consumption function C = C(Y−T)?",
    opts: ["The unemployment rate", "Disposable income", "The exchange rate"],
    correct: 1,
    exp: "The consumption function models spending as primarily determined by disposable income (GDP minus net taxes)."
  },
  {
    concept: "The Components of GDP",
    q: "Investment spending (I) is modeled as a function of which two factors?",
    opts: ["The real interest rate and aggregate output", "The unemployment rate and exports", "Consumer confidence and the GDP deflator alone"],
    correct: 0,
    exp: "I = I(r, Y): investment falls as the real interest rate rises (higher cost of financing) and rises with aggregate output (a proxy for expected profitability)."
  },
  {
    concept: "Saving, Investment & the Trade Balance",
    q: "The fundamental macroeconomic identity linking saving, investment, the fiscal balance, and the trade balance is:",
    opts: ["S = I + (G − T) + (X − M)", "S = I − (G − T) − (X − M)", "S = C + I + G"],
    correct: 0,
    exp: "This identity shows domestic private saving is absorbed by investment, government deficit financing, or net foreign lending (a trade surplus)."
  },
  {
    concept: "Saving, Investment & the Trade Balance",
    q: "A country has private saving of 20% of GDP, investment of 22% of GDP, and a balanced government budget. What must its trade balance be?",
    opts: ["A 2% of GDP trade surplus", "A 2% of GDP trade deficit", "Exactly balanced trade"],
    correct: 1,
    exp: "S = I + (G−T) + (X−M) → 20 = 22 + 0 + (X−M) → X−M = −2%, a trade deficit, since investment exceeds domestic saving and the gap must be funded by foreign capital."
  },
  {
    concept: "Saving, Investment & the Trade Balance",
    q: "A government fiscal deficit [(G−T)>0] must be offset by which combination, according to the macro identity?",
    opts: ["The private sector saving more than it invests, a trade deficit, or some mix of both", "Higher GDP growth alone", "A stronger currency"],
    correct: 0,
    exp: "Rearranging the identity: G−T = (S−I) − (X−M). A fiscal deficit requires either private saving to exceed investment, a trade deficit (foreign capital inflow), or both."
  },
  {
    concept: "What Is GDP?",
    q: "Which of these is EXCLUDED from GDP under the 'only current production' rule?",
    opts: ["A newly built house sold this year", "A used car resold this year", "A haircut purchased this year"],
    correct: 1,
    exp: "A used car was produced in a previous period; reselling it today doesn't represent new production, so it's excluded from this year's GDP."
  },
  {
    concept: "The Components of GDP",
    q: "Household consumption as a share of GDP tends to be higher in the United States (68%) than in Germany (52%). What does this suggest about US household spending behavior relative to Germany's?",
    opts: ["US households are less sensitive to changes in disposable income", "US households are more sensitive to changes in disposable income", "There is no meaningful difference"],
    correct: 1,
    exp: "A higher consumption share (approximating a higher average propensity to consume) suggests spending responds more strongly to changes in household income."
  },
  {
    concept: "What Is GDP?",
    q: "Why do national statistical agencies typically calculate GDP using both the income and expenditure approaches independently?",
    opts: ["It's legally required in all countries", "As a built-in consistency check, since both approaches must yield the same total", "Because the two approaches measure different things"],
    correct: 1,
    exp: "Since income and expenditure are two views of the same economic activity, computing both independently serves as a cross-check on data quality."
  },
  {
    concept: "The Value-Added Method",
    q: "A furniture maker buys $300 of wood and turns it into a table sold for $900. What is the value added at the furniture maker's stage?",
    opts: ["$900", "$600", "$300"],
    correct: 1,
    exp: "Value added = selling price − cost of inputs purchased = $900 − $300 = $600."
  },
  {
    concept: "What Is GDP?",
    q: "A capital gain from a stock price increase is:",
    opts: ["Included in GDP as investment income", "Excluded from GDP, since no new production occurred", "Included in GDP only if the stock is later sold"],
    correct: 1,
    exp: "Capital gains reflect asset revaluation, not newly produced goods or services, so they are excluded from GDP entirely."
  },
  {
    concept: "Nominal vs. Real GDP",
    q: "Real GDP per capita is often used as a proxy for:",
    opts: ["A country's population growth rate", "The average standard of living in a country", "The government's fiscal deficit"],
    correct: 1,
    exp: "Dividing real GDP by population adjusts for country size, making it a commonly used (if imperfect) measure of average material living standards."
  },
  {
    concept: "Saving, Investment & the Trade Balance",
    q: "If a country's investment (I) exceeds its private saving (S), with a balanced government budget, its trade balance must be:",
    opts: ["A trade surplus", "A trade deficit", "Impossible to have investment exceed saving"],
    correct: 1,
    exp: "Since S = I + (G−T) + (X−M), if I > S and (G−T)=0, then (X−M) must be negative — a trade deficit funding the investment shortfall via foreign capital."
  }
];

(function(){
  const shell = document.getElementById('quizShell');
  if (!shell) return;
  let current = 0;
  let score = 0;
  const answered = new Array(QUIZ.length).fill(null);

  function renderQuestion(){
    const item = QUIZ[current];
    let html = `<div class="quiz-progress">Question ${current+1} of ${QUIZ.length} &nbsp;·&nbsp; Score so far: ${score}</div>`;
    html += `<div class="quiz-q">${item.q}</div>`;
    html += `<div class="opt-list" id="quizOpts">`;
    item.opts.forEach((opt, i) => {
      html += `<button class="opt-btn" data-i="${i}">${opt}</button>`;
    });
    html += `</div>`;
    html += `<div class="quiz-explain" id="quizExplain">${item.exp}</div>`;
    html += `<div class="quiz-nav">
      <button class="btn ghost" id="quizPrev" ${current===0 ? 'disabled' : ''}>← Previous</button>
      <button class="btn" id="quizNext" disabled>${current === QUIZ.length-1 ? 'See score' : 'Next →'}</button>
    </div>`;
    shell.innerHTML = html;

    const opts = shell.querySelectorAll('.opt-btn');
    const explain = document.getElementById('quizExplain');
    const nextBtn = document.getElementById('quizNext');
    const prevBtn = document.getElementById('quizPrev');

    if (answered[current] !== null){
      opts.forEach(btn => {
        btn.disabled = true;
        const i = +btn.dataset.i;
        if (i === item.correct) btn.classList.add('correct');
        else if (i === answered[current]) btn.classList.add('incorrect');
      });
      explain.classList.add('show');
      nextBtn.disabled = false;
    }

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered[current] !== null) return;
        const i = +btn.dataset.i;
        answered[current] = i;
        if (i === item.correct) score++;
        if (typeof cfaRecordAnswer === "function" && item.concept){
          cfaRecordAnswer(item.concept, "GDP, Income & Expenditure", i === item.correct);
        }
        opts.forEach(b => {
          b.disabled = true;
          const bi = +b.dataset.i;
          if (bi === item.correct) b.classList.add('correct');
          else if (bi === i) b.classList.add('incorrect');
        });
        explain.classList.add('show');
        nextBtn.disabled = false;
        markSectionProgress('sec-quiz');
      });
    });

    nextBtn.addEventListener('click', () => {
      if (current < QUIZ.length - 1){ current++; renderQuestion(); }
      else { renderScore(); }
    });
    prevBtn.addEventListener('click', () => {
      if (current > 0){ current--; renderQuestion(); }
    });
  }

  function renderScore(){
    const pct = Math.round((score / QUIZ.length) * 100);
    let msg = "Solid foundation — review the sections you missed and try again.";
    if (pct >= 90) msg = "Excellent — you've genuinely internalized this reading.";
    else if (pct >= 70) msg = "Good work — a couple of gaps worth revisiting.";
    shell.innerHTML = `
      <div class="quiz-score">
        <div style="font-family:var(--font-mono); font-size:.8rem; color:var(--ink-soft); text-transform:uppercase; letter-spacing:.08em;">Final score</div>
        <div class="big">${score} / ${QUIZ.length}</div>
        <p style="max-width:46ch; margin:10px auto 22px; color:var(--ink-soft);">${msg}</p>
        <button class="btn" id="quizRestart">Retake the quiz</button>
      </div>`;
    document.getElementById('quizRestart').addEventListener('click', () => {
      current = 0; score = 0;
      answered.fill(null);
      renderQuestion();
    });
  }

  renderQuestion();
})();
