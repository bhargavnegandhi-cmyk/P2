// ============================================================
// Readiness Dashboard — reads persisted diagnostics and renders
// per-module readiness verdicts + weakest/strongest concept lists
// ============================================================

// The full universe of modules and concepts (mirrors the Final Review's question bank).
// Used to compute coverage — i.e., how many of a module's concepts have been tested at all.
const CFA_MODULE_CONCEPTS = {
  "Economics Foundations": ["Scarcity & Opportunity Cost","Factors of Production & Economic Systems","The Production Possibilities Frontier","Microeconomics vs. Macroeconomics","Positive vs. Normative Economics","Reading a Graph — Movements vs. Shifts","The Circular Flow of Income"],
  "Demand & Supply Analysis": ["The Demand Function & Curve","Price Elasticity of Demand","What Drives Elasticity?","Income & Cross-Price Elasticity","Substitution & Income Effects","Marginal Returns & Productivity","Marginal Revenue & Profit Max","Cost Curves & Breakeven"],
  "Firm & Market Organization": ["Four Market Structures","Elasticity & Revenue","Consumer Surplus","Optimal Price & Output (Perfect Competition)","Cost Curves & Long-Run Equilibrium","Sources of Market Power","Optimal Price & Output (Monopoly)","Price Discrimination"],
  "GDP, Income & Expenditure": ["What Is GDP?","The Value-Added Method","Nominal vs. Real GDP","The Components of GDP","Saving, Investment & the Trade Balance"],
  "AD, AS & Economic Growth": ["The Aggregate Demand Curve","The Aggregate Supply Curve","Shifts in AD & AS","Four Macroeconomic Equilibria","The Production Function & Growth Accounting","Measures of Sustainable Growth"],
  "Business Cycles": ["Consumer Behavior","Housing & Business Investment","External Trade","Types & Measures","Why It Lags the Cycle","Inflation, Deflation & Hyperinflation","Measuring Inflation","Cost-Push vs. Demand-Pull","Leading, Coincident & Lagging Indicators","Theories of the Business Cycle"],
  "Monetary & Fiscal Policy": ["Monetary vs. Fiscal Policy","Functions & Definitions of Money","The Money Creation Process","The Quantity Theory of Money","The Demand for Money","Money Market Equilibrium","The Fisher Effect","The Costs of Inflation"],
  "International Trade & Capital Flows": ["GDP vs. GNP & Basic Terms","Patterns & Trends in Trade","Absolute vs. Comparative Advantage","The Gains from Trade","The Ricardian Model","The Heckscher–Ohlin Model","BOP Components","The National Income Identity"],
  "Currency Exchange Rates": ["Size & Importance","Nominal & Real Exchange Rates","Spot, Forward & FX Swaps","Hedging a Foreign Investment","% Change in Currency Value","The Elasticities Approach"],
};

function pctColor(pct){
  if (pct >= 80) return '#2F8F6B';
  if (pct >= 50) return '#E8A33D';
  return '#D6573F';
}

function verdictFor(coverage, accuracy){
  if (coverage === 0) return {label:'Not Yet Assessed', cls:'unassessed'};
  if (coverage < 1) {
    // partially tested — base verdict on accuracy so far, but flag incompleteness in label
    if (accuracy >= 80) return {label:'Partially Assessed — Strong So Far', cls:'review'};
    if (accuracy >= 50) return {label:'Partially Assessed', cls:'review'};
    return {label:'Partially Assessed — Weak So Far', cls:'notready'};
  }
  if (accuracy >= 80) return {label:'Ready', cls:'ready'};
  if (accuracy >= 50) return {label:'Needs Review', cls:'review'};
  return {label:'Not Ready', cls:'notready'};
}

