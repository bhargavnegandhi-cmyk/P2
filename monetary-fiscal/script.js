// ============================================================
// Monetary and Fiscal Policy — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }
function svgEl(tag, attrs){
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

/* ============================================================
   03 — Money multiplier / fractional reserve banking calculator
   ============================================================ */
(function(){
  const depositI = document.getElementById('mmDeposit'), reserveI = document.getElementById('mmReserve');
  const tableContainer = document.getElementById('mmTable'), result = document.getElementById('mmResult');
  if (!depositI) return;
  function render(){
    const deposit = parseFloat(depositI.value);
    const reservePct = parseFloat(reserveI.value) / 100;
    const multiplier = 1 / reservePct;
    const totalMoney = deposit / reservePct;

    let html = '<table class="exhibit" style="margin:0; min-width:340px;"><tr><th>Bank</th><th>Deposit</th><th>Reserves</th><th>Loan</th></tr>';
    let currentDeposit = deposit;
    const bankNames = ['First','Second','Third','Fourth','Fifth'];
    for (let i=0; i<5; i++){
      const reserves = currentDeposit * reservePct;
      const loan = currentDeposit - reserves;
      html += `<tr><td>${bankNames[i]}</td><td class="num">${fmt(currentDeposit,2)}</td><td class="num">${fmt(reserves,2)}</td><td class="num">${fmt(loan,2)}</td></tr>`;
      currentDeposit = loan;
    }
    html += `<tr><td colspan="4" style="text-align:center; color:var(--ink-soft); font-style:italic;">… continues until fully absorbed</td></tr>`;
    html += '</table>';
    tableContainer.innerHTML = html;
    result.textContent = `Money multiplier = ${fmt(multiplier,2)} · Total money created = ${fmt(totalMoney,2)}`;
  }
  [depositI,reserveI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   04 — Quantity equation solver (M*V = P*Y)
   ============================================================ */
(function(){
  const mI = document.getElementById('qeM'), vI = document.getElementById('qeV'), pI = document.getElementById('qeP');
  const result = document.getElementById('qeResult'), steps = document.getElementById('qeSteps');
  if (!mI) return;
  function render(){
    const m = parseFloat(mI.value), v = parseFloat(vI.value), p = parseFloat(pI.value);
    const y = (m*v)/p;
    result.textContent = `Y (real output) = ${fmt(y,2)}`;
    steps.textContent = `${m} × ${v} = ${p} × Y → Y = ${fmt(y,2)}`;
  }
  [mI,vI,pI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   06 — Money market equilibrium chart (static illustrative)
   ============================================================ */
(function(){
  const container = document.getElementById('moneyMarketChart');
  if (!container) return;
  const W=460, H=260, padL=44, padR=20, padT=20, padB=32;
  const xScale = q => padL + (q/100)*(W-padL-padR);
  const yScale = r => (H-padB) - (r/100)*(H-padT-padB);
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:480px;'});
  svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  // MS - vertical at Q=50
  svg.appendChild(svgEl('line', {x1:xScale(50), y1:padT, x2:xScale(50), y2:H-padB, stroke:'#2B2560', 'stroke-width':2.5}));
  // MD - downward from (10,85) to (90,15)
  svg.appendChild(svgEl('line', {x1:xScale(10), y1:yScale(85), x2:xScale(90), y2:yScale(15), stroke:'#C77F1E', 'stroke-width':2.5}));
  // equilibrium point at Q=50
  const eqR = 85 - (50-10)*(85-15)/(90-10);
  svg.appendChild(svgEl('circle', {cx:xScale(50), cy:yScale(eqR), r:5, fill:'#2F8F6B', stroke:'#fff', 'stroke-width':1.5}));
  svg.appendChild(svgEl('line', {x1:padL, x2:xScale(50), y1:yScale(eqR), y2:yScale(eqR), stroke:'#2F8F6B', 'stroke-width':1, 'stroke-dasharray':'3,2'}));
  const i0Label = svgEl('text', {x:padL-6, y:yScale(eqR)+3, 'text-anchor':'end', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#2F8F6B', 'font-weight':'700'});
  i0Label.textContent = 'I₀';
  svg.appendChild(i0Label);
  const msLabel = svgEl('text', {x:xScale(50)+4, y:padT+10, 'font-family':'IBM Plex Mono', 'font-size':10, fill:'#2B2560', 'font-weight':'700'});
  msLabel.textContent = 'MS';
  svg.appendChild(msLabel);
  const mdLabel = svgEl('text', {x:xScale(88), y:yScale(18)-4, 'text-anchor':'end', 'font-family':'IBM Plex Mono', 'font-size':10, fill:'#C77F1E', 'font-weight':'700'});
  mdLabel.textContent = 'MD';
  svg.appendChild(mdLabel);
  const ylabel = svgEl('text', {x:10, y:padT+6, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  ylabel.textContent = 'Nominal Interest Rate';
  svg.appendChild(ylabel);
  const xlabel = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  xlabel.textContent = 'Quantity of Money';
  svg.appendChild(xlabel);
  container.appendChild(svg);
})();

/* ============================================================
   07 — Fisher effect calculator
   ============================================================ */
(function(){
  const realI = document.getElementById('feReal'), inflI = document.getElementById('feInfl');
  const result = document.getElementById('feResult'), steps = document.getElementById('feSteps');
  if (!realI) return;
  function render(){
    const real = parseFloat(realI.value), infl = parseFloat(inflI.value);
    const nominal = real + infl;
    result.textContent = `Nominal rate = ${fmt(nominal,2)}%`;
    steps.textContent = `${real}% + ${infl}% = ${fmt(nominal,2)}%`;
  }
  [realI,inflI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-policytypes','sec-moneyfunctions','sec-moneycreation','sec-quantitytheory','sec-moneydemand','sec-equilibrium','sec-fishereffect','sec-inflationcosts','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-monetary-fiscal', String(pct)); } catch(e) {}
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
    concept: "Monetary vs. Fiscal Policy",
    q: "Which best describes monetary policy?",
    opts: ["Government decisions about taxation and spending", "Central bank activities directed at influencing the quantity of money and credit", "A private company's decisions about dividend payments"],
    correct: 1,
    exp: "Monetary policy is specifically the domain of the central bank, focused on the quantity of money and credit in the economy."
  },
  {
    concept: "Monetary vs. Fiscal Policy",
    q: "Which is a distinguishing feature of fiscal policy, not shared by monetary policy?",
    opts: ["It can be used to redistribute income and wealth", "It affects the overall economy", "It is set by unelected officials only"],
    correct: 0,
    exp: "Fiscal policy, through taxation and spending choices, can deliberately redistribute income and wealth — a role monetary policy doesn't typically play."
  },
  {
    concept: "Functions & Definitions of Money",
    q: "In a barter economy, the core problem money solves is:",
    opts: ["The need for a 'double coincidence of wants' in every trade", "Excessive government regulation", "Too much liquidity in financial markets"],
    correct: 0,
    exp: "Barter requires finding someone who has what you want and wants what you have — money removes this restrictive requirement entirely."
  },
  {
    concept: "Functions & Definitions of Money",
    q: "Which of these is NOT one of the three classic functions of money?",
    opts: ["Medium of exchange", "Unit of account", "Guarantee of future economic growth"],
    correct: 2,
    exp: "The three functions are medium of exchange, store of wealth, and unit of account — money has no direct function guaranteeing economic growth."
  },
  {
    concept: "Functions & Definitions of Money",
    q: "Broad money, compared to narrow money, includes:",
    opts: ["Only physical notes and coins", "Narrow money plus the wider range of liquid assets usable for purchases", "Only central bank reserves"],
    correct: 1,
    exp: "Broad money encompasses narrow money (cash and highly liquid deposits) plus a wider range of liquid assets like savings accounts."
  },
  {
    concept: "The Money Creation Process",
    q: "A bank receives a $500 deposit with a 20% reserve requirement. How much can it lend out?",
    opts: ["$500", "$400", "$100"],
    correct: 1,
    exp: "The bank keeps 20% ($100) as reserves and lends the remaining 80% ($400)."
  },
  {
    concept: "The Money Creation Process",
    q: "The money multiplier is calculated as:",
    opts: ["Reserve requirement × Deposit", "1 / Reserve requirement (as a decimal)", "Deposit − Reserve requirement"],
    correct: 1,
    exp: "The money multiplier equals 1 divided by the reserve requirement expressed as a decimal — e.g., 1/0.10 = 10 for a 10% requirement."
  },
  {
    concept: "The Money Creation Process",
    q: "With a 5% reserve requirement, how much total money can ultimately be created from an initial $200 deposit?",
    opts: ["$1,000", "$4,000", "$10,000"],
    correct: 2,
    exp: "Total money = Deposit / Reserve requirement = $200 / 0.05 = $10,000."
  },
  {
    concept: "The Quantity Theory of Money",
    q: "The quantity equation of exchange is:",
    opts: ["M × V = P × Y", "M + V = P + Y", "M / V = P / Y"],
    correct: 0,
    exp: "M×V=P×Y: the quantity of money times its velocity equals the price level times real output."
  },
  {
    concept: "The Quantity Theory of Money",
    q: "The quantity theory of money adds which key assumption to the quantity equation identity?",
    opts: ["That real output is always zero", "That velocity of money is approximately constant", "That the money supply never changes"],
    correct: 1,
    exp: "Assuming velocity (V) is roughly constant is what turns the accounting identity into a testable theory linking money growth to inflation."
  },
  {
    concept: "The Quantity Theory of Money",
    q: "Economists who believe money supply growth directly drives inflation are called:",
    opts: ["Keynesians", "Monetarists", "Behavioralists"],
    correct: 1,
    exp: "Monetarists hold that there is a causal relationship running from money supply growth to inflation."
  },
  {
    concept: "The Demand for Money",
    q: "Which motive for holding money is most sensitive to changes in interest rates?",
    opts: ["Transactions-related demand", "Precautionary demand", "Speculative demand"],
    correct: 2,
    exp: "Speculative demand for money reflects the opportunity cost of holding cash versus interest-bearing assets, making it the most interest-rate sensitive of the three motives."
  },
  {
    concept: "Money Market Equilibrium",
    q: "In the money market, the money supply curve (MS) is typically drawn as:",
    opts: ["Upward sloping", "Vertical", "Horizontal"],
    correct: 1,
    exp: "MS is vertical because the nominal quantity of money in circulation at any moment is treated as fixed, regardless of the interest rate."
  },
  {
    concept: "Money Market Equilibrium",
    q: "If the nominal interest rate is below the money market's equilibrium rate, there is:",
    opts: ["Excess supply of money, which will push interest rates down", "Excess demand for money, which will push interest rates up toward equilibrium", "No effect on interest rates"],
    correct: 1,
    exp: "Below equilibrium, money demand exceeds supply; people sell bonds to raise cash, pushing bond prices down and interest rates up toward equilibrium."
  },
  {
    concept: "The Fisher Effect",
    q: "The Fisher effect states that:",
    opts: ["Rnom = Rreal + expected inflation", "Rreal = Rnom + expected inflation", "Rnom is always equal to expected inflation alone"],
    correct: 0,
    exp: "The Fisher effect: the nominal interest rate equals the real interest rate plus expected inflation."
  },
  {
    concept: "The Fisher Effect",
    q: "Investors require a 3% real return, and expected inflation is 5%. What nominal rate should they demand, according to the Fisher effect?",
    opts: ["2%", "8%", "15%"],
    correct: 1,
    exp: "Rnom = Rreal + πe = 3% + 5% = 8%."
  },
  {
    concept: "The Fisher Effect",
    q: "The Fisher effect relies on the concept of money neutrality, which holds that in the long run, changes in the money supply affect:",
    opts: ["Only nominal variables, not real variables like the real interest rate", "Only real variables, not nominal variables", "Neither real nor nominal variables"],
    correct: 0,
    exp: "Money neutrality holds that money supply changes affect nominal prices over the long run but leave real variables, like the real interest rate, unchanged."
  },
  {
    concept: "The Costs of Inflation",
    q: "Which type of inflation is generally considered most economically costly?",
    opts: ["Expected inflation, since it's fully anticipated", "Unexpected inflation, since it redistributes wealth and distorts price signals", "Zero inflation"],
    correct: 1,
    exp: "Unexpected inflation is the more costly type, since it can't be planned for in contracts and wage negotiations, and it redistributes real wealth between borrowers and lenders unpredictably."
  },
  {
    concept: "The Costs of Inflation",
    q: "When actual inflation comes in unexpectedly HIGH, who benefits and who is hurt?",
    opts: ["Borrowers benefit; lenders are hurt", "Lenders benefit; borrowers are hurt", "Neither party is affected"],
    correct: 0,
    exp: "Higher-than-expected inflation erodes the real value of a fixed nominal debt, benefiting the borrower at the lender's expense."
  },
  {
    concept: "The Costs of Inflation",
    q: "In the television manufacturer example, why did unexpected inflation lead to economic waste?",
    opts: ["The manufacturer correctly identified rising demand for TVs specifically", "The manufacturer mistook a generalized price increase for increased demand for its specific product, leading to overexpansion", "Television prices actually fell"],
    correct: 1,
    exp: "The manufacturer misread an economy-wide price increase as product-specific demand growth, leading to wasteful overexpansion that had to be reversed once the truth became clear."
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
          cfaRecordAnswer(item.concept, "Monetary & Fiscal Policy", i === item.correct);
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
