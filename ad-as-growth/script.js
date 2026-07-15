// ============================================================
// Aggregate Demand, Supply & Growth (Part 2) — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }
function svgEl(tag, attrs){
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

/* ============================================================
   01 — AD curve chart (static illustrative)
   ============================================================ */
(function(){
  const container = document.getElementById('adCurveChart');
  if (!container) return;
  const W=460, H=240, padL=44, padR=20, padT=20, padB=32;
  const xScale = y => padL + (y/100)*(W-padL-padR);
  const yScale = p => (H-padB) - (p/100)*(H-padT-padB);
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:480px;'});
  svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  // downward curve from (10,90) to (90,10)
  svg.appendChild(svgEl('line', {x1:xScale(10), y1:yScale(90), x2:xScale(90), y2:yScale(10), stroke:'#2B2560', 'stroke-width':2.5}));
  // points A (lower price, higher Y) and B (higher price, lower Y)
  const A = {y:65, p:35}, B = {y:35, p:65};
  [[A,'A','#2F8F6B'],[B,'B','#D6573F']].forEach(([pt,label,color]) => {
    svg.appendChild(svgEl('circle', {cx:xScale(pt.y), cy:yScale(pt.p), r:5, fill:color, stroke:'#fff', 'stroke-width':1.5}));
    const t = svgEl('text', {x:xScale(pt.y)+8, y:yScale(pt.p)-6, 'font-family':'IBM Plex Mono', 'font-size':10, fill:color, 'font-weight':'700'});
    t.textContent = label;
    svg.appendChild(t);
  });
  svg.appendChild(svgEl('line', {x1:xScale(A.y), y1:yScale(A.p), x2:xScale(B.y), y2:yScale(B.p), stroke:'#C77F1E', 'stroke-width':1, 'stroke-dasharray':'3,2'}));
  const adLabel = svgEl('text', {x:xScale(85), y:yScale(15)-4, 'text-anchor':'end', 'font-family':'IBM Plex Mono', 'font-size':10, fill:'#2B2560', 'font-weight':'700'});
  adLabel.textContent = 'AD';
  svg.appendChild(adLabel);
  const ylabel = svgEl('text', {x:10, y:padT+6, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  ylabel.textContent = 'Price Level';
  svg.appendChild(ylabel);
  const xlabel = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  xlabel.textContent = 'Real GDP (Income, Output)';
  svg.appendChild(xlabel);
  container.appendChild(svg);
})();

/* ============================================================
   02 — AS curve chart (VSRAS, SRAS, LRAS)
   ============================================================ */
(function(){
  const container = document.getElementById('asCurveChart');
  if (!container) return;
  const W=460, H=240, padL=44, padR=20, padT=20, padB=32;
  const xScale = y => padL + (y/100)*(W-padL-padR);
  const yScale = p => (H-padB) - (p/100)*(H-padT-padB);
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:480px;'});
  svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  // LRAS - vertical at Y=55
  svg.appendChild(svgEl('line', {x1:xScale(55), y1:padT, x2:xScale(55), y2:H-padB, stroke:'#2B2560', 'stroke-width':2.5}));
  // SRAS - upward sloping through (30,20) to (75,85)
  svg.appendChild(svgEl('line', {x1:xScale(30), y1:yScale(20), x2:xScale(75), y2:yScale(85), stroke:'#C77F1E', 'stroke-width':2.5}));
  // VSRAS - flat at P=35
  svg.appendChild(svgEl('line', {x1:xScale(20), y1:yScale(35), x2:xScale(70), y2:yScale(35), stroke:'#2F8F6B', 'stroke-width':2.5}));
  const labels = [[55,88,'LRAS','#2B2560'],[76,83,'SRAS','#C77F1E'],[71,38,'VSRAS','#2F8F6B']];
  labels.forEach(([y,p,txt,color]) => {
    const t = svgEl('text', {x:xScale(y)+4, y:yScale(p), 'font-family':'IBM Plex Mono', 'font-size':9, fill:color, 'font-weight':'700'});
    t.textContent = txt;
    svg.appendChild(t);
  });
  const ylabel = svgEl('text', {x:10, y:padT+6, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  ylabel.textContent = 'Price Level';
  svg.appendChild(ylabel);
  const xlabel = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  xlabel.textContent = 'Output, Y';
  svg.appendChild(xlabel);
  container.appendChild(svg);
})();

/* ============================================================
   05 — Growth accounting calculator
   ============================================================ */
(function(){
  const tfpI = document.getElementById('gaTFP'), lI = document.getElementById('gaL'),
        kI = document.getElementById('gaK'), wlI = document.getElementById('gaWL');
  const result = document.getElementById('gaResult'), steps = document.getElementById('gaSteps');
  if (!tfpI) return;
  function render(){
    const tfp = parseFloat(tfpI.value), l = parseFloat(lI.value), k = parseFloat(kI.value);
    const wl = parseFloat(wlI.value), wk = 1 - wl;
    const growth = tfp + wl*l + wk*k;
    result.textContent = `Potential GDP growth = ${fmt(growth,2)}%`;
    steps.textContent = `${tfp} + ${fmt(wl,2)}(${l}) + ${fmt(wk,2)}(${k}) = ${fmt(growth,2)}%`;
  }
  [tfpI,lI,kI,wlI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   06 — Labor productivity calculator
   ============================================================ */
(function(){
  const gdpI = document.getElementById('lpGDP'), hoursI = document.getElementById('lpHours');
  const result = document.getElementById('lpResult');
  if (!gdpI) return;
  function render(){
    const gdp = parseFloat(gdpI.value), hours = parseFloat(hoursI.value);
    const productivity = gdp / hours;
    result.textContent = `Labor productivity = $${fmt(productivity,2)} / hour`;
  }
  [gdpI,hoursI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-addemand','sec-assupply','sec-shifts','sec-equilibria','sec-production','sec-sustainable','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-ad-as-growth', String(pct)); } catch(e) {}
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
    concept: "The Aggregate Demand Curve",
    q: "The aggregate demand curve slopes downward primarily because of three effects. Which of these is NOT one of them?",
    opts: ["The wealth effect", "The interest rate effect", "The substitution-for-labor effect"],
    correct: 2,
    exp: "The three reasons AD slopes downward are the wealth effect, the interest rate effect, and the real exchange rate effect."
  },
  {
    concept: "The Aggregate Demand Curve",
    q: "According to the wealth effect, when the price level rises, real wealth:",
    opts: ["Rises, since nominal wealth is unchanged", "Falls, since the same nominal money buys fewer goods", "Is completely unaffected"],
    correct: 1,
    exp: "Nominal wealth (like £10 in your pocket) doesn't change with prices, but its real purchasing power falls as prices rise — you can afford fewer goods with the same money."
  },
  {
    concept: "The Aggregate Demand Curve",
    q: "A higher price level increases the demand for money, which raises interest rates and reduces investment spending. This describes:",
    opts: ["The wealth effect", "The interest rate effect", "The real exchange rate effect"],
    correct: 1,
    exp: "This chain — higher prices, more money demanded, higher interest rates, less investment — is the interest rate effect."
  },
  {
    concept: "The Aggregate Supply Curve",
    q: "In the very short run (VSRAS), the aggregate supply curve is:",
    opts: ["Vertical", "Upward sloping", "Horizontal (flat)"],
    correct: 2,
    exp: "Over a few months, firms adjust output without changing prices at all, producing a flat (horizontal) VSRAS curve."
  },
  {
    concept: "The Aggregate Supply Curve",
    q: "Why is the long-run aggregate supply (LRAS) curve vertical?",
    opts: ["Because wages and input costs fully adjust, leaving output determined only by capital, labor, and technology", "Because firms refuse to sell more output", "Because the price level cannot change in the long run"],
    correct: 0,
    exp: "Once wages and costs catch up fully with prices, changes in the price level no longer affect real output, which settles at potential GDP — hence a vertical LRAS."
  },
  {
    concept: "The Aggregate Supply Curve",
    q: "The economy's potential output is represented by the position of which curve?",
    opts: ["VSRAS", "SRAS", "LRAS"],
    correct: 2,
    exp: "The vertical LRAS curve's position marks the economy's potential (full-employment) level of real GDP."
  },
  {
    concept: "Shifts in AD & AS",
    q: "A stock market boom increases household wealth and consumer spending at every price level. This is best described as:",
    opts: ["A movement along the AD curve", "A rightward shift of the AD curve", "A shift of the LRAS curve"],
    correct: 1,
    exp: "A change in spending behavior at every price level (not caused by the price level itself) shifts the whole AD curve, here to the right."
  },
  {
    concept: "Shifts in AD & AS",
    q: "A sudden, sharp rise in global oil prices would most directly cause:",
    opts: ["A rightward shift in AD", "A leftward shift in AS", "A rightward shift in LRAS only"],
    correct: 1,
    exp: "Higher input costs (like oil) raise production costs at every price level, shifting the AS curve to the left."
  },
  {
    concept: "Four Macroeconomic Equilibria",
    q: "At long-run full employment equilibrium, real GDP is:",
    opts: ["Below potential GDP", "Above potential GDP", "Equal to potential GDP"],
    correct: 2,
    exp: "Full employment equilibrium occurs exactly where AD meets SRAS on the vertical LRAS line — real GDP equals potential GDP."
  },
  {
    concept: "Four Macroeconomic Equilibria",
    q: "A recessionary gap is characterized by:",
    opts: ["Equilibrium output above potential GDP", "Equilibrium output below potential GDP, with falling output and prices", "Rising output and rising prices simultaneously"],
    correct: 1,
    exp: "A recessionary gap occurs when AD falls, pushing equilibrium output below potential GDP, with both output and prices declining."
  },
  {
    concept: "Four Macroeconomic Equilibria",
    q: "An inflationary gap is caused by:",
    opts: ["AD shifting left", "AD shifting right, beyond what the economy can sustainably produce", "AS shifting left"],
    correct: 1,
    exp: "An inflationary gap occurs when AD rises enough to push equilibrium output above potential GDP, with both output and prices rising."
  },
  {
    concept: "Four Macroeconomic Equilibria",
    q: "Stagflation — simultaneous high unemployment and high inflation — is primarily driven by:",
    opts: ["A rightward shift in AD", "A leftward shift in AS", "A leftward shift in LRAS only, with AD unchanged"],
    correct: 1,
    exp: "Stagflation is the signature of an AS-driven shock: a leftward shift in aggregate supply simultaneously reduces output and raises prices."
  },
  {
    concept: "Four Macroeconomic Equilibria",
    q: "The 1973 and 1979-1980 oil price shocks are classic historical examples of:",
    opts: ["Demand-driven recessions", "Supply-driven stagflation", "Long-run full employment equilibrium"],
    correct: 1,
    exp: "Both oil shocks caused simultaneous output declines and rising prices — the defining pattern of stagflation, driven by leftward shifts in aggregate supply."
  },
  {
    concept: "The Production Function & Growth Accounting",
    q: "The production function Y = A × F(L, K) assumes constant returns to scale. This means:",
    opts: ["Doubling all inputs exactly doubles output", "Output never changes regardless of inputs", "Labor alone determines all output"],
    correct: 0,
    exp: "Constant returns to scale means proportionally increasing every input increases output by that same proportion."
  },
  {
    concept: "The Production Function & Growth Accounting",
    q: "Diminishing marginal productivity of capital implies that:",
    opts: ["Adding capital always increases output at a constant rate", "Each additional unit of capital, holding labor fixed, adds progressively less output", "Capital has no effect on output"],
    correct: 1,
    exp: "Diminishing marginal productivity means that as more capital is added to a fixed labor force, each additional unit contributes less and less to output."
  },
  {
    concept: "The Production Function & Growth Accounting",
    q: "According to the growth accounting equation, if TFP growth is 0%, labor grows 1%, capital grows 2%, with WL=0.7 and WK=0.3, what is potential GDP growth?",
    opts: ["1.3%", "3.0%", "0.5%"],
    correct: 0,
    exp: "Growth = 0 + 0.7(1%) + 0.3(2%) = 0.7% + 0.6% = 1.3%."
  },
  {
    concept: "The Production Function & Growth Accounting",
    q: "Why is genuine TFP growth the only way to sustain long-run per-capita GDP growth?",
    opts: ["Because labor and capital growth are illegal in the long run", "Because diminishing returns mean capital deepening alone eventually yields ever-smaller gains", "Because TFP is the only measurable input"],
    correct: 1,
    exp: "Diminishing marginal returns to capital mean that continuously adding capital relative to labor eventually produces smaller and smaller gains — only technological progress (TFP growth) can sustain growth indefinitely."
  },
  {
    concept: "Measures of Sustainable Growth",
    q: "Labor productivity is calculated as:",
    opts: ["Real GDP divided by aggregate hours worked", "Nominal GDP divided by the labor force", "Total factor productivity divided by capital"],
    correct: 0,
    exp: "Labor productivity = Real GDP / Aggregate hours worked — the amount of real output produced per hour of labor."
  },
  {
    concept: "Measures of Sustainable Growth",
    q: "Developed countries typically have a HIGHER level of labor productivity but a LOWER growth rate of labor productivity than developing countries. Why?",
    opts: ["Developed countries have less capital accumulated", "Developing countries start from a lower capital base, where diminishing returns haven't yet reduced the payoff from new capital", "This pattern never actually occurs"],
    correct: 1,
    exp: "This is the convergence pattern: developed economies have a high accumulated productivity level, while developing economies, starting with less capital per worker, often see faster productivity growth as they build up capital."
  },
  {
    concept: "Measures of Sustainable Growth",
    q: "Rising labor productivity allows companies to:",
    opts: ["Raise wages without necessarily squeezing profit margins", "Always reduce total output", "Eliminate the need for capital investment"],
    correct: 0,
    exp: "When workers produce more per hour, companies can afford higher wages while maintaining healthy profit margins — a combination generally favorable for both workers and equity markets."
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
          cfaRecordAnswer(item.concept, "AD, AS & Economic Growth", i === item.correct);
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
