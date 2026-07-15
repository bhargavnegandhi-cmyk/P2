// ============================================================
// Economics Foundations — interactivity
// ============================================================

function fmt(n, d=2){ return isFinite(n) ? n.toFixed(d) : "—"; }
function svgEl(tag, attrs){
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

/* ============================================================
   01 — Opportunity cost calculator
   ============================================================ */
(function(){
  const aI = document.getElementById('ocA'), bI = document.getElementById('ocB');
  const result = document.getElementById('ocResult');
  if (!aI) return;
  function render(){
    const a = parseFloat(aI.value), b = parseFloat(bI.value);
    result.textContent = `Opportunity cost of choosing A = ${fmt(b,2)}`;
  }
  [aI,bI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   03 — Production Possibilities Frontier (PPF) chart
   ============================================================ */
(function(){
  const container = document.getElementById('ppfChart');
  const tabs = document.getElementById('ppfTabs');
  const caption = document.getElementById('ppfCaption');
  if (!container) return;

  const W=460, H=280, padL=50, padR=20, padT=20, padB=40;
  const xScale = q => padL + (q/100)*(W-padL-padR);
  const yScale = q => (H-padB) - (q/100)*(H-padT-padB);

  // bowed-out PPF: using a quarter-ellipse-like curve from (0,90) to (90,0)
  function ppfY(x, maxX=90, maxY=90){
    // ellipse formula: (x/maxX)^2 + (y/maxY)^2 = 1
    const ratio = x/maxX;
    if (ratio > 1) return 0;
    return maxY * Math.sqrt(1 - ratio*ratio);
  }

  const captions = {
    onCurve: "This point sits exactly on the frontier — production is efficient. Every resource is fully and effectively employed; producing more of one good requires giving up some of the other.",
    inside: "This point sits inside the frontier — production is inefficient. Resources are unemployed or misallocated. More of both goods could be produced without shifting the curve at all.",
    outside: "This point sits outside the frontier — currently unattainable with existing resources and technology, no matter how efficiently they're used.",
    growth: "Economic growth — more resources or better technology — shifts the entire frontier outward. Points that were unattainable a moment ago are now reachable."
  };

  function render(mode){
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:480px;'});
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));

    // growth mode: draw original + shifted curve
    if (mode === 'growth'){
      let d0 = '';
      for (let x=0; x<=90; x+=2){ const y = ppfY(x); d0 += (x===0?'M':'L')+xScale(x)+','+yScale(y)+' '; }
      svg.appendChild(svgEl('path', {d:d0, fill:'none', stroke:'#9c94c9', 'stroke-width':2, 'stroke-dasharray':'5,4'}));
      let d1 = '';
      for (let x=0; x<=115; x+=2){ const y = ppfY(x, 115, 115); d1 += (x===0?'M':'L')+xScale(x)+','+yScale(y)+' '; }
      svg.appendChild(svgEl('path', {d:d1, fill:'none', stroke:'#2F8F6B', 'stroke-width':2.5}));
      const lbl1 = svgEl('text', {x:xScale(20), y:yScale(ppfY(20))-8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#9c94c9', 'font-weight':'700'});
      lbl1.textContent = 'Before';
      svg.appendChild(lbl1);
      const lbl2 = svgEl('text', {x:xScale(50), y:yScale(ppfY(50,115,115))-8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#2F8F6B', 'font-weight':'700'});
      lbl2.textContent = 'After growth';
      svg.appendChild(lbl2);
    } else {
      let d = '';
      for (let x=0; x<=90; x+=2){ const y = ppfY(x); d += (x===0?'M':'L')+xScale(x)+','+yScale(y)+' '; }
      svg.appendChild(svgEl('path', {d, fill:'none', stroke:'#2B2560', 'stroke-width':2.5}));

      let px, py, color, label;
      if (mode === 'onCurve'){ px=45; py=ppfY(45); color='#2F8F6B'; label='Efficient'; }
      else if (mode === 'inside'){ px=35; py=35; color='#C77F1E'; label='Inefficient'; }
      else { px=75; py=55; color='#D6573F'; label='Unattainable'; }

      svg.appendChild(svgEl('circle', {cx:xScale(px), cy:yScale(py), r:6, fill:color, stroke:'#fff', 'stroke-width':1.5}));
      const lbl = svgEl('text', {x:xScale(px)+10, y:yScale(py)-8, 'font-family':'IBM Plex Mono', 'font-size':10, fill:color, 'font-weight':'700'});
      lbl.textContent = label;
      svg.appendChild(lbl);
    }

    const xlabel = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    xlabel.textContent = 'Tractors →';
    svg.appendChild(xlabel);
    const ylabel = svgEl('text', {x:14, y:padT+8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    ylabel.textContent = 'Wheat ↑';
    svg.appendChild(ylabel);

    container.innerHTML = '';
    container.appendChild(svg);
    caption.textContent = captions[mode];
  }

  tabs.querySelectorAll('.test-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.test-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.mode);
    });
  });
  render('onCurve');
})();

/* ============================================================
   06 — Movements vs shifts demand curve chart
   ============================================================ */
(function(){
  const container = document.getElementById('shiftChart');
  const tabs = document.getElementById('shiftTabs');
  const caption = document.getElementById('shiftCaption');
  if (!container) return;

  const W=460, H=260, padL=50, padR=20, padT=20, padB=36;
  const xScale = q => padL + (q/100)*(W-padL-padR);
  const yScale = p => (H-padB) - (p/100)*(H-padT-padB);

  const captions = {
    movement: "A change in PRICE — the variable on this curve's own vertical axis — causes a movement along the same, unchanged demand curve. Points A and B sit on the identical line.",
    shiftright: "A rise in INCOME isn't on either axis, so it shifts the entire curve to the right — at every price, buyers now demand more than before.",
    shiftleft: "Weaker consumer preferences for the good aren't on either axis either — they shift the entire curve to the left, reducing quantity demanded at every price."
  };

  function render(mode){
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:480px;'});
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));

    function demandLine(offset){
      let d = '';
      const pts = [[10+offset,85],[90+offset,10]];
      d = `M${xScale(pts[0][0])},${yScale(pts[0][1])} L${xScale(pts[1][0])},${yScale(pts[1][1])}`;
      return d;
    }

    if (mode === 'movement'){
      svg.appendChild(svgEl('path', {d:demandLine(0), fill:'none', stroke:'#2B2560', 'stroke-width':2.5}));
      const A = {q:30, p:65}, B = {q:60, p:35};
      [[A,'A','#2F8F6B'],[B,'B','#D6573F']].forEach(([pt,label,color]) => {
        svg.appendChild(svgEl('circle', {cx:xScale(pt.q), cy:yScale(pt.p), r:5, fill:color, stroke:'#fff', 'stroke-width':1.5}));
        const t = svgEl('text', {x:xScale(pt.q)+8, y:yScale(pt.p)-6, 'font-family':'IBM Plex Mono', 'font-size':10, fill:color, 'font-weight':'700'});
        t.textContent = label;
        svg.appendChild(t);
      });
      svg.appendChild(svgEl('line', {x1:xScale(A.q), y1:yScale(A.p), x2:xScale(B.q), y2:yScale(B.p), stroke:'#C77F1E', 'stroke-width':1, 'stroke-dasharray':'3,2'}));
    } else {
      svg.appendChild(svgEl('path', {d:demandLine(0), fill:'none', stroke:'#9c94c9', 'stroke-width':2, 'stroke-dasharray':'5,4'}));
      const offset = mode === 'shiftright' ? 20 : -20;
      const color = mode === 'shiftright' ? '#2F8F6B' : '#D6573F';
      svg.appendChild(svgEl('path', {d:demandLine(offset), fill:'none', stroke:color, 'stroke-width':2.5}));
      const arrowY = 50;
      const arrowX1 = xScale(50), arrowX2 = xScale(50+offset*0.6);
      svg.appendChild(svgEl('line', {x1:arrowX1, y1:yScale(arrowY), x2:arrowX2, y2:yScale(arrowY), stroke:color, 'stroke-width':1.5}));
      const t = svgEl('text', {x:(arrowX1+arrowX2)/2, y:yScale(arrowY)-6, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:color, 'font-weight':'700'});
      t.textContent = mode === 'shiftright' ? 'Shift →' : '← Shift';
      svg.appendChild(t);
    }

    const xlabel = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    xlabel.textContent = 'Quantity →';
    svg.appendChild(xlabel);
    const ylabel = svgEl('text', {x:14, y:padT+8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
    ylabel.textContent = 'Price ↑';
    svg.appendChild(ylabel);

    container.innerHTML = '';
    container.appendChild(svg);
    caption.textContent = captions[mode];
  }

  tabs.querySelectorAll('.test-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.test-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.mode);
    });
  });
  render('movement');
})();

/* ============================================================
   07 — Circular flow diagram (4-sector, static)
   ============================================================ */
(function(){
  const container = document.getElementById('circularFlowChart');
  if (!container) return;
  const W=520, H=320;
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', style:'max-width:560px;'});

  function box(x,y,w,h,label,color){
    svg.appendChild(svgEl('rect', {x,y,width:w,height:h,rx:8,fill:color}));
    const t = svgEl('text', {x:x+w/2, y:y+h/2+4, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':11, fill:'#fff', 'font-weight':'700'});
    t.textContent = label;
    svg.appendChild(t);
  }
  box(30, 130, 110, 55, 'Households', '#2B2560');
  box(380, 130, 110, 55, 'Firms', '#C77F1E');
  box(190, 20, 130, 45, 'Government', '#2F8F6B');
  box(190, 255, 130, 45, 'Foreign Sector', '#8B5CF6');

  function arrow(x1,y1,x2,y2,color,label,labelX,labelY){
    svg.appendChild(svgEl('line', {x1,y1,x2,y2,stroke:color,'stroke-width':1.8,'marker-end':'url(#arrowhead)'}));
    if (label){
      const t = svgEl('text', {x:labelX, y:labelY, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':8, fill:color, 'font-weight':'600'});
      t.textContent = label;
      svg.appendChild(t);
    }
  }
  const defs = svgEl('defs', {});
  const marker = svgEl('marker', {id:'arrowhead', markerWidth:7, markerHeight:7, refX:5, refY:2.5, orient:'auto'});
  marker.appendChild(svgEl('path', {d:'M0,0 L5,2.5 L0,5 Z', fill:'#4A4763'}));
  defs.appendChild(marker);
  svg.insertBefore(defs, svg.firstChild);

  // households <-> firms (top: labor/capital to firms; bottom: goods to households)
  arrow(140, 145, 380, 145, '#4A4763', 'Labor & capital', 260, 138);
  arrow(380, 168, 140, 168, '#4A4763', 'Wages, profit', 260, 183);
  // households/firms <-> government (taxes up, spending down)
  arrow(95, 130, 220, 65, '#2F8F6B', 'Taxes', 140, 90);
  arrow(320, 65, 435, 130, '#2F8F6B', 'Spending', 400, 90);
  // firms <-> foreign sector (exports/imports)
  arrow(435, 185, 320, 255, '#8B5CF6', 'Exports', 400, 230);
  arrow(220, 255, 95, 185, '#8B5CF6', 'Imports', 140, 230);

  container.appendChild(svg);
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
const sectionIds = ['sec-scarcity','sec-factors','sec-ppf','sec-micromacro','sec-positivenormative','sec-graphs','sec-circularflow','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-econ-foundations', String(pct)); } catch(e) {}
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
    concept: "Scarcity & Opportunity Cost",
    q: "Economics is best defined as the study of:",
    opts: ["How to maximize government revenue", "How individuals, firms, and societies allocate scarce resources among competing wants", "How stock markets set prices"],
    correct: 1,
    exp: "The core definition of economics centers on the allocation of scarce resources among unlimited, competing wants."
  },
  {
    concept: "Scarcity & Opportunity Cost",
    q: "Scarcity means:",
    opts: ["A resource is rare in the everyday sense, like a precious gemstone", "Resources are limited relative to the unlimited uses people would like to put them to", "A good has no value at all"],
    correct: 1,
    exp: "Scarcity is a relative concept — resources being limited compared to the demands placed on them — not simply 'being rare.'"
  },
  {
    concept: "Scarcity & Opportunity Cost",
    q: "A student chooses to attend a 3-hour lecture instead of working a 3-hour paid shift at $20/hour. What is the opportunity cost of attending the lecture?",
    opts: ["$0, since no cash was spent", "$60, the forgone wages from the shift", "The cost of tuition"],
    correct: 1,
    exp: "Opportunity cost is the value of the next-best alternative given up — here, the $60 in wages the student could have earned instead."
  },
  {
    concept: "Factors of Production & Economic Systems",
    q: "Which of the following is an example of capital, in the economic sense?",
    opts: ["A $10,000 bank account", "A factory's manufacturing equipment", "A worker's salary"],
    correct: 1,
    exp: "Capital refers to tools, machinery, and equipment used to produce other goods — not money itself, which is just a claim used to acquire capital."
  },
  {
    concept: "Factors of Production & Economic Systems",
    q: "In a command economy, production and resource allocation decisions are primarily made by:",
    opts: ["Prices set by supply and demand", "A central planning authority", "Individual consumers acting independently"],
    correct: 1,
    exp: "A command economy relies on centralized planning and decree rather than market price signals to allocate resources."
  },
  {
    concept: "Factors of Production & Economic Systems",
    q: "Most real-world economies today are best described as:",
    opts: ["Pure market economies with zero government involvement", "Pure command economies with total central planning", "Mixed economies, blending market allocation with government intervention"],
    correct: 2,
    exp: "Nearly every real economy combines market-based allocation with some degree of government intervention — a mixed economy."
  },
  {
    concept: "The Production Possibilities Frontier",
    q: "A point that lies exactly on a production possibilities frontier (PPF) represents:",
    opts: ["Inefficient production, with unemployed resources", "Efficient production, with resources fully and effectively employed", "A point that is currently unattainable"],
    correct: 1,
    exp: "Points on the PPF itself represent efficient production — the maximum output achievable given current resources and technology."
  },
  {
    concept: "The Production Possibilities Frontier",
    q: "A point lying inside a country's PPF indicates that:",
    opts: ["More of both goods could be produced without any new resources, simply by using existing resources better", "The economy has achieved maximum efficiency", "The point is impossible under any circumstances"],
    correct: 0,
    exp: "A point inside the frontier means resources are unemployed or misallocated — more of both goods is achievable without any new resources at all."
  },
  {
    concept: "The Production Possibilities Frontier",
    q: "What causes a production possibilities frontier to shift outward over time?",
    opts: ["A decrease in consumer spending", "Economic growth — more resources or improved technology", "A rise in the price level"],
    correct: 1,
    exp: "Only genuine economic growth — more capital, more labor, or better technology — can shift the entire PPF outward, making previously unattainable points reachable."
  },
  {
    concept: "Microeconomics vs. Macroeconomics",
    q: "\"Why did the price of a specific company's stock rise 5% today?\" is best classified as a question of:",
    opts: ["Macroeconomics", "Microeconomics", "Neither branch of economics"],
    correct: 1,
    exp: "A question about an individual security or market is microeconomics — the study of individual decision-makers and specific markets."
  },
  {
    concept: "Microeconomics vs. Macroeconomics",
    q: "\"What determines a country's overall inflation rate?\" is best classified as a question of:",
    opts: ["Microeconomics", "Macroeconomics", "Neither branch of economics"],
    correct: 1,
    exp: "Inflation is an economy-wide, aggregate phenomenon, making this a macroeconomic question."
  },
  {
    concept: "Microeconomics vs. Macroeconomics",
    q: "Which CFA prerequisite Economics modules studied so far are examples of microeconomics?",
    opts: ["Modules E1 and E2 (demand/supply and firm/market structures)", "Modules E3 through E7 (GDP through currency)", "All seven modules equally"],
    correct: 0,
    exp: "E1 (demand and supply) and E2 (market structures) study individual markets and firms — microeconomics. E3 onward studies the whole economy — macroeconomics."
  },
  {
    concept: "Positive vs. Normative Economics",
    q: "\"Raising interest rates tends to reduce business investment spending\" is an example of:",
    opts: ["A normative statement", "A positive statement", "Neither positive nor normative"],
    correct: 1,
    exp: "This is a testable, factual claim about cause and effect — the definition of a positive economic statement."
  },
  {
    concept: "Positive vs. Normative Economics",
    q: "\"The central bank should prioritize full employment over low inflation\" is an example of:",
    opts: ["A positive statement", "A normative statement", "An accounting identity"],
    correct: 1,
    exp: "This expresses a value judgment about what policy ought to prioritize — a normative statement, not a testable fact."
  },
  {
    concept: "Positive vs. Normative Economics",
    q: "Which quick test helps distinguish a normative statement from a positive one?",
    opts: ["Positive statements always involve large numbers", "Normative statements typically contain or imply the word 'should'", "Positive statements are always about macroeconomics"],
    correct: 1,
    exp: "Statements containing or implying 'should' are almost always normative — expressing what ought to happen rather than a testable factual claim."
  },
  {
    concept: "Reading a Graph — Movements vs. Shifts",
    q: "On a standard price-quantity demand curve, a change in the good's own price causes:",
    opts: ["A shift of the entire curve", "A movement along the existing curve", "No change at all"],
    correct: 1,
    exp: "Since price is one of the two axes on a demand curve, a change in price causes movement along the curve, not a shift."
  },
  {
    concept: "Reading a Graph — Movements vs. Shifts",
    q: "On a standard price-quantity demand curve, a change in consumer income causes:",
    opts: ["A movement along the existing curve", "A shift of the entire curve", "The axes to be relabeled"],
    correct: 1,
    exp: "Income isn't one of the curve's own two axes, so a change in income shifts the entire demand curve rather than moving along it."
  },
  {
    concept: "The Circular Flow of Income",
    q: "In the circular flow model, which sector collects taxes and injects spending back into the economy?",
    opts: ["Households", "Firms", "The government"],
    correct: 2,
    exp: "The government sector collects taxes from households and firms and injects spending back into the economy."
  },
  {
    concept: "The Circular Flow of Income",
    q: "In the circular flow model, the foreign sector's role includes:",
    opts: ["Setting domestic interest rates", "Absorbing a country's exports and supplying its imports", "Collecting income taxes"],
    correct: 1,
    exp: "The foreign sector (rest of the world) buys a country's exports and sells it imports, completing the circular flow's international leg."
  },
  {
    concept: "The Circular Flow of Income",
    q: "The national income identity GDP = C + I + G + (X−M) relates to the circular flow model because:",
    opts: ["It has nothing to do with the circular flow", "Each term in the formula corresponds to one of the flows between sectors in the circular flow diagram", "It only applies to command economies"],
    correct: 1,
    exp: "GDP = C+I+G+(X−M) is essentially the circular flow model written as an equation — C is the household-to-firm consumption flow, G is government spending, and (X−M) is the net foreign-sector flow."
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
          cfaRecordAnswer(item.concept, "Economics Foundations", i === item.correct);
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
