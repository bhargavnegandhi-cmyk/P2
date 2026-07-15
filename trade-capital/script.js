// ============================================================
// International Trade and Capital Flows — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }

/* ============================================================
   03 — Absolute & comparative advantage calculator
   ============================================================ */
(function(){
  const a1I = document.getElementById('advA1'), a2I = document.getElementById('advA2'),
        b1I = document.getElementById('advB1'), b2I = document.getElementById('advB2');
  const out = document.getElementById('advOut');
  if (!a1I) return;
  function render(){
    const a1 = parseFloat(a1I.value), a2 = parseFloat(a2I.value);
    const b1 = parseFloat(b1I.value), b2 = parseFloat(b2I.value);

    // absolute advantage: whoever produces more per worker
    const absGood1 = a1 > b1 ? 'Country A' : b1 > a1 ? 'Country B' : 'Tied';
    const absGood2 = a2 > b2 ? 'Country A' : b2 > a2 ? 'Country B' : 'Tied';

    // opportunity cost of good 1 in terms of good 2 = good2/good1
    const oppCostA_good1 = a2/a1; // units of good2 given up per unit of good1
    const oppCostB_good1 = b2/b1;
    const oppCostA_good2 = a1/a2;
    const oppCostB_good2 = b1/b2;

    const compGood1 = oppCostA_good1 < oppCostB_good1 ? 'Country A' : oppCostB_good1 < oppCostA_good1 ? 'Country B' : 'Tied';
    const compGood2 = oppCostA_good2 < oppCostB_good2 ? 'Country A' : oppCostB_good2 < oppCostA_good2 ? 'Country B' : 'Tied';

    out.innerHTML = `
      <table class="exhibit" style="margin:0 0 10px;">
        <tr><th></th><th>Good 1</th><th>Good 2</th></tr>
        <tr><td>Absolute advantage</td><td class="num">${absGood1}</td><td class="num">${absGood2}</td></tr>
        <tr><td>Opp. cost (A)</td><td class="num">${fmt(oppCostA_good1,3)} of Good 2</td><td class="num">${fmt(oppCostA_good2,3)} of Good 1</td></tr>
        <tr><td>Opp. cost (B)</td><td class="num">${fmt(oppCostB_good1,3)} of Good 2</td><td class="num">${fmt(oppCostB_good2,3)} of Good 1</td></tr>
        <tr><td><strong>Comparative advantage</strong></td><td class="num"><strong>${compGood1}</strong></td><td class="num"><strong>${compGood2}</strong></td></tr>
      </table>
      <p style="margin:0; font-size:.85rem; color:var(--ink-soft);">Country ${compGood1 === 'Country A' ? 'A' : 'B'} should specialize in and export Good 1; Country ${compGood2 === 'Country A' ? 'A' : 'B'} should specialize in and export Good 2.</p>
    `;
  }
  [a1I,a2I,b1I,b2I].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   04 — Gains from trade range checker
   ============================================================ */
(function(){
  const aI = document.getElementById('gtA'), bI = document.getElementById('gtB'), worldI = document.getElementById('gtWorld');
  const result = document.getElementById('gtResult');
  if (!aI) return;
  function render(){
    let a = parseFloat(aI.value), b = parseFloat(bI.value);
    const world = parseFloat(worldI.value);
    const lo = Math.min(a,b), hi = Math.max(a,b);
    const works = world > lo && world < hi;
    result.innerHTML = `Valid range: [${fmt(lo,1)}, ${fmt(hi,1)}] · World price ${fmt(world,1)} ${works ? '<span style="color:var(--green); font-weight:700;">works for both</span>' : '<span style="color:var(--red); font-weight:700;">does NOT allow mutual gains</span>'}`;
  }
  [aI,bI,worldI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   08 — Current account calculator
   ============================================================ */
(function(){
  const yI = document.getElementById('caY'), cI = document.getElementById('caC'),
        iI = document.getElementById('caI'), gI = document.getElementById('caG');
  const result = document.getElementById('caResult'), steps = document.getElementById('caSteps');
  if (!yI) return;
  function render(){
    const y = parseFloat(yI.value), c = parseFloat(cI.value), i = parseFloat(iI.value), g = parseFloat(gI.value);
    const ca = y - (c+i+g);
    const label = ca >= 0 ? 'surplus' : 'deficit';
    result.textContent = `Current account = ${ca>=0?'':'−'}$${fmt(Math.abs(ca),1)}B (${label})`;
    steps.textContent = `${y} − (${c}+${i}+${g}) = ${fmt(ca,1)}`;
  }
  [yI,cI,iI,gI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-terminology','sec-patterns','sec-advantage','sec-gains','sec-ricardian','sec-heckscher','sec-bopcomponents','sec-nationalincome','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-trade-capital', String(pct)); } catch(e) {}
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
    concept: "GDP vs. GNP & Basic Terms",
    q: "GDP measures output produced by factors of production:",
    opts: ["Owned by a country's citizens, regardless of location", "Located within a country, regardless of ownership", "Exported to foreign countries only"],
    correct: 1,
    exp: "GDP counts output from factors of production located within a country's borders, regardless of who owns those factors."
  },
  {
    concept: "GDP vs. GNP & Basic Terms",
    q: "A US-owned factory operates in Vietnam. This factory's output counts toward:",
    opts: ["Vietnam's GDP and the US's GNP", "The US's GDP and Vietnam's GNP", "Neither country's GDP or GNP"],
    correct: 0,
    exp: "GDP is based on location (Vietnam), while GNP is based on ownership (US citizens/companies)."
  },
  {
    concept: "GDP vs. GNP & Basic Terms",
    q: "If a country's exports exceed its imports, it has a:",
    opts: ["Trade deficit", "Trade surplus", "Balanced trade position"],
    correct: 1,
    exp: "Exports greater than imports is the definition of a trade surplus."
  },
  {
    concept: "Patterns & Trends in Trade",
    q: "Foreign direct investment (FDI) is best distinguished from foreign portfolio investment (FPI) by:",
    opts: ["FDI involves direct investment in productive assets with operational control; FPI is shorter-term financial investment without control", "FDI is always smaller in scale than FPI", "FDI only occurs between developed countries"],
    correct: 0,
    exp: "FDI involves a firm directly investing in and controlling productive foreign assets, while FPI is shorter-term investment in foreign financial instruments without operational control."
  },
  {
    concept: "Absolute vs. Comparative Advantage",
    q: "A country has an absolute advantage in producing a good when it:",
    opts: ["Has a lower opportunity cost of producing that good", "Can produce that good using fewer resources than its trading partner", "Exports more of that good than it imports"],
    correct: 1,
    exp: "Absolute advantage means being more efficient in production — using fewer resources or producing more output per worker — regardless of opportunity cost."
  },
  {
    concept: "Absolute vs. Comparative Advantage",
    q: "A country has a comparative advantage in producing a good when it:",
    opts: ["Produces more of that good in absolute terms", "Has a lower opportunity cost of producing that good than its trading partner", "Has never traded that good before"],
    correct: 1,
    exp: "Comparative advantage is specifically about opportunity cost — the good given up to produce one more unit of the good in question — not raw output levels."
  },
  {
    concept: "Absolute vs. Comparative Advantage",
    q: "Worker output: Country X makes 30 shirts or 10 hats per day; Country Y makes 20 shirts or 5 hats per day. What is Country X's opportunity cost of one hat?",
    opts: ["3 shirts", "4 shirts", "2 shirts"],
    correct: 0,
    exp: "Country X can make 30 shirts or 10 hats, so one hat costs 30/10 = 3 shirts forgone."
  },
  {
    concept: "Absolute vs. Comparative Advantage",
    q: "Even if one country has an absolute advantage in producing every good, can both countries still gain from trade?",
    opts: ["No, trade only benefits the country with the absolute advantage", "Yes, as long as each country still has a comparative advantage in something", "Only if both countries have identical technology"],
    correct: 1,
    exp: "Comparative advantage guarantees mutual gains from trade even when one country is absolutely more efficient at producing everything — as long as opportunity costs differ."
  },
  {
    concept: "The Gains from Trade",
    q: "Two countries' autarkic prices for a good (in terms of another good) are 4 and 10. Which world price allows both countries to gain from trade?",
    opts: ["3", "7", "11"],
    correct: 1,
    exp: "Any world price strictly between the two autarkic prices (4 and 10) allows mutual gains; 7 falls within that range."
  },
  {
    concept: "The Ricardian Model",
    q: "In the Ricardian model of trade, comparative advantage arises from differences in:",
    opts: ["Relative capital and labor endowments", "Labor productivity, reflecting differences in technology", "Government trade policy alone"],
    correct: 1,
    exp: "The Ricardian model has labor as the only variable factor of production, so differences in labor productivity (driven by technology) are the sole source of comparative advantage."
  },
  {
    concept: "The Heckscher–Ohlin Model",
    q: "The Heckscher–Ohlin model differs from the Ricardian model primarily by:",
    opts: ["Including capital as a second variable factor of production alongside labor", "Assuming no trade barriers exist anywhere", "Ignoring labor productivity entirely"],
    correct: 0,
    exp: "Heckscher–Ohlin adds capital as a second factor, making relative factor endowments (not just technology) the source of comparative advantage."
  },
  {
    concept: "The Heckscher–Ohlin Model",
    q: "According to the Heckscher–Ohlin model, a capital-abundant country would be expected to:",
    opts: ["Export labor-intensive goods and import capital-intensive goods", "Export capital-intensive goods and import labor-intensive goods", "Neither export nor import capital-intensive goods"],
    correct: 1,
    exp: "A country specializes in and exports goods intensive in the factor it holds abundantly — for a capital-abundant country, that's capital-intensive goods."
  },
  {
    concept: "The Heckscher–Ohlin Model",
    q: "Which trade model allows for the possibility that trade redistributes income within a country, benefiting the abundant factor and hurting the scarce factor?",
    opts: ["The Ricardian model", "The Heckscher–Ohlin model", "Neither model addresses income redistribution"],
    correct: 1,
    exp: "Because Heckscher–Ohlin has two factors of production, opening to trade changes relative factor prices, benefiting the abundant factor and hurting the scarce one — a dynamic the single-factor Ricardian model can't capture."
  },
  {
    concept: "BOP Components",
    q: "The balance of payments' current account includes which of the following sub-accounts?",
    opts: ["Merchandise trade, services, income receipts, and unilateral transfers", "Only merchandise trade", "Capital transfers and financial asset flows only"],
    correct: 0,
    exp: "The current account has four sub-accounts: merchandise trade, services, income receipts, and unilateral transfers."
  },
  {
    concept: "BOP Components",
    q: "A worker sends money home to family in another country as a remittance. This is recorded in the BOP under:",
    opts: ["Merchandise trade", "Unilateral transfers", "The financial account"],
    correct: 1,
    exp: "A one-way transfer of money with nothing given in exchange, like a remittance, belongs in unilateral transfers within the current account."
  },
  {
    concept: "BOP Components",
    q: "The financial account of the balance of payments records:",
    opts: ["Physical goods bought and sold across borders", "A country's financial assets abroad and foreign-owned financial assets domestically", "Tourism and transportation services only"],
    correct: 1,
    exp: "The financial account tracks investment flows — assets held abroad by domestic residents and domestic assets held by foreigners."
  },
  {
    concept: "The National Income Identity",
    q: "The open-economy national income identity is:",
    opts: ["Y = C + I + G", "Y = C + I + G + (X − M)", "Y = C − I − G"],
    correct: 1,
    exp: "Once trade is introduced, the identity expands to include net exports: Y = C + I + G + (X − M)."
  },
  {
    concept: "The National Income Identity",
    q: "A country's GDP (Y) is $800B, and C+I+G total $760B. What is its current account balance?",
    opts: ["A $40B surplus", "A $40B deficit", "Exactly balanced"],
    correct: 0,
    exp: "CA = Y − (C+I+G) = 800 − 760 = $40B, a surplus, since the country produces more than it spends domestically."
  },
  {
    concept: "The National Income Identity",
    q: "A country running a persistent current account deficit is, in effect:",
    opts: ["Lending its surplus savings to foreign countries", "Importing present consumption and exporting a claim on future consumption", "Completely self-sufficient with no foreign borrowing"],
    correct: 1,
    exp: "A current account deficit means a country consumes more than it produces, financed by borrowing from abroad — effectively trading future repayment obligations for present consumption."
  },
  {
    concept: "BOP Components",
    q: "Every individual transaction recorded in the balance of payments generates:",
    opts: ["Only a credit entry", "Only a debit entry", "One offsetting debit and one offsetting credit"],
    correct: 2,
    exp: "Double-entry bookkeeping underlies the BOP — every transaction generates matching debit and credit entries, which is exactly why the overall balance of payments always balances by construction."
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
          cfaRecordAnswer(item.concept, "International Trade & Capital Flows", i === item.correct);
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
