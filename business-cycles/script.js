// ============================================================
// Introduction to Business Cycles — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }

/* ============================================================
   01 — Business cycle phase tabs
   ============================================================ */
(function(){
  const tabs = document.getElementById('phaseTabs');
  const display = document.getElementById('phaseDisplay');
  if (!tabs) return;
  const data = {
    recovery: {
      title: "Recovery",
      incomes: "Unemployment remains above average; layoffs slow. Businesses rely on overtime before hiring resumes. Consumer confidence starts improving.",
      durables: "Spending limited — households postpone purchases.",
      nondurables: "Little change through the cycle.",
      services: "Below average."
    },
    expansion: {
      title: "Expansion",
      incomes: "Hiring restarts. Unemployment rate stabilizes and begins falling. Rising incomes, healthy employment prospects, greater confidence.",
      durables: "Spending increases.",
      nondurables: "Little change through the cycle.",
      services: "Spending increases."
    },
    slowdown: {
      title: "Slowdown",
      incomes: "Businesses continue hiring but at a slower pace. Unemployment rate continues to fall. Incomes still growing; consumers remain confident.",
      durables: "Spending above average.",
      nondurables: "Little change through the cycle.",
      services: "Spending above average."
    },
    contraction: {
      title: "Contraction",
      incomes: "Businesses first cut overtime hours, then freeze hiring and start layoffs. Employment levels decline; consumer confidence weakens.",
      durables: "Purchases postponed; spending decreasing.",
      nondurables: "Little change through the cycle.",
      services: "Spending declines."
    }
  };
  function render(phase){
    const d = data[phase];
    display.innerHTML = `
      <div style="background:var(--paper-dim); border-radius:10px; padding:16px 18px; margin-top:12px;">
        <div style="font-family:var(--font-mono); font-size:.72rem; text-transform:uppercase; letter-spacing:.05em; color:var(--indigo); font-weight:700; margin-bottom:10px;">${d.title}</div>
        <p style="margin:0 0 10px; font-size:.88rem;"><strong>Incomes, employment &amp; confidence:</strong> ${d.incomes}</p>
        <p style="margin:0 0 6px; font-size:.85rem;"><strong>Durables:</strong> ${d.durables}</p>
        <p style="margin:0 0 6px; font-size:.85rem;"><strong>Non-durables:</strong> ${d.nondurables}</p>
        <p style="margin:0; font-size:.85rem;"><strong>Services:</strong> ${d.services}</p>
      </div>
    `;
  }
  tabs.querySelectorAll('.test-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.test-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.phase);
    });
  });
  render('recovery');
})();

/* ============================================================
   04 — Unemployment & participation rate calculator
   ============================================================ */