function render(){
  const diagnostics = cfaLoadDiagnostics();
  const container = document.getElementById('dashboardContent');
  const conceptNames = Object.keys(diagnostics);

  if (conceptNames.length === 0){
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:2rem;">📊</div>
        <p><strong>No data yet.</strong> This dashboard builds itself from your answers anywhere in this toolkit — any module's quiz, the Final Review, or the flashcards. Try a few cards or questions anywhere (even partially) and your readiness breakdown will appear here, concept by concept.</p>
        <a href="../final-review/index.html" class="start-btn">Take the Final Review →</a>
      </div>`;
    return;
  }

  // Overall summary
  let totalAttempts = 0, totalCorrect = 0;
  conceptNames.forEach(c => { totalAttempts += diagnostics[c].attempts; totalCorrect += diagnostics[c].correct; });
  const overallPct = totalAttempts > 0 ? Math.round((totalCorrect/totalAttempts)*100) : 0;
  const totalConcepts = Object.values(CFA_MODULE_CONCEPTS).reduce((a,arr)=>a+arr.length,0);
  const testedConcepts = conceptNames.length;

  // Build per-concept accuracy list (only concepts with at least 1 attempt)
  const conceptStats = conceptNames.map(name => {
    const d = diagnostics[name];
    const pct = d.attempts > 0 ? Math.round((d.correct/d.attempts)*100) : 0;
    return { name, cat: d.cat, pct, attempts: d.attempts };
  });
  const weakest = [...conceptStats].sort((a,b) => a.pct - b.pct).slice(0, 6);
  const strongest = [...conceptStats].sort((a,b) => b.pct - a.pct).filter(c => c.pct >= 80).slice(0, 6);

  let html = '';

  // Summary row
  html += `<div class="summary-row">
    <div class="summary-card"><div class="k">Overall accuracy</div><div class="v">${overallPct}%</div></div>
    <div class="summary-card"><div class="k">Concepts tested</div><div class="v">${testedConcepts}/${totalConcepts}</div></div>
    <div class="summary-card"><div class="k">Total answers logged</div><div class="v">${totalAttempts}</div></div>
  </div>`;

  // Focus here (weakest)
  if (weakest.length > 0){
    html += `<div class="focus-section"><h2>Focus here — your weakest concepts</h2>`;
    weakest.forEach(c => {
      html += `<span class="concept-pill"><span class="dot" style="background:${pctColor(c.pct)};"></span>${c.name} <span class="pct">${c.pct}%</span></span>`;
    });
    html += `</div>`;
  }

  // Strongest
  if (strongest.length > 0){
    html += `<div class="focus-section"><h2>Confirmed strong</h2>`;
    strongest.forEach(c => {
      html += `<span class="concept-pill"><span class="dot" style="background:${pctColor(c.pct)};"></span>${c.name} <span class="pct">${c.pct}%</span></span>`;
    });
    html += `</div>`;
  }

  // Per-module breakdown
  html += `<div class="focus-section"><h2>Readiness by module</h2>`;
  Object.entries(CFA_MODULE_CONCEPTS).forEach(([cat, allConcepts]) => {
    const testedInCat = allConcepts.filter(c => diagnostics[c]);
    const coverage = testedInCat.length / allConcepts.length;
    let catCorrect = 0, catAttempts = 0;
    testedInCat.forEach(c => { catCorrect += diagnostics[c].correct; catAttempts += diagnostics[c].attempts; });
    const catPct = catAttempts > 0 ? Math.round((catCorrect/catAttempts)*100) : 0;
    const verdict = verdictFor(coverage, catPct);

    html += `<div class="module-card">
      <div class="module-card-head">
        <h3>${cat}</h3>
        <span class="verdict ${verdict.cls}">${verdict.label}</span>
      </div>`;

    allConcepts.forEach(concept => {
      const d = diagnostics[concept];
      if (d){
        const pct = d.attempts > 0 ? Math.round((d.correct/d.attempts)*100) : 0;
        html += `<div class="concept-row">
          <div class="name">${concept}</div>
          <div class="track"><div class="fill" style="width:${pct}%; background:${pctColor(pct)};"></div></div>
          <div class="stat">${d.correct}/${d.attempts} (${pct}%)</div>
        </div>`;
      } else {
        html += `<div class="concept-row">
          <div class="name" style="color:var(--ink-soft);">${concept}</div>
          <div class="track"><div class="fill" style="width:0%;"></div></div>
          <div class="stat" style="color:var(--ink-soft);">not tested</div>
        </div>`;
      }
    });
    html += `</div>`;
  });
  html += `</div>`;

  container.innerHTML = html;
}

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('This clears all recorded quiz performance data from this browser. Continue?')){
    cfaResetDiagnostics();
    render();
  }
});

render();
