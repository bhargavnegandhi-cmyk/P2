// ============================================================
// Economics Concept & Formula Sheet — data-driven, rendered with KaTeX
// ============================================================

const MODULES = [
  {
    num: "00",
    title: "Economics Foundations",
    formulas: [
      { name: "Opportunity cost", tex: ["\\text{Value of the best alternative given up}"] },
      { name: "The four factors of production", tex: ["\\text{Land, Labor, Capital, Entrepreneurship}"] },
      { name: "Positive vs. normative", tex: ["\\text{Positive: testable fact} \\quad \\text{Normative: value judgment}"] },
      { name: "Reading a graph", tex: ["\\text{On-axis variable} \\to \\text{movement along curve}", "\\text{Off-axis variable} \\to \\text{shift of curve}"] },
    ]
  },
  {
    num: "E1",
    title: "Demand and Supply Analysis",
    formulas: [
      { name: "Own-price elasticity of demand", tex: ["E_P = \\dfrac{\\%\\Delta Q_x}{\\%\\Delta P_x} = \\dfrac{\\Delta Q_x}{\\Delta P_x}\\cdot\\dfrac{P_x}{Q_x}"] },
      { name: "Income &amp; cross-price elasticity", tex: ["E_I = \\dfrac{\\Delta Q_x}{\\Delta I}\\cdot\\dfrac{I}{Q_x}, \\quad E_{P_y} = \\dfrac{\\Delta Q_x}{\\Delta P_y}\\cdot\\dfrac{P_y}{Q_x}"], note: "Income: + normal, − inferior. Cross-price: + substitutes, − complements" },
      { name: "Elasticity &amp; total revenue", tex: ["|E|>1 \\text{ elastic}, \\; |E|<1 \\text{ inelastic}, \\; |E|=1 \\text{ unit elastic}"] },
      { name: "Marginal &amp; average product", tex: ["MP = \\dfrac{\\Delta TP}{\\Delta L}, \\quad AP = \\dfrac{TP}{L}"] },
      { name: "Profit maximization", tex: ["\\text{Produce where } MR = MC \\text{ (MC not falling)}"] },
      { name: "Cost curves", tex: ["TC = TFC+TVC", "AFC=\\dfrac{TFC}{Q}, \\; AVC=\\dfrac{TVC}{Q}, \\; ATC=\\dfrac{TC}{Q}", "MC = \\dfrac{\\Delta TC}{\\Delta Q}"] },
      { name: "Breakeven &amp; shutdown", tex: ["\\text{Breakeven: } P=ATC \\quad \\text{Shutdown: } P=AVC"] },
    ]
  },
  {
    num: "E2",
    title: "The Firm and Market Organization",
    formulas: [
      { name: "MR from elasticity", tex: ["MR = P\\left[1-\\dfrac{1}{E}\\right]"] },
      { name: "Consumer surplus", tex: ["CS = \\tfrac{1}{2} \\times Q \\times (\\text{price intercept} - P)"] },
      { name: "Market equilibrium", tex: ["\\text{Demand} = \\text{Supply} \\Rightarrow \\text{solve for } P^*, Q^*"] },
      { name: "Perfect competition", tex: ["P = AR = MR"] },
      { name: "Long-run equilibrium (perfect comp.)", tex: ["P = MC = \\text{min } AC"] },
      { name: "Monopolist demand &amp; MR", tex: ["P = \\tfrac{a}{b}-\\tfrac{1}{b}Q, \\quad MR = \\tfrac{a}{b}-\\tfrac{2}{b}Q"], note: "MR falls twice as steeply as demand" },
      { name: "Two-part tariff (extract all CS)", tex: ["\\text{Fee} = CS \\text{ at } P=MC"] },
    ]
  },
  {
    num: "E3",
    title: "GDP, Income &amp; Expenditure",
    formulas: [
      { name: "Nominal &amp; real GDP", tex: ["\\text{Nominal GDP} = P_t \\times Q_t", "\\text{Real GDP} = P_{base} \\times Q_t"] },
      { name: "GDP deflator", tex: ["\\text{GDP deflator} = \\dfrac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100"] },
      { name: "Expenditure approach", tex: ["GDP = C+I+G+(X-M)"] },
      { name: "MPC &amp; MPS", tex: ["MPC+MPS=1"] },
      { name: "The fundamental macro identity", tex: ["S = I+(G-T)+(X-M)"] },
    ]
  },
  {
    num: "E3",
    title: "AD, AS &amp; Economic Growth",
    formulas: [
      { name: "AD slopes down via", tex: ["\\text{Wealth, interest rate, real exchange rate effects}"] },
      { name: "AS curves by horizon", tex: ["VSRAS: \\text{flat} \\quad SRAS: \\text{upward} \\quad LRAS: \\text{vertical}"] },
      { name: "Production function", tex: ["Y = A \\times F(L,K)"] },
      { name: "Growth accounting", tex: ["\\Delta\\%Y_{potential} = \\Delta\\%TFP + W_L(\\Delta\\%L) + W_K(\\Delta\\%K)"] },
      { name: "Labor productivity", tex: ["\\text{Labor productivity} = \\dfrac{\\text{Real GDP}}{\\text{Aggregate hours}}"] },
    ]
  },
  {
    num: "E4",
    title: "Introduction to Business Cycles",
    formulas: [
      { name: "Unemployment &amp; participation rate", tex: ["\\text{Unemployment rate} = \\dfrac{\\text{Unemployed}}{\\text{Labor force}}", "\\text{Participation rate} = \\dfrac{\\text{Labor force}}{\\text{Working-age population}}"] },
      { name: "Price index &amp; inflation", tex: ["\\text{Index} = \\dfrac{\\text{Current basket value}}{\\text{Base basket value}}\\times 100"] },
      { name: "Unit labor cost", tex: ["ULC = \\dfrac{W}{O}"], note: "W = compensation, O = output per hour" },
      { name: "Indicator timing", tex: ["\\text{Leading} \\to \\text{Coincident} \\to \\text{Lagging}"] },
    ]
  },
  {
    num: "E5",
    title: "Monetary and Fiscal Policy",
    formulas: [
      { name: "Money multiplier", tex: ["\\text{Multiplier} = \\dfrac{1}{\\text{Reserve requirement}}"] },
      { name: "Total money created", tex: ["\\text{Total money} = \\dfrac{\\text{New deposit}}{\\text{Reserve requirement}}"] },
      { name: "Quantity equation of exchange", tex: ["M \\times V = P \\times Y"] },
      { name: "The Fisher effect", tex: ["R_{nom} = R_{real} + \\pi^e"] },
    ]
  },
  {
    num: "E6",
    title: "International Trade and Capital Flows",
    formulas: [
      { name: "Absolute advantage", tex: ["\\text{More output per worker, in absolute terms}"] },
      { name: "Comparative advantage", tex: ["\\text{Lower opportunity cost} = \\dfrac{\\text{Good given up}}{\\text{Good gained}}"] },
      { name: "Gains from trade range", tex: ["\\text{Autarkic price}_A < \\text{World price} < \\text{Autarkic price}_B"] },
      { name: "National income identity (open economy)", tex: ["Y = C+I+G+(X-M)"] },
      { name: "Current account", tex: ["CA = X-M = Y-(C+I+G)"] },
    ]
  },
  {
    num: "E7",
    title: "Currency Exchange Rates",
    formulas: [
      { name: "Real exchange rate", tex: ["R_{d/f} = \\text{Nominal rate} \\times \\text{Price level ratio}"] },
      { name: "Percentage change in a currency", tex: ["\\%\\Delta = \\dfrac{\\text{New rate}-\\text{Old rate}}{\\text{Old rate}}"] },
      { name: "Hedged return (spot + rate + forward)", tex: ["\\left(\\dfrac{1}{\\text{Spot}}\\right)(1+r_f)(\\text{Forward}) - 1"] },
      { name: "Marshall-Lerner condition", tex: ["\\omega_X \\varepsilon_X + \\omega_M(\\varepsilon_M-1) > 0"], note: "ω = trade shares, ε = demand elasticities" },
    ]
  },
];

/* ============================================================
   Render engine
   ============================================================ */
(function(){
  const sheet = document.getElementById('sheet');
  MODULES.forEach(mod => {
    const block = document.createElement('div');
    block.className = 'module-block';

    const h2 = document.createElement('h2');
    h2.innerHTML = `<span class="module-num">${mod.num}</span>${mod.title}`;
    block.appendChild(h2);

    mod.formulas.forEach(f => {
      const item = document.createElement('div');
      item.className = 'formula-item';

      const name = document.createElement('div');
      name.className = 'formula-name';
      name.innerHTML = f.name;
      item.appendChild(name);

      const expr = document.createElement('div');
      expr.className = 'formula-expr';
      f.tex.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'katex-line';
        try {
          katex.render(line, lineDiv, { throwOnError: false, displayMode: false });
        } catch(e) {
          lineDiv.textContent = line;
        }
        expr.appendChild(lineDiv);
      });
      item.appendChild(expr);

      if (f.note){
        const note = document.createElement('div');
        note.className = 'formula-note';
        note.innerHTML = f.note;
        item.appendChild(note);
      }

      block.appendChild(item);
    });

    sheet.appendChild(block);
  });
})();
