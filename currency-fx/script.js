// ============================================================
// Currency Exchange Rates — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }

/* ============================================================
   04 — Hedged return calculator (AUD/HKD carry trade example)
   ============================================================ */
(function(){
  const spotI = document.getElementById('hedgeSpot'), rateI = document.getElementById('hedgeRate'), forwardI = document.getElementById('hedgeForward');
  const result = document.getElementById('hedgeResult'), steps = document.getElementById('hedgeSteps');
  if (!spotI) return;
  function render(){
    const spot = parseFloat(spotI.value), rate = parseFloat(rateI.value)/100, forward = parseFloat(forwardI.value);
    const step1 = 1/spot;
    const step2 = step1 * (1+rate);
    const step3 = step2 * forward;
    const returnPct = (step3 - 1) * 100;
    result.textContent = `Domestic return ≈ ${fmt(returnPct,2)}%`;
    steps.textContent = `1/${spot}=${fmt(step1,2)} → ×${fmt(1+rate,3)}=${fmt(step2,2)} → ×${forward}=${fmt(step3,3)} → ${fmt(returnPct,2)}%`;
  }
  [spotI,rateI,forwardI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   05 — Percentage change calculator
   ============================================================ */
(function(){
  const oldI = document.getElementById('pcOld'), newI = document.getElementById('pcNew');
  const result = document.getElementById('pcResult');
  if (!oldI) return;
  function render(){
    const oldRate = parseFloat(oldI.value), newRate = parseFloat(newI.value);
    const pctChange = ((newRate - oldRate) / oldRate) * 100;
    result.textContent = `%Δ = ${pctChange>=0?'+':''}${fmt(pctChange,2)}%`;
  }
  [oldI,newI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   06 — Marshall-Lerner condition calculator
   ============================================================ */
(function(){
  const wxI = document.getElementById('mlWx'), exI = document.getElementById('mlEx'), emI = document.getElementById('mlEm');
  const result = document.getElementById('mlResult'), steps = document.getElementById('mlSteps');
  if (!wxI) return;
  function render(){
    const wx = parseFloat(wxI.value), ex = parseFloat(exI.value), em = parseFloat(emI.value);
    const wm = 1 - wx;
    const mlValue = wx*ex + wm*(em-1);
    const holds = mlValue > 0;
    result.innerHTML = `${fmt(mlValue,3)} ${holds ? '<span style="color:var(--green); font-weight:700;">&gt; 0 — condition holds</span>' : '<span style="color:var(--red); font-weight:700;">≤ 0 — condition fails</span>'}`;
    steps.textContent = `${fmt(wx,2)}(${ex}) + ${fmt(wm,2)}(${em}−1) = ${fmt(mlValue,3)}`;
  }
  [wxI,exI,emI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-fxmarket','sec-nominalreal','sec-spotforward','sec-hedging','sec-percentchange','sec-elasticities','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-currency-fx', String(pct)); } catch(e) {}
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
    concept: "Size & Importance",
    q: "By daily turnover, the foreign exchange market is:",
    opts: ["Smaller than global equity markets", "The largest financial market in the world", "About the same size as global bond markets"],
    correct: 1,
    exp: "At roughly $5.1 trillion in daily turnover, the FX market is by far the world's largest financial market — far larger than global bond or equity markets."
  },
  {
    concept: "Size & Importance",
    q: "An investor holds only domestic stocks and has never purchased a foreign security. Is this investor exposed to FX market movements?",
    opts: ["No, direct foreign holdings are required for any FX exposure", "Yes, indirectly, through the foreign revenue and competition faced by domestic companies", "Only if the investor also holds government bonds"],
    correct: 1,
    exp: "Large domestic companies often earn significant revenue abroad and compete internationally, so FX markets affect their earnings and valuations even without any direct foreign holdings."
  },
  {
    concept: "Nominal & Real Exchange Rates",
    q: "When a currency buys more of another currency than it did before, it has:",
    opts: ["Depreciated", "Appreciated", "Defaulted"],
    correct: 1,
    exp: "A currency that can purchase more of another currency than previously has appreciated in value."
  },
  {
    concept: "Nominal & Real Exchange Rates",
    q: "The real exchange rate differs from the nominal exchange rate because it:",
    opts: ["Ignores inflation entirely", "Adjusts for relative price levels between the two countries, capturing true purchasing power", "Is always identical to the nominal rate"],
    correct: 1,
    exp: "The real exchange rate multiplies the nominal rate by the ratio of price levels, capturing the currencies' true relative purchasing power rather than just their nominal price."
  },
  {
    concept: "Nominal & Real Exchange Rates",
    q: "Two countries' nominal exchange rate stays flat for years, but one experiences much higher inflation than the other. What happens to the real exchange rate?",
    opts: ["It stays exactly the same as the nominal rate", "It changes, reflecting the shift in relative purchasing power the flat nominal rate hides", "Real exchange rates cannot exist if nominal rates are flat"],
    correct: 1,
    exp: "The real exchange rate captures the inflation differential, so it can move meaningfully even while the nominal rate stays flat."
  },
  {
    concept: "Spot, Forward & FX Swaps",
    q: "A spot foreign exchange transaction typically settles:",
    opts: ["Immediately, with no delay", "About two business days after the trade (T+2)", "Exactly one year after the trade"],
    correct: 1,
    exp: "Spot transactions for most currencies settle on a T+2 basis — two business days after the trade is agreed."
  },
  {
    concept: "Spot, Forward & FX Swaps",
    q: "A forward contract differs from a spot transaction in that it:",
    opts: ["Always settles faster than T+2", "Locks in an exchange rate today for a transaction settling at a specified future date", "Cannot be used to hedge currency risk"],
    correct: 1,
    exp: "A forward contract fixes today the exchange rate for a future settlement date, which is exactly what makes it useful for hedging."
  },
  {
    concept: "Spot, Forward & FX Swaps",
    q: "An FX swap is best described as:",
    opts: ["A single spot transaction only", "A combination of a spot transaction and an offsetting forward transaction", "A type of currency option"],
    correct: 1,
    exp: "An FX swap combines a spot transaction with an offsetting forward transaction, often used to roll an existing forward position to a new date."
  },
  {
    concept: "Hedging a Foreign Investment",
    q: "In the AUD/HKD hedged investment example, what specifically eliminates the investor's currency risk?",
    opts: ["The fact that HKD interest rates are low", "Locking in the AUD/HKD conversion rate today via a forward contract, rather than relying on the future spot rate", "Choosing to invest for exactly one year"],
    correct: 1,
    exp: "The forward contract removes the uncertainty about the future spot rate, which is the actual source of currency risk in the strategy."
  },
  {
    concept: "Hedging a Foreign Investment",
    q: "In the AUD/HKD example (spot 0.1714, HKD rate 2.20%, forward 0.1724), what is the approximate AUD-denominated return?",
    opts: ["2.2%", "2.8%", "6.0%"],
    correct: 1,
    exp: "Converting spot, earning the HKD interest rate, then converting back at the forward rate produces an AUD return of approximately 2.8% — higher than the HKD rate alone, reflecting the forward premium on HKD."
  },
  {
    concept: "% Change in Currency Value",
    q: "The percentage change in an exchange rate is calculated as:",
    opts: ["(New rate − Old rate) / Old rate", "(Old rate − New rate) / New rate", "New rate × Old rate"],
    correct: 0,
    exp: "%Δ = (New rate − Old rate) / Old rate, the standard percentage change formula applied to the exchange rate."
  },
  {
    concept: "% Change in Currency Value",
    q: "The USD/EUR rate moves from 1.2000 to 1.1400. What is the approximate percentage change?",
    opts: ["-5.0%", "+5.0%", "-6.0%"],
    correct: 0,
    exp: "%Δ = (1.1400 − 1.2000)/1.2000 = −0.0600/1.2000 ≈ −5.0%."
  },
  {
    concept: "% Change in Currency Value",
    q: "If Currency A depreciates by 10% against Currency B, by what percentage must Currency B appreciate against Currency A to fully reverse the move?",
    opts: ["Exactly 10%", "Approximately 11.1%", "Exactly 20%"],
    correct: 1,
    exp: "Percentage changes are calculated relative to different starting bases, so reversing a 10% depreciation requires an appreciation of roughly 11.1%, not exactly 10%."
  },
  {
    concept: "The Elasticities Approach",
    q: "The Marshall-Lerner condition addresses:",
    opts: ["Whether a currency devaluation will actually improve a country's trade balance", "How central banks set interest rates", "How GDP is calculated"],
    correct: 0,
    exp: "The Marshall-Lerner condition specifies when a currency devaluation will move the trade balance toward surplus, based on export and import demand elasticities."
  },
  {
    concept: "The Elasticities Approach",
    q: "The generalized Marshall-Lerner condition is written as:",
    opts: ["ωXεX + ωM(εM − 1) > 0", "ωX + ωM = εX + εM", "εX × εM > 1"],
    correct: 0,
    exp: "The generalized Marshall-Lerner condition: ωXεX + ωM(εM−1) > 0, where ω terms are trade shares and ε terms are demand elasticities."
  },
  {
    concept: "The Elasticities Approach",
    q: "If a country's import demand elasticity (εM) is well below 1 (inelastic), what happens to import expenditure when the domestic currency depreciates?",
    opts: ["Import expenditure falls sharply", "Import expenditure can actually rise, since quantity barely falls despite the higher price", "Import expenditure is completely unaffected"],
    correct: 1,
    exp: "With inelastic import demand, quantity purchased falls only slightly even as import prices rise, meaning total import expenditure can actually increase rather than decrease."
  },
  {
    concept: "The Elasticities Approach",
    q: "For the Marshall-Lerner condition to hold and support a devaluation improving the trade balance, demand for exports and imports generally needs to be:",
    opts: ["Sufficiently price-elastic", "Perfectly price-inelastic", "Completely unrelated to price"],
    correct: 0,
    exp: "The condition requires demand to be sufficiently responsive (elastic) to price changes for a devaluation to meaningfully shift trade volumes and improve the balance."
  },
  {
    concept: "The Elasticities Approach",
    q: "A country initially runs a trade deficit. According to the Marshall-Lerner framework, this implies:",
    opts: ["ωM > ωX (imports' trade share exceeds exports')", "ωX > ωM (exports' trade share exceeds imports')", "ωX must equal ωM exactly"],
    correct: 0,
    exp: "An initial trade deficit means imports exceed exports in value, so imports' share of total trade (ωM) exceeds exports' share (ωX)."
  },
  {
    concept: "Nominal & Real Exchange Rates",
    q: "Given exchange rates for currency pairs A/B and A/C, what can be computed?",
    opts: ["The cross-rate B/C between the other two currencies", "The interest rate in country A", "The GDP of country B"],
    correct: 0,
    exp: "Sharing a common currency (A) between two known exchange rate pairs allows you to derive the implied cross-rate between the other two currencies, B and C."
  },
  {
    concept: "Spot, Forward & FX Swaps",
    q: "Why do forward contracts exist alongside spot transactions in the FX market?",
    opts: ["Forward contracts allow market participants to lock in exchange rates for future settlement dates, managing currency risk that spot transactions can't address", "Forward contracts are simply a slower version of spot transactions with no functional difference", "Spot transactions have been phased out entirely"],
    correct: 0,
    exp: "Forward contracts specifically address the currency risk of future cash flows by fixing an exchange rate today, a need spot transactions (settling almost immediately) cannot serve."
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
          cfaRecordAnswer(item.concept, "Currency Exchange Rates", i === item.correct);
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
