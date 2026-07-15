// ============================================================
// Topics in Demand and Supply Analysis — interactivity
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

/* ============================================================
   01 — Demand function calculator + demand curve chart
   ============================================================ */
(function(){
  const pxI = document.getElementById('dfPx'), iI = document.getElementById('dfI'), pyI = document.getElementById('dfPy');
  const result = document.getElementById('dfResult'), steps = document.getElementById('dfSteps');
  const chartContainer = document.getElementById('demandCurveChart');
  if (!pxI) return;

  function computeQ(px, income, py){
    return 84.5 - 6.39*px + 0.25*income - 2*py;
  }

  function renderChart(px, income, py){
    const W=520, H=280, padL=50, padR=20, padT=20, padB=40;
    // inverse demand: Px = a - b*Qx, holding income/py fixed
    const intercept = (84.5 + 0.25*income - 2*py) / 6.39; // Qx-intercept (Px=0)
    const bCoef = 1/6.39; // slope of inverse demand: dPx/dQx = -1/6.39... actually Px=(const - Qx)/6.39
    const maxQ = intercept;
    const maxP = intercept / 6.39 * 6.39; // just for scaling; compute directly:
    function priceAt(q){ return (84.5 + 0.25*income - 2*py - q) / 6.39; }
    const domainQMax = intercept * 1.05;
    const domainPMax = priceAt(0) * 1.1;
    const xScale = q => padL + (q/domainQMax)*(W-padL-padR);
    const yScale = p => (H-padB) - (p/domainPMax)*(H-padT-padB);

    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:560px;'});
    // axes
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
    const xlabel = svgEl('text', {x:W/2, y:H-6, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':10, fill:'#4A4763'});
    xlabel.textContent = 'Qx (liters/month)';
    svg.appendChild(xlabel);
    const ylabel = svgEl('text', {x:14, y:padT+10, 'font-family':'IBM Plex Mono', 'font-size':10, fill:'#4A4763'});
    ylabel.textContent = 'Px (€)';
    svg.appendChild(ylabel);
    // demand line
    const q0 = 0, q1 = Math.max(0, intercept);
    const p0 = priceAt(q0), p1 = priceAt(q1);
    svg.appendChild(svgEl('line', {x1:xScale(q0), y1:yScale(p0), x2:xScale(q1), y2:yScale(p1), stroke:'#2B2560', 'stroke-width':2.5}));
    // current point
    const currentQ = computeQ(px, income, py);
    if (currentQ >= 0 && currentQ <= domainQMax){
      const cx = xScale(currentQ), cy = yScale(px);
      svg.appendChild(svgEl('line', {x1:cx, x2:cx, y1:cy, y2:H-padB, stroke:'#E8A33D', 'stroke-width':1, 'stroke-dasharray':'3,2'}));
      svg.appendChild(svgEl('line', {x1:padL, x2:cx, y1:cy, y2:cy, stroke:'#E8A33D', 'stroke-width':1, 'stroke-dasharray':'3,2'}));
      svg.appendChild(svgEl('circle', {cx, cy, r:5, fill:'#C77F1E', stroke:'#fff', 'stroke-width':1.5}));
      const lbl = svgEl('text', {x:cx+8, y:cy-8, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#C77F1E', 'font-weight':'700'});
      lbl.textContent = `(${fmt(currentQ,1)}, €${fmt(px,2)})`;
      svg.appendChild(lbl);
    }
    // axis ticks
    for (let i=0;i<=4;i++){
      const q = domainQMax*i/4;
      const t = svgEl('text', {x:xScale(q), y:H-padB+14, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':8, fill:'#4A4763'});
      t.textContent = Math.round(q);
      svg.appendChild(t);
      const p = domainPMax*i/4;
      const t2 = svgEl('text', {x:padL-6, y:yScale(p)+3, 'text-anchor':'end', 'font-family':'IBM Plex Mono', 'font-size':8, fill:'#4A4763'});
      t2.textContent = fmt(p,1);
      svg.appendChild(t2);
    }
    chartContainer.innerHTML = '';
    chartContainer.appendChild(svg);
  }

  function render(){
    const px = parseFloat(pxI.value), income = parseFloat(iI.value), py = parseFloat(pyI.value);
    const q = computeQ(px, income, py);
    result.textContent = `Qx = ${fmt(q,2)} liters/month`;
    steps.textContent = `84.5 − 6.39(${px}) + 0.25(${income}) − 2(${py}) = ${fmt(q,2)}`;
    renderChart(px, income, py);
  }
  [pxI,iI,pyI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   02 — Elasticity calculator + zone chart
   ============================================================ */
(function(){
  const slopeI = document.getElementById('elSlope'), pI = document.getElementById('elP'), qI = document.getElementById('elQ');
  const result = document.getElementById('elResult'), steps = document.getElementById('elSteps');
  if (!slopeI) return;
  function classify(e){
    const abs = Math.abs(e);
    if (abs > 1.02) return {label:'ELASTIC', cls:'elastic'};
    if (abs < 0.98) return {label:'INELASTIC', cls:'inelastic'};
    return {label:'UNIT ELASTIC', cls:'unit'};
  }
  function render(){
    const slope = parseFloat(slopeI.value), p = parseFloat(pI.value), q = parseFloat(qI.value);
    const e = slope * (p/q);
    const c = classify(e);
    result.innerHTML = `E = ${fmt(e,3)} <span class="elastic-zone-tag ${c.cls}">${c.label}</span>`;
    steps.textContent = `${slope} × (${p}/${q}) = ${fmt(e,3)}`;
  }
  [slopeI,pI,qI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   02b — Elasticity zone chart (static illustrative demand line)
   ============================================================ */
(function(){
  const container = document.getElementById('elasticityZoneChart');
  if (!container) return;
  const W=520, H=240, padL=40, padR=20, padT=20, padB=30;
  // simple line from (0, 10) to (100, 0)
  const xScale = q => padL + (q/100)*(W-padL-padR);
  const yScale = p => (H-padB) - (p/10)*(H-padT-padB);
  const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:560px;'});
  svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1.5}));
  // full line
  svg.appendChild(svgEl('line', {x1:xScale(0), y1:yScale(10), x2:xScale(100), y2:yScale(0), stroke:'#2B2560', 'stroke-width':2.5}));
  // zone shading via colored segments (upper = elastic red-ish, mid = unit amber, lower = inelastic green)
  function seg(q1,q2,color){
    svg.appendChild(svgEl('line', {x1:xScale(q1), y1:yScale(10-q1*0.1), x2:xScale(q2), y2:yScale(10-q2*0.1), stroke:color, 'stroke-width':5, opacity:0.55}));
  }
  seg(0,40,'#D6573F');
  seg(40,60,'#E8A33D');
  seg(60,100,'#2F8F6B');
  const labels = [[20,'Elastic','#8a2f1c'],[50,'Unit Elastic','#C77F1E'],[80,'Inelastic','#1c5b41']];
  labels.forEach(([q,txt,color]) => {
    const t = svgEl('text', {x:xScale(q), y:yScale(10-q*0.1)-12, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:color, 'font-weight':'700'});
    t.textContent = txt;
    svg.appendChild(t);
  });
  const midMark = svgEl('circle', {cx:xScale(50), cy:yScale(5), r:4, fill:'#E8A33D', stroke:'#fff', 'stroke-width':1.5});
  svg.appendChild(midMark);
  const xl = svgEl('text', {x:W/2, y:H-8, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  xl.textContent = 'Quantity →';
  svg.appendChild(xl);
  const yl = svgEl('text', {x:14, y:padT+10, 'font-family':'IBM Plex Mono', 'font-size':9, fill:'#4A4763'});
  yl.textContent = 'Price';
  svg.appendChild(yl);
  container.appendChild(svg);
})();

/* ============================================================
   04 — Income / cross-price elasticity calculator
   ============================================================ */
(function(){
  const slopeI = document.getElementById('icSlope'), varI = document.getElementById('icVar'), qI = document.getElementById('icQ');
  const result = document.getElementById('icResult'), steps = document.getElementById('icSteps');
  if (!slopeI) return;
  function render(){
    const slope = parseFloat(slopeI.value), v = parseFloat(varI.value), q = parseFloat(qI.value);
    const e = slope * (v/q);
    let label, cls;
    if (e > 0.02){ label='POSITIVE (Normal / Substitute)'; cls='inelastic'; }
    else if (e < -0.02){ label='NEGATIVE (Inferior / Complement)'; cls='elastic'; }
    else { label='ZERO'; cls='unit'; }
    result.innerHTML = `E = ${fmt(e,3)} <span class="elastic-zone-tag ${cls}">${label}</span>`;
    steps.textContent = `${slope} × (${v}/${q}) = ${fmt(e,3)}`;
  }
  [slopeI,varI,qI].forEach(el => el.addEventListener('input', render));
  render();
})();

/* ============================================================
   06 — Productivity table (TP/AP/MP) with chart
   ============================================================ */
(function(){
  const input = document.getElementById('prodInput');
  const tableContainer = document.getElementById('prodTable');
  const chartContainer = document.getElementById('productivityChart');
  if (!input) return;

  function render(){
    const tp = parseNums(input.value);
    const n = tp.length;
    const ap = tp.map((v,i) => i===0 ? null : v/i);
    const mp = tp.map((v,i) => i===0 ? null : v - tp[i-1]);

    // table
    let html = '<table class="exhibit" style="margin:0; min-width:420px;"><tr><th>L</th>';
    tp.forEach((_,i) => html += `<th>${i}</th>`);
    html += '</tr><tr><td>TP</td>';
    tp.forEach(v => html += `<td class="num">${v}</td>`);
    html += '</tr><tr><td>AP</td>';
    ap.forEach(v => html += `<td class="num">${v===null?'—':fmt(v,1)}</td>`);
    html += '</tr><tr><td>MP</td>';
    mp.forEach(v => html += `<td class="num" style="${v!==null && v<0 ? 'color:var(--red); font-weight:700;':''}">${v===null?'—':fmt(v,1)}</td>`);
    html += '</tr></table>';
    tableContainer.innerHTML = html;

    // chart: AP and MP lines
    if (!chartContainer) return;
    const W=480, H=220, padL=40, padR=20, padT=16, padB=30;
    const validAP = ap.filter(v=>v!==null), validMP = mp.filter(v=>v!==null);
    const allVals = validAP.concat(validMP);
    const minV = Math.min(0, ...allVals), maxV = Math.max(...allVals);
    const xScale = i => padL + (i/(n-1))*(W-padL-padR);
    const yScale = v => (H-padB) - ((v-minV)/(maxV-minV))*(H-padT-padB);
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:520px;'});
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:yScale(0), y2:yScale(0), stroke:'#E3DCC9'}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1}));
    function drawLine(arr, color){
      let d = '';
      arr.forEach((v,i) => {
        if (v === null) return;
        const x=xScale(i), y=yScale(v);
        d += (d===''?'M':'L')+x+','+y+' ';
      });
      svg.appendChild(svgEl('path', {d, fill:'none', stroke:color, 'stroke-width':2.2}));
      arr.forEach((v,i) => {
        if (v === null) return;
        svg.appendChild(svgEl('circle', {cx:xScale(i), cy:yScale(v), r:3, fill:color}));
      });
    }
    drawLine(ap, '#2B2560');
    drawLine(mp, '#C77F1E');
    for (let i=0;i<n;i++){
      const t = svgEl('text', {x:xScale(i), y:H-10, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':8, fill:'#4A4763'});
      t.textContent = i;
      svg.appendChild(t);
    }
    chartContainer.innerHTML = '';
    chartContainer.appendChild(svg);
    const legend = document.createElement('div');
    legend.style.display='flex'; legend.style.gap='16px'; legend.style.marginTop='6px'; legend.style.fontFamily='var(--font-mono)'; legend.style.fontSize='.72rem';
    legend.innerHTML = `<span><span style="display:inline-block;width:12px;height:2px;background:#2B2560;margin-right:5px;vertical-align:middle;"></span>Average Product</span><span><span style="display:inline-block;width:12px;height:2px;background:#C77F1E;margin-right:5px;vertical-align:middle;"></span>Marginal Product</span>`;
    chartContainer.appendChild(legend);
  }
  input.addEventListener('input', render);
  render();
})();

/* ============================================================
   08 — Cost curve builder
   ============================================================ */
(function(){
  const tfcI = document.getElementById('ccTFC'), tvcI = document.getElementById('ccTVC'), priceI = document.getElementById('ccPrice');
  const out = document.getElementById('ccOut');
  const chartContainer = document.getElementById('costCurveChart');
  if (!tfcI) return;

  function render(){
    const tfc = parseFloat(tfcI.value);
    const tvcArr = parseNums(tvcI.value);
    const price = parseFloat(priceI.value);
    const n = tvcArr.length;
    const rows = tvcArr.map((tvc,i) => {
      const q = i+1;
      const tc = tfc + tvc;
      const afc = tfc/q, avc = tvc/q, atc = tc/q;
      const prevTC = i===0 ? tfc : tfc + tvcArr[i-1];
      const mc = tc - prevTC;
      return {q, tfc, tvc, tc, afc, avc, atc, mc};
    });

    // find breakeven/shutdown zone relative to price
    let status = 'FAIL TO REJECT'; // placeholder, will overwrite below
    const minATC = Math.min(...rows.map(r=>r.atc));
    const minAVC = Math.min(...rows.map(r=>r.avc));
    let verdict, verdictClass;
    if (price >= minATC){ verdict = 'Price covers ATC — operating profitably (at best output level)'; verdictClass='inelastic'; }
    else if (price >= minAVC){ verdict = 'Price is between AVC and ATC — losing money, but rational to keep operating short-run'; verdictClass='unit'; }
    else { verdict = 'Price is below AVC — shutdown point breached, firm should stop producing'; verdictClass='elastic'; }

    let tableHtml = '<table class="exhibit" style="margin:0; min-width:560px; font-size:.82rem;"><tr><th>Q</th><th>TFC</th><th>TVC</th><th>TC</th><th>AFC</th><th>AVC</th><th>ATC</th><th>MC</th></tr>';
    rows.forEach(r => {
      tableHtml += `<tr><td>${r.q}</td><td class="num">${fmt(r.tfc,0)}</td><td class="num">${fmt(r.tvc,0)}</td><td class="num">${fmt(r.tc,0)}</td><td class="num">${fmt(r.afc,1)}</td><td class="num">${fmt(r.avc,1)}</td><td class="num">${fmt(r.atc,1)}</td><td class="num">${fmt(r.mc,1)}</td></tr>`;
    });
    tableHtml += '</table>';
    out.innerHTML = `
      <div class="elastic-zone-tag ${verdictClass}" style="display:block; margin-bottom:10px; padding:10px; text-align:center; font-size:.8rem;">${verdict}</div>
      <div style="overflow-x:auto;">${tableHtml}</div>
    `;

    // chart: AFC, AVC, ATC, MC
    if (!chartContainer) return;
    const W=480, H=240, padL=44, padR=16, padT=16, padB=30;
    const allVals = rows.flatMap(r => [r.afc, r.avc, r.atc, r.mc]);
    const maxV = Math.max(...allVals);
    const xScale = q => padL + ((q-1)/(n-1))*(W-padL-padR);
    const yScale = v => (H-padB) - (v/maxV)*(H-padT-padB);
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, width:'100%', class:'econ-svg', style:'max-width:520px;'});
    svg.appendChild(svgEl('line', {x1:padL, x2:W-padR, y1:H-padB, y2:H-padB, stroke:'#4A4763', 'stroke-width':1}));
    svg.appendChild(svgEl('line', {x1:padL, x2:padL, y1:padT, y2:H-padB, stroke:'#4A4763', 'stroke-width':1}));
    function drawLine(key, color){
      let d = '';
      rows.forEach((r,i) => {
        const x=xScale(r.q), y=yScale(r[key]);
        d += (i===0?'M':'L')+x+','+y+' ';
      });
      svg.appendChild(svgEl('path', {d, fill:'none', stroke:color, 'stroke-width':2}));
    }
    drawLine('afc', '#8B5CF6');
    drawLine('avc', '#2F8F6B');
    drawLine('atc', '#2B2560');
    drawLine('mc', '#C77F1E');
    rows.forEach(r => {
      const t = svgEl('text', {x:xScale(r.q), y:H-10, 'text-anchor':'middle', 'font-family':'IBM Plex Mono', 'font-size':7, fill:'#4A4763'});
      t.textContent = r.q;
      svg.appendChild(t);
    });
    chartContainer.innerHTML = '';
    chartContainer.appendChild(svg);
    const legend = document.createElement('div');
    legend.style.display='flex'; legend.style.gap='12px'; legend.style.marginTop='6px'; legend.style.fontFamily='var(--font-mono)'; legend.style.fontSize='.68rem'; legend.style.flexWrap='wrap';
    legend.innerHTML = `
      <span><span style="display:inline-block;width:12px;height:2px;background:#8B5CF6;margin-right:4px;vertical-align:middle;"></span>AFC</span>
      <span><span style="display:inline-block;width:12px;height:2px;background:#2F8F6B;margin-right:4px;vertical-align:middle;"></span>AVC</span>
      <span><span style="display:inline-block;width:12px;height:2px;background:#2B2560;margin-right:4px;vertical-align:middle;"></span>ATC</span>
      <span><span style="display:inline-block;width:12px;height:2px;background:#C77F1E;margin-right:4px;vertical-align:middle;"></span>MC</span>
    `;
    chartContainer.appendChild(legend);
  }
  [tfcI,tvcI,priceI].forEach(el => el.addEventListener('input', render));
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
const sectionIds = ['sec-demandfunction','sec-elasticity','sec-determinants','sec-incomecross','sec-effects','sec-productivity','sec-marginalrevenue','sec-costcurves','sec-quiz'];
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
  try { localStorage.setItem('cfa-progress-demand-supply', String(pct)); } catch(e) {}
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
    concept: "The Demand Function & Curve",
    q: "In a demand function Qx = 100 − 4Px + 0.3I, what does the negative sign on Px reflect?",
    opts: ["Higher income reduces demand", "The law of demand — higher price lowers quantity demanded", "A pricing error in the model"],
    correct: 1,
    exp: "A negative coefficient on a good's own price is exactly the law of demand: as price rises, quantity demanded falls."
  },
  {
    concept: "The Demand Function & Curve",
    q: "The inverse demand function is best described as:",
    opts: ["Quantity written as a function of price", "Price written as a function of quantity", "Income written as a function of price"],
    correct: 1,
    exp: "The inverse demand function solves the demand equation for price in terms of quantity — it's what actually gets plotted as the demand curve, with price on the vertical axis."
  },
  {
    concept: "Price Elasticity of Demand",
    q: "A demand curve has quantity Q=40 at price P=2, with slope ΔQ/ΔP = −5. What is the price elasticity of demand at this point?",
    opts: ["−0.25", "−2.50", "−10.0"],
    correct: 0,
    exp: "E = slope × (P/Q) = −5 × (2/40) = −0.25."
  },
  {
    concept: "Price Elasticity of Demand",
    q: "If the own-price elasticity of demand for a good is −0.4, demand is:",
    opts: ["Elastic", "Inelastic", "Unit elastic"],
    correct: 1,
    exp: "|−0.4| < 1, so demand is inelastic — quantity is relatively insensitive to price."
  },
  {
    concept: "Price Elasticity of Demand",
    q: "If demand is elastic and price rises, what happens to total expenditure on the good?",
    opts: ["It rises", "It falls", "It stays exactly the same"],
    correct: 1,
    exp: "When demand is elastic, quantity falls proportionally more than price rises, so total expenditure (P×Q) falls."
  },
  {
    concept: "Price Elasticity of Demand",
    q: "A perfectly vertical demand curve is described as:",
    opts: ["Perfectly elastic", "Perfectly inelastic", "Unit elastic"],
    correct: 1,
    exp: "A vertical demand curve means quantity demanded never changes regardless of price — zero elasticity, or perfectly inelastic."
  },
  {
    concept: "What Drives Elasticity?",
    q: "Which characteristic tends to make a good's demand MORE elastic?",
    opts: ["Few or no close substitutes", "A small share of the household budget", "Many close substitutes available"],
    correct: 2,
    exp: "The more easily buyers can switch to a substitute, the more sensitive (elastic) their demand is to a price change."
  },
  {
    concept: "What Drives Elasticity?",
    q: "Long-run elasticity of demand is typically ______ short-run elasticity, for most non-durable goods.",
    opts: ["Greater than", "Less than", "Exactly equal to"],
    correct: 0,
    exp: "Given more time to adjust habits and substitute alternatives, demand for most goods becomes more elastic in the long run than the short run."
  },
  {
    concept: "Income & Cross-Price Elasticity",
    q: "A good has an income elasticity of demand equal to −0.3. This good is:",
    opts: ["A normal good", "An inferior good", "A perfect substitute"],
    correct: 1,
    exp: "Negative income elasticity means quantity demanded falls as income rises — the definition of an inferior good."
  },
  {
    concept: "Income & Cross-Price Elasticity",
    q: "The cross-price elasticity of demand between butter and margarine is calculated to be +0.7. This indicates the two goods are:",
    opts: ["Complements", "Substitutes", "Unrelated goods"],
    correct: 1,
    exp: "A positive cross-price elasticity means a price rise in one good increases demand for the other — the definition of substitutes."
  },
  {
    concept: "Substitution & Income Effects",
    q: "For a normal good, when its price falls, the substitution effect and income effect:",
    opts: ["Work in opposite directions, partially canceling out", "Both push toward buying more of the good", "Both push toward buying less of the good"],
    correct: 1,
    exp: "For a normal good, both effects reinforce each other — the good is relatively cheaper (substitution) and higher real income also raises demand for it (income effect)."
  },
  {
    concept: "Substitution & Income Effects",
    q: "\"Inferior good\" is a label that describes:",
    opts: ["A poor-quality or defective product", "A good people buy less of as their income rises", "A good with no substitutes"],
    correct: 1,
    exp: "Inferior is a technical economic term about the direction of income elasticity, not a statement about product quality."
  },
  {
    concept: "Marginal Returns & Productivity",
    q: "A firm's total product rises from 300 to 360 units when labor increases from 3 to 4 hours. What is the marginal product of the 4th labor hour?",
    opts: ["360 units", "60 units", "90 units"],
    correct: 1,
    exp: "MP = ΔTP/ΔL = (360−300)/(4−3) = 60 units."
  },
  {
    concept: "Marginal Returns & Productivity",
    q: "Once marginal product of labor turns negative, what does this indicate?",
    opts: ["The firm should hire more workers immediately", "Adding another worker actually reduces total output", "Average product must also be negative"],
    correct: 1,
    exp: "Negative marginal product means the additional worker is actively decreasing total production — a clear signal to stop adding labor."
  },
  {
    concept: "Marginal Revenue & Profit Max",
    q: "A firm in perfect competition sells at the market price of $12 per unit with no ability to influence that price. What is this firm's marginal revenue?",
    opts: ["Less than $12", "Exactly $12", "Greater than $12"],
    correct: 1,
    exp: "Under perfect competition, a price-taking firm's marginal revenue always equals the market price: MR = P."
  },
  {
    concept: "Marginal Revenue & Profit Max",
    q: "A firm operating under imperfect competition must lower its price on all units sold to sell one more unit. Its marginal revenue is:",
    opts: ["Equal to price", "Less than price", "Greater than price"],
    correct: 1,
    exp: "MR = P + Q(ΔP/ΔQ); since the demand curve is downward sloping, this makes MR strictly less than price."
  },
  {
    concept: "Marginal Revenue & Profit Max",
    q: "A firm should increase output whenever:",
    opts: ["MR is less than MC", "MR is greater than MC", "MR equals average total cost"],
    correct: 1,
    exp: "As long as marginal revenue exceeds marginal cost, producing one more unit adds more to revenue than to cost — increasing profit."
  },
  {
    concept: "Cost Curves & Breakeven",
    q: "At Q=6, TFC=100 and TVC=450. What is average total cost (ATC) at this output level?",
    opts: ["$91.7", "$75.0", "$16.7"],
    correct: 0,
    exp: "TC = 100+450 = 550. ATC = TC/Q = 550/6 ≈ $91.7."
  },
  {
    concept: "Cost Curves & Breakeven",
    q: "The breakeven point for a firm occurs where:",
    opts: ["Price equals average variable cost (AVC)", "Price equals average total cost (ATC)", "Marginal cost equals average fixed cost (AFC)"],
    correct: 1,
    exp: "Breakeven is where total revenue equals total cost — equivalently, where price equals average total cost."
  },
  {
    concept: "Cost Curves & Breakeven",
    q: "Market price has fallen below a firm's average variable cost. What is the economically rational response?",
    opts: ["Continue operating, since fixed costs must be paid regardless", "Shut down production, since losses are smaller than continuing to operate", "Raise the price to cover costs"],
    correct: 1,
    exp: "Below AVC, every additional unit produced adds to the loss even before considering fixed costs — shutting down limits the loss to fixed costs alone, which is smaller."
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
          cfaRecordAnswer(item.concept, "Demand & Supply Analysis", i === item.correct);
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