(function(){
  const eI = document.getElementById('uEmployed'), uI = document.getElementById('uUnemployed'), wI = document.getElementById('uWorkingAge');
  const out = document.getElementById('uOut');
  if (!eI) return;
  function render(){
    const e = parseFloat(eI.value), u = parseFloat(uI.value), w = parseFloat(wI.value);
    const laborForce = e + u;
    const unempRate = (u/laborForce) * 100;
    const partRate = (laborForce/w) * 100;
    out.innerHTML = `
      <div class="stat-readout"><div class="k">Labor force</div><div class="v">${laborForce.toLocaleString()}</div></div>
      <div class="stat-readout"><div class="k">Unemployment rate</div><div class="v">${fmt(unempRate,1)}%</div></div>
      <div class="stat-readout"><div class="k">Participation rate</div><div class="v">${fmt(partRate,1)}%</div></div>
    `;
  }
  [eI,uI,wI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   07 — Price index & inflation calculator
   ============================================================ */
(function(){
  const q1I = document.getElementById('piQ1'), p1BaseI = document.getElementById('piP1Base'), p1CurI = document.getElementById('piP1Cur');
  const q2I = document.getElementById('piQ2'), p2BaseI = document.getElementById('piP2Base'), p2CurI = document.getElementById('piP2Cur');
  const out = document.getElementById('piOut');
  if (!q1I) return;
  function render(){
    const q1 = parseFloat(q1I.value), p1b = parseFloat(p1BaseI.value), p1c = parseFloat(p1CurI.value);
    const q2 = parseFloat(q2I.value), p2b = parseFloat(p2BaseI.value), p2c = parseFloat(p2CurI.value);
    const baseValue = q1*p1b + q2*p2b;
    const currentValue = q1*p1c + q2*p2c;
    const index = (currentValue/baseValue) * 100;
    const inflation = (index/100 - 1) * 100;
    out.innerHTML = `
      <div class="stat-readout"><div class="k">Base value</div><div class="v">${fmt(baseValue,1)}</div></div>
      <div class="stat-readout"><div class="k">Price index</div><div class="v">${fmt(index,2)}</div></div>
      <div class="stat-readout"><div class="k">Inflation rate</div><div class="v">${fmt(inflation,2)}%</div></div>
    `;
  }
  [q1I,p1BaseI,p1CurI,q2I,p2BaseI,p2CurI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   08 — Unit labor cost calculator
   ============================================================ */
(function(){
  const wI = document.getElementById('ulcW'), oI = document.getElementById('ulcO');
  const result = document.getElementById('ulcResult'), steps = document.getElementById('ulcSteps');
  if (!wI) return;
  function render(){
    const w = parseFloat(wI.value), o = parseFloat(oI.value);
    // ULC growth approx = wage growth - productivity growth
    const ulcGrowth = w - o;
    result.textContent = `ULC growth ≈ ${fmt(ulcGrowth,1)}%`;
    steps.textContent = `${w}% − ${o}% ≈ ${fmt(ulcGrowth,1)}% growth in unit labor costs`;
  }
  [wI,oI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   09 — Leading/Coincident/Lagging indicator tabs
   ============================================================ */
(function(){
  const tabs = document.getElementById('indicatorTabs');
  const display = document.getElementById('indicatorDisplay');
  if (!tabs) return;
  const data = {
    leading: {
      title: "Leading Indicators — turn before the economy does",
      items: ["Survey-based indicators (e.g., ISM)", "New orders for goods", "Average consumer expectations", "Average weekly hours worked", "Initial claims for unemployment insurance", "New building permits", "Stock market indexes", "Yield curve spread (long-term minus short-term rates)"]
    },
    coincident: {
      title: "Coincident Indicators — turn alongside the economy",
      items: ["Industrial production indexes", "Manufacturing and trade sales indexes", "Aggregate real personal income", "Non-agricultural employment"]
    },
    lagging: {
      title: "Lagging Indicators — turn after the economy already has",
      items: ["Average duration of unemployment", "Inventory–sales ratio", "Change in unit labor costs", "Average bank prime lending rate", "Commercial and industrial loans outstanding", "Ratio of consumer installment debt to income", "Change in CPI for services"]
    }
  };
  function render(cat){
    const d = data[cat];
    let html = `<div style="background:var(--paper-dim); border-radius:10px; padding:16px 18px; margin-top:12px;">
      <div style="font-family:var(--font-mono); font-size:.72rem; text-transform:uppercase; letter-spacing:.05em; color:var(--indigo); font-weight:700; margin-bottom:10px;">${d.title}</div>
      <ul style="margin:0; padding-left:20px; font-size:.85rem;">`;
    d.items.forEach(item => html += `<li style="margin-bottom:4px;">${item}</li>`);
    html += `</ul></div>`;
    display.innerHTML = html;
  }
  tabs.querySelectorAll('.test-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.test-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.cat);
    });
  });
  render('leading');
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
const sectionIds = ['sec-consumer','sec-housing','sec-trade','sec-unemploytypes','sec-unemploylag','sec-inflationtypes','sec-priceindex','sec-costdemand','sec-indicators','sec-theories','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-business-cycles', String(pct)); } catch(e) {}
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
    concept: "Leading, Coincident & Lagging Indicators",
    q: "The spread between long-term and short-term bond yields (the yield curve) is classified as which type of economic indicator?",
    opts: ["Leading", "Coincident", "Lagging"],
    correct: 0,
    exp: "The yield curve is a classic leading indicator — it reflects forward-looking market expectations and often signals a slowdown well before it appears in GDP or employment data."
  },
  {
    concept: "Leading, Coincident & Lagging Indicators",
    q: "Average duration of unemployment and the change in unit labor costs are examples of:",
    opts: ["Leading indicators", "Coincident indicators", "Lagging indicators"],
    correct: 2,
    exp: "Both turn only after a trend is already well established in the broader economy, making them lagging indicators."
  },
  {
    concept: "Theories of the Business Cycle",
    q: "Real Business Cycle (RBC) theory attributes economic fluctuations primarily to:",
    opts: ["Shifts in aggregate supply, such as input price or technology changes", "Shifts in aggregate demand driven by consumer confidence", "Changes in the unemployment rate alone"],
    correct: 0,
    exp: "RBC theory is a supply-side explanation — fluctuations come from AS shifts, and the economy is expected to converge to a new equilibrium largely on its own."
  },
  {
    concept: "Theories of the Business Cycle",
    q: "Which school of thought is most associated with using active fiscal and monetary stimulus to combat a demand-driven recession?",
    opts: ["Real Business Cycle theory", "Keynesian theory", "Monetarist theory"],
    correct: 1,
    exp: "Keynesian theory specifically advocates active government intervention to restore full employment and prevent a deflationary spiral during AD-driven downturns."
  },
  {
    concept: "Consumer Behavior",
    q: "Which category of consumer spending shows the most pronounced cyclical swings?",
    opts: ["Non-durable goods", "Durable goods", "Both equally"],
    correct: 1,
    exp: "Durable goods (autos, appliances, furniture) are big-ticket items that can be kept in service longer through repairs, making their replacement easy to postpone during uncertain times."
  },
  {
    concept: "Consumer Behavior",
    q: "Permanent income, as opposed to temporary income, most directly guides which type of spending?",
    opts: ["Durable goods spending", "Services spending", "Government spending"],
    correct: 1,
    exp: "Services spending tracks households' sense of durable, reliable income (permanent income) more than one-off windfalls."
  },
  {
    concept: "Housing & Business Investment",
    q: "Housing demand is unusually sensitive to which factor, more than most sectors?",
    opts: ["Interest rates", "Corporate tax rates", "Import tariffs"],
    correct: 0,
    exp: "Because most homes are purchased with mortgage financing, housing demand responds strongly and directly to changes in borrowing costs."
  },
  {
    concept: "Housing & Business Investment",
    q: "Among consumer goods companies, business equipment companies, and household products companies, which typically fluctuates MOST with the domestic business cycle?",
    opts: ["Consumer goods companies", "Business equipment (investment) companies", "Household products companies selling domestically and abroad"],
    correct: 1,
    exp: "Business investment is the most volatile component of GDP across the cycle — firms expand and cut capital spending more sharply than consumers adjust spending."
  },
  {
    concept: "External Trade",
    q: "A country's exports are most directly driven by:",
    opts: ["Domestic GDP growth", "Economic conditions in trading partner countries", "The domestic unemployment rate"],
    correct: 1,
    exp: "Exports reflect foreign demand for domestic output, so they respond to conditions in trading partner economies rather than domestic conditions."
  },
  {
    concept: "External Trade",
    q: "A country's currency appreciates significantly. All else equal, what is the likely effect on its trade balance?",
    opts: ["Exports rise and imports fall", "Imports rise and exports fall", "No effect on trade at all"],
    correct: 1,
    exp: "A stronger currency makes imports cheaper for domestic buyers and makes exports more expensive for foreign buyers, tending to raise imports and reduce exports."
  },
  {
    concept: "Types & Measures",
    q: "The labor force is best defined as:",
    opts: ["Everyone of working age", "Everyone who is employed or actively seeking employment", "Everyone who has a full-time job"],
    correct: 1,
    exp: "The labor force includes both the employed and the unemployed who are actively seeking work — it excludes retirees, students, and others not seeking employment."
  },
  {
    concept: "Types & Measures",
    q: "A country has a labor force of 180,000 and 9,000 unemployed. What is the unemployment rate?",
    opts: ["5.0%", "9.0%", "20.0%"],
    correct: 0,
    exp: "Unemployment rate = Unemployed / Labor force = 9,000 / 180,000 = 5.0%."
  },
  {
    concept: "Types & Measures",
    q: "A discouraged worker who has stopped looking for a job is:",
    opts: ["Counted as unemployed", "Counted as employed", "Excluded from the labor force entirely"],
    correct: 2,
    exp: "Discouraged workers are statistically outside the labor force, similar to retirees or students — they don't appear in the official unemployment rate at all."
  },
  {
    concept: "Why It Lags the Cycle",
    q: "During a prolonged recession, the unemployment rate can sometimes fall even without genuine improvement in the job market. Why?",
    opts: ["Because layoffs stop entirely during recessions", "Because discouraged workers exit the labor force and are no longer counted", "Because unemployment statistics are recalculated annually only"],
    correct: 1,
    exp: "As discouraged workers stop actively searching, they drop out of the labor force and are no longer counted as unemployed, which can artificially lower the measured rate."
  },
  {
    concept: "Why It Lags the Cycle",
    q: "Which of the following tends to be an earlier signal of labor market weakness than the unemployment rate itself?",
    opts: ["Overtime hours and temporary staffing levels", "The federal minimum wage", "Corporate dividend announcements"],
    correct: 0,
    exp: "Businesses typically cut overtime and temporary staff before touching full-time headcount, making these measures earlier warning signs than the unemployment rate."
  },
  {
    concept: "Inflation, Deflation & Hyperinflation",
    q: "Disinflation is best described as:",
    opts: ["A sustained decrease in the price level", "A slowdown in the rate of inflation, while prices are still rising", "An extremely rapid increase in prices"],
    correct: 1,
    exp: "Disinflation means the inflation rate is falling (e.g., from 20% to 6%), but it remains positive — prices are still rising, just more slowly. This is distinct from deflation."
  },
  {
    concept: "Inflation, Deflation & Hyperinflation",
    q: "Why is deflation considered particularly dangerous for an economy?",
    opts: ["It has no real economic effects", "It increases the real burden of fixed-nominal debt, prompting spending cuts that deepen the downturn", "It always leads directly to hyperinflation"],
    correct: 1,
    exp: "Since debt is fixed in nominal terms, falling prices increase its real burden, prompting over-indebted firms to cut spending and jobs sharply, worsening the contraction."
  },
  {
    concept: "Inflation, Deflation & Hyperinflation",
    q: "Hyperinflation is most commonly caused by:",
    opts: ["Excessive government spending financed by printing money", "Very low unemployment alone", "A strengthening currency"],
    correct: 0,
    exp: "Hyperinflation typically arises when government spending isn't backed by real tax revenue and is instead financed by rapidly expanding the money supply."
  },
  {
    concept: "Measuring Inflation",
    q: "A price index using a fixed basket of goods (a Laspeyres index) generally tends to:",
    opts: ["Understate true inflation", "Overstate true inflation, due to substitution, quality, and new product biases", "Have no systematic bias"],
    correct: 1,
    exp: "All three biases — substitution, quality, and new product bias — push in the same direction, causing a fixed-basket index to generally overstate the true rate of inflation."
  },
  {
    concept: "Measuring Inflation",
    q: "A basket contains 40 units of good A (price rises from $2.00 to $2.50) and 20 units of good B (price stays at $5). What is the price index (base=100)?",
    opts: ["111.1", "125.0", "108.3"],
    correct: 0,
    exp: "Base value = 40(2)+20(5) = 180. Current value = 40(2.50)+20(5) = 200. Index = (200/180) × 100 ≈ 111.1."
  },
  {
    concept: "Measuring Inflation",
    q: "Substitution bias in a price index arises because:",
    opts: ["A fixed basket doesn't capture consumers shifting toward cheaper alternatives as relative prices change", "Consumers never actually substitute between goods", "New products are added too quickly to the basket"],
    correct: 0,
    exp: "When a good's price rises, consumers often shift to cheaper substitutes, but a fixed basket keeps weighting the pricier good as before, overstating the true cost-of-living increase."
  },
  {
    concept: "Cost-Push vs. Demand-Pull",
    q: "Cost-push inflation is most directly linked to:",
    opts: ["Wages growing faster than productivity, raising unit labor costs", "Excess money chasing too few goods", "A strengthening domestic currency"],
    correct: 0,
    exp: "When compensation grows faster than productivity, unit labor costs (ULC = W/O) rise, squeezing margins and pushing firms to raise prices — the definition of cost-push inflation."
  },
  {
    concept: "Cost-Push vs. Demand-Pull",
    q: "Demand-pull inflation is most closely associated with:",
    opts: ["Actual GDP running close to or above potential GDP, creating capacity bottlenecks", "Falling wages across the economy", "A shrinking money supply"],
    correct: 0,
    exp: "As actual output approaches or exceeds potential GDP, capacity constraints and bottlenecks become more binding, creating demand-pull inflationary pressure."
  },
  {
    concept: "Cost-Push vs. Demand-Pull",
    q: "The Monetarist explanation of inflation is best summarized as:",
    opts: ["\"Inflation results when too much money chases too few goods\"", "Inflation is caused exclusively by government tax policy", "Inflation is unrelated to the money supply"],
    correct: 0,
    exp: "The Monetarist view holds that inflation is fundamentally a monetary phenomenon — an excess supply of money reduces money's value, which shows up as a general rise in prices."
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
          cfaRecordAnswer(item.concept, "Business Cycles", i === item.correct);
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
