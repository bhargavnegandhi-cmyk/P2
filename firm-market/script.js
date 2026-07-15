// ============================================================
// Introduction to the Firm and Market Organization — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }
function svgEl(tag, attrs){
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

/* ============================================================
   03 — Consumer surplus calculator + triangle chart
   ============================================================ */
(function(){
  const aI = document.getElementById('csA'), bI = document.getElementById('csB'), pI = document.getElementById('csP');
  const result = document.getElementById('csResult'), steps = document.getElementById('csSteps');
  const chartContainer = document.getElementById('csChart');
  if (!aI) return;

  function render(){
    const a = parseFloat(aI.value), b = parseFloat(bI.value), p = parseFloat(pI.value);
    const q = a - b*p;
    const priceIntercept = a/b;
    const cs = 0.5 * q * (priceIntercept - p);
    result.textContent = `Consumer surplus = ${fmt(cs,2)}`;
    steps.textContent = `Q=${fmt(q,2)}, price intercept=${fmt(priceIntercept,2)}, CS=½(${fmt(q,2)})(${fmt(priceIntercept-p,2)})=${fmt(cs,2)}`;

    // chart
    const W=440, H=260, padL=50, padR=20, padT=20, padB=36;
    const domainQMax = Math.max(a, q*1.2);
    const domainPMax = priceIntercept * 1.1;
    const xScale = qq => padL + (qq/domainQMax)*(W-padL-padR);
    const yScale = pp => (H-padB) - (pp/domainPMax)*(H-padT-padB);
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:460px;'});
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    // demand line
    svg.appendChild(svgEl('line', {x1:xScale(0), y1:yScale(priceIntercept), x2:xScale(a), y2:yScale(0), stroke:'#2B2560', 'stroke-width':2.2}));
    // triangle (consumer surplus)
    if (q > 0 && q <= domainQMax){
      const trianglePts = `${xScale(0)},${yScale(priceIntercept)} ${xScale(0)},${yScale(p)} ${xScale(q)},${yScale(p)}`;
      svg.appendChild(svgEl('polygon', {points:trianglePts, fill:'#E8A33D', 'fill-opacity':0.4}));
      // price line + quantity line
      svg.appendChild(svgEl('line', {x1:padL, x2:xScale(q), y1:yScale(p), y2:yScale(p), stroke:'#C77F1E', 'stroke-width':1.5, 'stroke-dasharray':'3,2'}));
      svg.appendChild(svgEl('line', {x1:xScale(q), x2:xScale(q), y1:yScale(p), y2:H-padB, stroke:'#C77F1E', 'stroke-width':1.5, 'stroke-dasharray':'3,2'}));
    }
    const xlabel = svgEl('text', {x:W/2, y:H-6, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    xlabel.textContent = 'Quantity';
    svg.appendChild(xlabel);
    const ylabel = svgEl('text', {x:12, y:padT+8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    ylabel.textContent = 'Price';
    svg.appendChild(ylabel);
    chartContainer.innerHTML = '';
    chartContainer.appendChild(svg);
  }
  [aI,bI,pI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   04 — Market equilibrium solver
   ============================================================ */
(function(){
  const aI = document.getElementById('eqA'), bI = document.getElementById('eqB'),
        cI = document.getElementById('eqC'), dI = document.getElementById('eqD');
  const result = document.getElementById('eqResult'), steps = document.getElementById('eqSteps');
  if (!aI) return;
  function render(){
    const a = parseFloat(aI.value), b = parseFloat(bI.value), c = parseFloat(cI.value), d = parseFloat(dI.value);
    // a - bQ = c + dQ  ->  a-c = (b+d)Q
    const Q = (a-c)/(b+d);
    const P = a - b*Q;
    result.textContent = `Q* = ${fmt(Q,2)}, P* = ${fmt(P,2)}`;
    steps.textContent = `${a} − ${b}Q = ${c} + ${d}Q → Q* = ${fmt(Q,2)} → P* = ${fmt(P,2)}`;
  }
  [aI,bI,cI,dI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   07 — Monopoly optimizer
   ============================================================ */
(function(){
  const aI = document.getElementById('mpA'), bI = document.getElementById('mpB'),
        fI = document.getElementById('mpF'), cI = document.getElementById('mpC'), dI = document.getElementById('mpD');
  const out = document.getElementById('mpOut');
  if (!aI) return;
  function render(){
    const a = parseFloat(aI.value), b = parseFloat(bI.value);
    const F = parseFloat(fI.value), c = parseFloat(cI.value), d = parseFloat(dI.value);
    // Demand: P = a - bQ  -> TR = aQ - bQ^2 -> MR = a - 2bQ
    // TC = F + cQ + dQ^2 -> MC = c + 2dQ
    // MR = MC: a - 2bQ = c + 2dQ -> a-c = (2b+2d)Q
    const Q = (a-c) / (2*b + 2*d);
    const P = a - b*Q;
    const TR = P*Q;
    const TC = F + c*Q + d*Q*Q;
    const profit = TR - TC;
    out.innerHTML = `
      <div class="stat-readout"><div class="k">Q*</div><div class="v">${fmt(Q,2)}</div></div>
      <div class="stat-readout"><div class="k">P*</div><div class="v">${fmt(P,2)}</div></div>
      <div class="stat-readout"><div class="k">Profit</div><div class="v">${fmt(profit,2)}</div></div>
    `;
  }
  [aI,bI,fI,cI,dI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   08 — Two-part tariff calculator
   ============================================================ */
(function(){
  const aI = document.getElementById('tpA'), bI = document.getElementById('tpB'), mcI = document.getElementById('tpMC');
  const out = document.getElementById('tpOut');
  if (!aI) return;
  function render(){
    const a = parseFloat(aI.value), b = parseFloat(bI.value), mc = parseFloat(mcI.value);
    const q = a - b*mc;
    const priceIntercept = a/b;
    const fee = 0.5 * q * (priceIntercept - mc);
    out.innerHTML = `
      <div class="stat-readout"><div class="k">Quantity</div><div class="v">${fmt(q,2)}</div></div>
      <div class="stat-readout"><div class="k">Membership fee</div><div class="v">${fmt(fee,2)}</div></div>
    `;
  }
  [aI,bI,mcI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-structures','sec-elasticityrevenue','sec-surplus','sec-pcequilibrium','sec-pclongrun','sec-monopolypower','sec-monopolyoptimal','sec-pricediscrimination','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-firm-market', String(pct)); } catch(e) {}
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
    concept: "Four Market Structures",
    q: "A market with many sellers, differentiated products, and some pricing power for each seller is best described as:",
    opts: ["Perfect competition", "Monopolistic competition", "Monopoly"],
    correct: 1,
    exp: "Many sellers plus product differentiation plus some (but not total) pricing power is the definition of monopolistic competition."
  },
  {
    concept: "Four Market Structures",
    q: "Which market structure has the HIGHEST barriers to entry?",
    opts: ["Perfect competition", "Oligopoly", "Monopoly"],
    correct: 2,
    exp: "Monopoly markets have the highest barriers to entry — that's precisely what allows a single seller to dominate without competition."
  },
  {
    concept: "Elasticity & Revenue",
    q: "A firm's price elasticity of demand is estimated at −0.5. If the firm raises its price, total revenue will:",
    opts: ["Rise", "Fall", "Stay exactly the same"],
    correct: 0,
    exp: "|−0.5| < 1, inelastic demand. Raising price on an inelastic good increases total revenue, since quantity falls proportionally less than price rises."
  },
  {
    concept: "Elasticity & Revenue",
    q: "Total revenue is maximized at the output level where:",
    opts: ["Marginal revenue equals zero", "Marginal cost equals zero", "Average revenue is at its minimum"],
    correct: 0,
    exp: "As long as MR is positive, selling more still adds to TR; TR peaks exactly where MR crosses zero."
  },
  {
    concept: "Consumer Surplus",
    q: "A demand curve has a price-axis intercept of 60. At the current price of 40, quantity demanded is 20. What is consumer surplus?",
    opts: ["800", "200", "400"],
    correct: 1,
    exp: "CS = ½ × base × height = ½ × 20 × (60−40) = ½ × 20 × 20 = 200."
  },
  {
    concept: "Optimal Price & Output (Perfect Competition)",
    q: "Market demand is P = 50 − 2Q, market supply is P = 5 + 3Q. What is the equilibrium quantity?",
    opts: ["9", "15", "5"],
    correct: 0,
    exp: "50 − 2Q = 5 + 3Q → 45 = 5Q → Q = 9."
  },
  {
    concept: "Optimal Price & Output (Perfect Competition)",
    q: "Under perfect competition, an individual firm's demand curve is:",
    opts: ["Downward sloping, matching the market demand curve", "Perfectly horizontal at the market price", "Perfectly vertical"],
    correct: 1,
    exp: "Even though market demand slopes downward, each individual firm in perfect competition faces a flat (horizontal) demand curve at the going market price — it has no power to charge more."
  },
  {
    concept: "Optimal Price & Output (Perfect Competition)",
    q: "In perfect competition, which equality holds for an individual firm?",
    opts: ["Price = Average Revenue = Marginal Revenue", "Price = Marginal Cost only, never Marginal Revenue", "Marginal Revenue always exceeds Price"],
    correct: 0,
    exp: "Because a perfectly competitive firm is a price taker, price, average revenue, and marginal revenue are all identical."
  },
  {
    concept: "Cost Curves & Long-Run Equilibrium",
    q: "In long-run equilibrium under perfect competition, a firm's economic profit is:",
    opts: ["Always strongly positive", "Exactly zero", "Always negative"],
    correct: 1,
    exp: "Free entry drives price down to minimum average cost in the long run, leaving economic profit at exactly zero (though the firm still earns a normal accounting return)."
  },
  {
    concept: "Cost Curves & Long-Run Equilibrium",
    q: "The condition marking long-run equilibrium in perfect competition is:",
    opts: ["Price = Marginal Cost = Minimum Average Cost", "Price is always above Marginal Cost", "Marginal Cost is falling"],
    correct: 0,
    exp: "Long-run equilibrium requires price to equal both marginal cost and the minimum point of average cost — the point where entry is no longer attractive."
  },
  {
    concept: "Sources of Market Power",
    q: "A single electric utility serving a city, authorized because building competing power grids would be wastefully expensive, is an example of monopoly power arising from:",
    opts: ["A patent", "Economies of scale (a natural monopoly)", "Network effects"],
    correct: 1,
    exp: "This is the classic natural monopoly case — large fixed infrastructure costs make a single provider more efficient than multiple competing ones."
  },
  {
    concept: "Sources of Market Power",
    q: "A monopolist's demand curve is QD = 300 − 3P. What is the price-axis intercept of its marginal revenue curve?",
    opts: ["100", "50", "200"],
    correct: 0,
    exp: "Rewriting demand as P = 100 − (1/3)QD, the price intercept is 100. MR shares the same price intercept as demand; only the slope doubles."
  },
  {
    concept: "Optimal Price & Output (Monopoly)",
    q: "A monopolist faces demand P = 600 − 3Q and total cost TC = 10,000 + 60Q + 2Q². What is the profit-maximizing quantity?",
    opts: ["54", "45", "60"],
    correct: 0,
    exp: "MR = 600 − 6Q, MC = 60 + 4Q. Setting equal: 600−6Q=60+4Q → 540=10Q → Q=54."
  },
  {
    concept: "Optimal Price & Output (Monopoly)",
    q: "A profit-maximizing monopolist (MR=MC, with MC>0) will always operate where demand is:",
    opts: ["Inelastic", "Elastic", "Unit elastic"],
    correct: 1,
    exp: "MR is only positive in the elastic region of a linear demand curve; since MC is positive at the optimum, MR=MC can only occur where demand is elastic."
  },
  {
    concept: "Optimal Price & Output (Monopoly)",
    q: "A firm's marginal cost is constant at 40, and its estimated price elasticity of demand is 2.0. Using MR=MC, what is the profit-maximizing price?",
    opts: ["80", "60", "40"],
    correct: 1,
    exp: "P = MC/(1 − 1/E) = 40/(1 − 1/2) = 40/0.5 = 80."
  },
  {
    concept: "Price Discrimination",
    q: "Charging airline passengers different prices based on how far in advance they book, assuming this reflects a systematic difference between leisure and business travelers, is an example of:",
    opts: ["First-degree price discrimination", "Second-degree price discrimination", "Third-degree price discrimination"],
    correct: 2,
    exp: "Segmenting customers by an observable characteristic (booking timing, as a proxy for traveler type) into different price tiers is third-degree price discrimination."
  },
  {
    concept: "Price Discrimination",
    q: "A gym charges a monthly membership fee plus a per-visit fee. This pricing structure is called a:",
    opts: ["Two-part tariff", "Volume discount", "Price ceiling"],
    correct: 0,
    exp: "A fixed fee plus a per-unit charge is the defining structure of a two-part tariff, designed to extract consumer surplus."
  },
  {
    concept: "Price Discrimination",
    q: "A consumer's demand is QD = 30 − 5P, and marginal cost is constant at €1. If a seller uses a two-part tariff, charging price = MC, how many units will the consumer buy?",
    opts: ["25", "30", "5"],
    correct: 0,
    exp: "QD = 30 − 5(1) = 25 units at price = marginal cost."
  },
  {
    concept: "Price Discrimination",
    q: "A regulator sets a natural monopoly's price where price equals long-run average cost. Compared to the unregulated monopoly price, this regulated price is:",
    opts: ["Higher", "Lower", "Exactly the same"],
    correct: 1,
    exp: "Regulating at average cost (a 'fair return') produces a lower price and higher output than the unregulated monopolist would choose on its own."
  },
  {
    concept: "Price Discrimination",
    q: "Setting a natural monopoly's price equal to marginal cost (the theoretically efficient outcome) often creates which practical problem?",
    opts: ["The firm earns excessive profit", "The price falls below average cost, requiring a subsidy to keep the firm viable", "Quantity demanded falls to zero"],
    correct: 1,
    exp: "For a natural monopoly with high fixed costs, marginal-cost pricing frequently doesn't cover average cost, meaning the firm would need a government subsidy to remain financially viable."
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
          cfaRecordAnswer(item.concept, "Firm & Market Organization", i === item.correct);
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
