// ============================================================
// Flashcards — 132 cards, 2 per concept, across all 9 modules
// Self-assessment feeds the shared diagnostics system
// ============================================================

const FLASHCARDS = [
  // ===== Economics Foundations =====
  { cat:"Economics Foundations", concept:"Scarcity & Opportunity Cost",
    front:"What is opportunity cost?", back:"The value of the next-best alternative given up when you make a choice — not just cash spent, but everything forgone." },
  { cat:"Economics Foundations", concept:"Scarcity & Opportunity Cost",
    front:"Why does scarcity exist even for a billionaire?", back:"Scarcity is about resources being limited relative to unlimited wants — unlimited money still can't buy unlimited time or attention." },

  { cat:"Economics Foundations", concept:"Factors of Production & Economic Systems",
    front:"Name the four factors of production.", back:"Land, Labor, Capital, and Entrepreneurship." },
  { cat:"Economics Foundations", concept:"Factors of Production & Economic Systems",
    front:"What's the difference between a market economy and a command economy?", back:"A market economy lets prices (set by supply and demand) drive decisions with private ownership; a command economy has a central authority plan and direct production." },

  { cat:"Economics Foundations", concept:"The Production Possibilities Frontier",
    front:"What does a point INSIDE the PPF represent?", back:"Inefficiency — resources are unemployed or misallocated. More of both goods could be produced without any new resources." },
  { cat:"Economics Foundations", concept:"The Production Possibilities Frontier",
    front:"What causes the PPF to shift outward?", back:"Genuine economic growth — more resources (capital, labor) or better technology." },

  { cat:"Economics Foundations", concept:"Microeconomics vs. Macroeconomics",
    front:"Microeconomics vs. macroeconomics — what's the scale difference?", back:"Microeconomics studies individual decision-makers (a household, a firm, a market). Macroeconomics studies the whole economy (aggregate output, inflation, employment)." },
  { cat:"Economics Foundations", concept:"Microeconomics vs. Macroeconomics",
    front:"Which CFA prerequisite modules are microeconomics, and which are macroeconomics?", back:"E1 (Demand & Supply) and E2 (Firm & Market) are microeconomics. E3 through E7 (GDP through Currency) are macroeconomics." },

  { cat:"Economics Foundations", concept:"Positive vs. Normative Economics",
    front:"What's the difference between a positive and a normative economic statement?", back:"Positive: a testable, factual claim about cause and effect. Normative: a value judgment about what should happen." },
  { cat:"Economics Foundations", concept:"Positive vs. Normative Economics",
    front:"Quick test: how do you spot a normative statement?", back:"It usually contains or implies the word \"should.\"" },

  { cat:"Economics Foundations", concept:"Reading a Graph — Movements vs. Shifts",
    front:"What causes a MOVEMENT along a demand curve?", back:"A change in the variable that's actually on one of the curve's own axes — for demand, that's price." },
  { cat:"Economics Foundations", concept:"Reading a Graph — Movements vs. Shifts",
    front:"What causes a SHIFT of an entire demand curve?", back:"A change in anything NOT on either axis — income, tastes, related goods' prices, expectations." },

  { cat:"Economics Foundations", concept:"The Circular Flow of Income",
    front:"Name the four sectors in the full circular flow model.", back:"Households, Firms, Government, and the Foreign Sector." },
  { cat:"Economics Foundations", concept:"The Circular Flow of Income",
    front:"How does GDP = C+I+G+(X−M) relate to the circular flow diagram?", back:"Each term is one of the flows in the diagram — it's the same picture, written as an equation." },

  // ===== Demand & Supply Analysis =====
  { cat:"Demand & Supply Analysis", concept:"The Demand Function & Curve",
    front:"What is the inverse demand function?", back:"Price written as a function of quantity — it's what actually gets plotted as the demand curve, with price on the vertical axis." },
  { cat:"Demand & Supply Analysis", concept:"The Demand Function & Curve",
    front:"In a demand function, what does a negative coefficient on the good's own price reflect?", back:"The law of demand — as price rises, quantity demanded falls." },

  { cat:"Demand & Supply Analysis", concept:"Price Elasticity of Demand",
    front:"Give the formula for price elasticity of demand.", back:"E = (ΔQ/ΔP) × (P/Q) — the percentage change in quantity demanded divided by the percentage change in price." },
  { cat:"Demand & Supply Analysis", concept:"Price Elasticity of Demand",
    front:"If demand is elastic and price falls, what happens to total expenditure?", back:"It rises — quantity rises proportionally more than price falls." },

  { cat:"Demand & Supply Analysis", concept:"What Drives Elasticity?",
    front:"Name two factors that make demand MORE elastic.", back:"Many close substitutes, and more time for buyers to adjust (long run vs. short run)." },
  { cat:"Demand & Supply Analysis", concept:"What Drives Elasticity?",
    front:"Does demand tend to be more elastic in the short run or the long run?", back:"The long run — more time lets buyers find substitutes and adjust habits." },

  { cat:"Demand & Supply Analysis", concept:"Income & Cross-Price Elasticity",
    front:"A negative income elasticity means the good is what kind of good?", back:"An inferior good — quantity demanded falls as income rises." },
  { cat:"Demand & Supply Analysis", concept:"Income & Cross-Price Elasticity",
    front:"A positive cross-price elasticity means two goods are what?", back:"Substitutes — a price rise in one increases demand for the other." },

  { cat:"Demand & Supply Analysis", concept:"Substitution & Income Effects",
    front:"For a NORMAL good, do the substitution and income effects reinforce or fight each other when price falls?", back:"Reinforce — cheaper relative price and higher real income both raise demand." },
  { cat:"Demand & Supply Analysis", concept:"Substitution & Income Effects",
    front:"Does \"inferior good\" mean the product is low quality?", back:"No — it's a technical term about income elasticity direction, not product quality." },

  { cat:"Demand & Supply Analysis", concept:"Marginal Returns & Productivity",
    front:"How do you calculate marginal product?", back:"MP = ΔTP/ΔL — the change in total product divided by the change in labor." },
  { cat:"Demand & Supply Analysis", concept:"Marginal Returns & Productivity",
    front:"What does it mean when marginal product turns negative?", back:"Adding another worker actually reduces total output — a clear signal to stop hiring." },

  { cat:"Demand & Supply Analysis", concept:"Marginal Revenue & Profit Max",
    front:"Under perfect competition, what does MR equal?", back:"MR = Price. A price-taking firm can sell any quantity at the market price." },
  { cat:"Demand & Supply Analysis", concept:"Marginal Revenue & Profit Max",
    front:"What is the universal profit-maximization rule?", back:"Produce where MR = MC (and MC is not falling)." },

  { cat:"Demand & Supply Analysis", concept:"Cost Curves & Breakeven",
    front:"What's the breakeven condition for a firm?", back:"Price = ATC (average total cost) — equivalently, TR = TC." },
  { cat:"Demand & Supply Analysis", concept:"Cost Curves & Breakeven",
    front:"What's the shutdown condition for a firm?", back:"Price = AVC (average variable cost). Below this, the firm loses less by shutting down entirely." },

  // ===== Firm & Market Organization =====
  { cat:"Firm & Market Organization", concept:"Four Market Structures",
    front:"What distinguishes perfect competition from monopoly?", back:"Perfect competition: many sellers, identical products, no pricing power. Monopoly: one seller, unique product, considerable pricing power." },
  { cat:"Firm & Market Organization", concept:"Four Market Structures",
    front:"Which market structure has the lowest barriers to entry?", back:"Perfect competition." },

  { cat:"Firm & Market Organization", concept:"Elasticity & Revenue",
    front:"At what output level is total revenue maximized?", back:"Where marginal revenue (MR) equals zero." },
  { cat:"Firm & Market Organization", concept:"Elasticity & Revenue",
    front:"Give the formula linking marginal revenue to elasticity.", back:"MR = P × [1 − (1/E)]." },

  { cat:"Firm & Market Organization", concept:"Consumer Surplus",
    front:"How do you calculate consumer surplus?", back:"CS = ½ × Quantity × (price-axis intercept − Price) — the area of the triangle above price, below the demand curve." },
  { cat:"Firm & Market Organization", concept:"Consumer Surplus",
    front:"What is consumer surplus, in plain words?", back:"The gap between what buyers would have paid (value) and what they actually paid (expenditure)." },

  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Perfect Competition)",
    front:"What shape is an individual firm's demand curve under perfect competition?", back:"Perfectly horizontal (flat) at the market price — the firm is a price taker." },
  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Perfect Competition)",
    front:"Under perfect competition, what equality holds for a firm?", back:"P = AR = MR." },

  { cat:"Firm & Market Organization", concept:"Cost Curves & Long-Run Equilibrium",
    front:"What is a firm's economic profit in long-run perfect competition equilibrium?", back:"Exactly zero — free entry competes away any positive economic profit." },
  { cat:"Firm & Market Organization", concept:"Cost Curves & Long-Run Equilibrium",
    front:"What's the long-run equilibrium condition in perfect competition?", back:"P = MC = minimum ATC." },

  { cat:"Firm & Market Organization", concept:"Sources of Market Power",
    front:"Name four sources of monopoly power.", back:"Legal protection (patents), control of a critical resource, economies of scale (natural monopoly), and network effects." },
  { cat:"Firm & Market Organization", concept:"Sources of Market Power",
    front:"Why does a monopolist's MR curve fall twice as steeply as its demand curve?", back:"Selling one more unit forces the monopolist to lower price on every unit sold, not just the newest one." },

  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Monopoly)",
    front:"Why does a profit-maximizing monopolist always operate where demand is elastic?", back:"MR is only positive in the elastic region of a linear demand curve, and MC is positive at the optimum — so MR=MC can only happen there." },
  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Monopoly)",
    front:"How do you solve for a monopolist's optimal price directly from elasticity?", back:"P = MC / (1 − 1/E)." },

  { cat:"Firm & Market Organization", concept:"Price Discrimination",
    front:"What is a two-part tariff?", back:"A pricing structure with a fixed membership fee plus a per-unit charge, designed to extract consumer surplus." },
  { cat:"Firm & Market Organization", concept:"Price Discrimination",
    front:"Give an example of third-degree price discrimination.", back:"Charging different prices to different customer segments based on an observable trait — e.g., student vs. professional software pricing." },

  // ===== GDP, Income & Expenditure =====
  { cat:"GDP, Income & Expenditure", concept:"What Is GDP?",
    front:"What are the three equivalent ways to define GDP?", back:"Output, income, and expenditure — three names for the same number, since one person's spending is another's income." },
  { cat:"GDP, Income & Expenditure", concept:"What Is GDP?",
    front:"Why are transfer payments (like unemployment benefits) excluded from GDP?", back:"They move money without any corresponding new production." },

  { cat:"GDP, Income & Expenditure", concept:"The Value-Added Method",
    front:"How does the value-added method avoid double-counting?", back:"It sums only each stage's added value (selling price minus input cost), which equals the final good's price exactly once." },
  { cat:"GDP, Income & Expenditure", concept:"The Value-Added Method",
    front:"An intermediate good, like steel sold to a car maker, gets counted in GDP how?", back:"Not directly — its value is already embedded in the final product's (the car's) price." },

  { cat:"GDP, Income & Expenditure", concept:"Nominal vs. Real GDP",
    front:"What's the difference between nominal and real GDP?", back:"Nominal GDP uses current-year prices. Real GDP uses fixed base-year prices, so it only moves when actual output moves." },
  { cat:"GDP, Income & Expenditure", concept:"Nominal vs. Real GDP",
    front:"Give the formula for the GDP deflator.", back:"GDP deflator = (Nominal GDP / Real GDP) × 100." },

  { cat:"GDP, Income & Expenditure", concept:"The Components of GDP",
    front:"Give the expenditure approach formula for GDP.", back:"GDP = C + I + G + (X − M)." },
  { cat:"GDP, Income & Expenditure", concept:"The Components of GDP",
    front:"What's the relationship between MPC and MPS?", back:"MPC + MPS = 1 — every extra dollar of income is either consumed or saved." },

  { cat:"GDP, Income & Expenditure", concept:"Saving, Investment & the Trade Balance",
    front:"Give the fundamental macro identity linking saving, investment, government, and trade.", back:"S = I + (G−T) + (X−M)." },
  { cat:"GDP, Income & Expenditure", concept:"Saving, Investment & the Trade Balance",
    front:"If a country's investment exceeds its private saving (balanced budget), what must be true of its trade balance?", back:"It must be running a trade deficit — the investment shortfall gets funded by foreign capital." },

  // ===== AD, AS & Economic Growth =====
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Demand Curve",
    front:"Name the three reasons AD slopes downward.", back:"The wealth effect, the interest rate effect, and the real exchange rate effect." },
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Demand Curve",
    front:"Explain the wealth effect in one sentence.", back:"Higher prices erode the real purchasing power of fixed nominal wealth, so people spend less." },

  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Supply Curve",
    front:"Why is the long-run aggregate supply (LRAS) curve vertical?", back:"Wages and costs fully adjust to prices in the long run, so real output settles at potential GDP regardless of the price level." },
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Supply Curve",
    front:"Name the three AS curves by time horizon and their shapes.", back:"VSRAS (flat), SRAS (upward sloping), LRAS (vertical)." },

  { cat:"AD, AS & Economic Growth", concept:"Shifts in AD & AS",
    front:"An oil price shock shifts which curve, and which direction?", back:"Aggregate supply (AS), to the left — higher input costs reduce supply at every price level." },
  { cat:"AD, AS & Economic Growth", concept:"Shifts in AD & AS",
    front:"A central bank rate cut shifts which curve, and which direction?", back:"Aggregate demand (AD), to the right — lower rates boost investment spending at every price level." },

  { cat:"AD, AS & Economic Growth", concept:"Four Macroeconomic Equilibria",
    front:"What defines stagflation, and what causes it?", back:"Falling output with rising prices simultaneously — caused by a leftward shift in aggregate supply, not demand." },
  { cat:"AD, AS & Economic Growth", concept:"Four Macroeconomic Equilibria",
    front:"What's the difference between a recessionary gap and an inflationary gap?", back:"Recessionary: AD falls, output below potential, prices fall. Inflationary: AD rises, output above potential, prices rise." },

  { cat:"AD, AS & Economic Growth", concept:"The Production Function & Growth Accounting",
    front:"Give the growth accounting equation.", back:"Growth in potential GDP = Growth in TFP + WL(Growth in labor) + WK(Growth in capital)." },
  { cat:"AD, AS & Economic Growth", concept:"The Production Function & Growth Accounting",
    front:"Why can't an economy sustain growth by adding capital alone?", back:"Diminishing marginal productivity — each added unit of capital, with labor fixed, contributes progressively less." },

  { cat:"AD, AS & Economic Growth", concept:"Measures of Sustainable Growth",
    front:"How is labor productivity calculated?", back:"Labor productivity = Real GDP / Aggregate hours worked." },
  { cat:"AD, AS & Economic Growth", concept:"Measures of Sustainable Growth",
    front:"Why do developing countries often have faster productivity GROWTH than developed ones, despite a lower LEVEL?", back:"They start from a lower capital base, where diminishing returns haven't yet reduced the payoff from new capital — the convergence pattern." },

  // ===== Business Cycles =====
  { cat:"Business Cycles", concept:"Consumer Behavior",
    front:"Which spending category is most cyclically sensitive, and why?", back:"Durable goods — they can be kept longer through repairs, so replacement is easy to postpone." },
  { cat:"Business Cycles", concept:"Consumer Behavior",
    front:"What does services spending track most closely?", back:"Permanent income — the household's durable sense of financial security, not one-off windfalls." },

  { cat:"Business Cycles", concept:"Housing & Business Investment",
    front:"Why is housing demand unusually sensitive to interest rates?", back:"Most home purchases are mortgage-financed, so borrowing costs directly affect affordability." },
  { cat:"Business Cycles", concept:"Housing & Business Investment",
    front:"What's the single most cyclically volatile GDP component?", back:"Business investment." },

  { cat:"Business Cycles", concept:"External Trade",
    front:"What drives a country's exports?", back:"Economic conditions in trading partner countries, not domestic conditions." },
  { cat:"Business Cycles", concept:"External Trade",
    front:"What happens to a country's trade balance when its currency appreciates?", back:"It tends to worsen — imports become cheaper, exports become more expensive abroad." },

  { cat:"Business Cycles", concept:"Types & Measures",
    front:"Give the unemployment rate formula.", back:"Unemployment rate = Unemployed / Labor force." },
  { cat:"Business Cycles", concept:"Types & Measures",
    front:"Is a discouraged worker counted as unemployed?", back:"No — they're excluded from the labor force entirely, and don't appear in the official unemployment rate." },

  { cat:"Business Cycles", concept:"Why It Lags the Cycle",
    front:"Why is the unemployment rate a lagging indicator?", back:"Firms are slow to change headcount, and discouraged workers re-enter the labor force with a delay during recoveries." },
  { cat:"Business Cycles", concept:"Why It Lags the Cycle",
    front:"Name an earlier signal of labor market weakness than the unemployment rate.", back:"Overtime hours and temporary staffing levels — cut before full-time headcount." },

  { cat:"Business Cycles", concept:"Inflation, Deflation & Hyperinflation",
    front:"What's the difference between disinflation and deflation?", back:"Disinflation: inflation is still positive, just slowing. Deflation: the price level is actually falling (negative inflation)." },
  { cat:"Business Cycles", concept:"Inflation, Deflation & Hyperinflation",
    front:"Why is deflation dangerous?", back:"It raises the real burden of fixed nominal debt, prompting spending cuts that deepen the downturn — a vicious spiral." },

  { cat:"Business Cycles", concept:"Measuring Inflation",
    front:"Does a fixed-basket (Laspeyres) price index overstate or understate true inflation?", back:"Overstate — due to substitution, quality, and new product biases, all pushing the same direction." },
  { cat:"Business Cycles", concept:"Measuring Inflation",
    front:"What is substitution bias?", back:"A fixed basket doesn't capture buyers shifting to cheaper substitutes when a good's price rises, overstating the true cost-of-living increase." },

  { cat:"Business Cycles", concept:"Cost-Push vs. Demand-Pull",
    front:"What signals cost-push inflation?", back:"Wages growing faster than productivity, raising unit labor costs (ULC = W/O) and squeezing margins." },
  { cat:"Business Cycles", concept:"Cost-Push vs. Demand-Pull",
    front:"What signals demand-pull inflation?", back:"Actual GDP running close to or above potential GDP, creating capacity bottlenecks." },

  { cat:"Business Cycles", concept:"Leading, Coincident & Lagging Indicators",
    front:"Give an example of a leading economic indicator.", back:"The yield curve spread (long-term minus short-term rates) — it reflects forward-looking market expectations." },
  { cat:"Business Cycles", concept:"Leading, Coincident & Lagging Indicators",
    front:"Give an example of a coincident economic indicator.", back:"Industrial production or non-agricultural employment — they move in step with the broader economy." },

  { cat:"Business Cycles", concept:"Theories of the Business Cycle",
    front:"What does Real Business Cycle (RBC) theory attribute fluctuations to?", back:"Shifts in aggregate supply (technology, input costs) — with minimal need for government intervention." },
  { cat:"Business Cycles", concept:"Theories of the Business Cycle",
    front:"What does Keynesian theory recommend for a demand-driven recession?", back:"Active fiscal or monetary stimulus to restore full employment and prevent a deflationary spiral." },

  // ===== Monetary & Fiscal Policy =====
  { cat:"Monetary & Fiscal Policy", concept:"Monetary vs. Fiscal Policy",
    front:"What's the key difference between monetary and fiscal policy?", back:"Monetary policy (central bank) manages money and credit. Fiscal policy (government) manages taxation and spending, and can redistribute income." },
  { cat:"Monetary & Fiscal Policy", concept:"Monetary vs. Fiscal Policy",
    front:"Why do government financing decisions move interest rates for everyone?", back:"Governments are typically the largest borrowers in world debt markets." },

  { cat:"Monetary & Fiscal Policy", concept:"Functions & Definitions of Money",
    front:"Name the three functions of money.", back:"Medium of exchange, store of wealth, and unit of account." },
  { cat:"Monetary & Fiscal Policy", concept:"Functions & Definitions of Money",
    front:"What's the difference between narrow money and broad money?", back:"Narrow money is cash and highly liquid deposits. Broad money adds a wider range of liquid assets, like savings accounts." },

  { cat:"Monetary & Fiscal Policy", concept:"The Money Creation Process",
    front:"Give the formula for the money multiplier.", back:"Money multiplier = 1 / Reserve requirement." },
  { cat:"Monetary & Fiscal Policy", concept:"The Money Creation Process",
    front:"Give the formula for total money created from a new deposit.", back:"Total money = New deposit / Reserve requirement." },

  { cat:"Monetary & Fiscal Policy", concept:"The Quantity Theory of Money",
    front:"Give the quantity equation of exchange.", back:"M × V = P × Y (money supply × velocity = price level × real output)." },
  { cat:"Monetary & Fiscal Policy", concept:"The Quantity Theory of Money",
    front:"What extra assumption turns the quantity equation into the quantity THEORY of money?", back:"That velocity (V) is roughly constant — meaning money growth translates almost directly into inflation." },

  { cat:"Monetary & Fiscal Policy", concept:"The Demand for Money",
    front:"Which of the three money-demand motives is most interest-rate sensitive?", back:"Speculative demand — it reflects the opportunity cost of holding cash versus interest-bearing assets." },
  { cat:"Monetary & Fiscal Policy", concept:"The Demand for Money",
    front:"Name the three motives for holding money.", back:"Transactions-related, precautionary, and speculative." },

  { cat:"Monetary & Fiscal Policy", concept:"Money Market Equilibrium",
    front:"Why is the money supply (MS) curve drawn as vertical?", back:"The nominal quantity of money at any given moment is treated as fixed, regardless of the interest rate." },
  { cat:"Monetary & Fiscal Policy", concept:"Money Market Equilibrium",
    front:"If the interest rate is above equilibrium, what happens in the money market?", back:"Excess supply of money — people buy bonds with the surplus, pushing bond prices up and rates back down." },

  { cat:"Monetary & Fiscal Policy", concept:"The Fisher Effect",
    front:"Give the Fisher effect formula.", back:"Rnominal = Rreal + expected inflation (πe)." },
  { cat:"Monetary & Fiscal Policy", concept:"The Fisher Effect",
    front:"What concept does the Fisher effect rely on?", back:"Money neutrality — in the long run, money supply changes affect nominal prices but not real variables." },

  { cat:"Monetary & Fiscal Policy", concept:"The Costs of Inflation",
    front:"Which is more costly: expected or unexpected inflation?", back:"Unexpected inflation — it can't be planned for and redistributes real wealth unpredictably between borrowers and lenders." },
  { cat:"Monetary & Fiscal Policy", concept:"The Costs of Inflation",
    front:"When inflation is unexpectedly HIGH, who benefits — borrowers or lenders?", back:"Borrowers — the real value of their fixed nominal debt shrinks." },

  // ===== International Trade & Capital Flows =====
  { cat:"International Trade & Capital Flows", concept:"GDP vs. GNP & Basic Terms",
    front:"What's the difference between GDP and GNP?", back:"GDP counts output by location (within a country's borders). GNP counts output by ownership (a country's own citizens/companies, wherever they operate)." },
  { cat:"International Trade & Capital Flows", concept:"GDP vs. GNP & Basic Terms",
    front:"What's the difference between a trade surplus and a trade deficit?", back:"Surplus: exports exceed imports (lending to foreigners). Deficit: imports exceed exports (borrowing from foreigners)." },

  { cat:"International Trade & Capital Flows", concept:"Patterns & Trends in Trade",
    front:"What's the difference between FDI and FPI?", back:"FDI: direct investment in productive assets with operational control. FPI: shorter-term investment in foreign financial instruments, without control." },
  { cat:"International Trade & Capital Flows", concept:"Patterns & Trends in Trade",
    front:"What makes a firm a \"multinational corporation\"?", back:"Engaging in foreign direct investment — building or acquiring productive assets abroad with operational control." },

  { cat:"International Trade & Capital Flows", concept:"Absolute vs. Comparative Advantage",
    front:"What's the difference between absolute and comparative advantage?", back:"Absolute: producing with fewer resources, in absolute terms. Comparative: a lower opportunity cost than your trading partner." },
  { cat:"International Trade & Capital Flows", concept:"Absolute vs. Comparative Advantage",
    front:"Can a country gain from trade even with no absolute advantage in anything?", back:"Yes — as long as it has a comparative advantage (a lower opportunity cost) in something." },

  { cat:"International Trade & Capital Flows", concept:"The Gains from Trade",
    front:"What range of world prices allows both trading countries to gain?", back:"Any price strictly between the two countries' own autarkic (no-trade) prices." },
  { cat:"International Trade & Capital Flows", concept:"The Gains from Trade",
    front:"Is comparative advantage permanent?", back:"No — it shifts with capital accumulation, new technology, and resource discoveries." },

  { cat:"International Trade & Capital Flows", concept:"The Ricardian Model",
    front:"In the Ricardian model, what's the sole source of comparative advantage?", back:"Labor productivity, driven by differences in technology — labor is the model's only variable factor." },
  { cat:"International Trade & Capital Flows", concept:"The Ricardian Model",
    front:"Can comparative advantage in the Ricardian model be lost?", back:"Yes — as technology gaps close or a trading partner overtakes the original leader." },

  { cat:"International Trade & Capital Flows", concept:"The Heckscher–Ohlin Model",
    front:"What does the Heckscher-Ohlin model add beyond the Ricardian model?", back:"A second factor of production, capital — making relative factor endowments, not just technology, the source of comparative advantage." },
  { cat:"International Trade & Capital Flows", concept:"The Heckscher–Ohlin Model",
    front:"Which trade model allows trade to redistribute income within a country?", back:"Heckscher-Ohlin — with two factors, trade can benefit the abundant factor and hurt the scarce one." },

  { cat:"International Trade & Capital Flows", concept:"BOP Components",
    front:"Name the three components of the balance of payments.", back:"The current account, the capital account, and the financial account." },
  { cat:"International Trade & Capital Flows", concept:"BOP Components",
    front:"Which BOP sub-account records a worker's remittance sent home?", back:"Unilateral transfers, within the current account." },

  { cat:"International Trade & Capital Flows", concept:"The National Income Identity",
    front:"Give the current account formula in terms of national income.", back:"CA = X − M = Y − (C+I+G)." },
  { cat:"International Trade & Capital Flows", concept:"The National Income Identity",
    front:"What does a persistent current account deficit mean for a country?", back:"It's consuming more than it produces, financed by borrowing from abroad." },

  // ===== Currency Exchange Rates =====
  { cat:"Currency Exchange Rates", concept:"Size & Importance",
    front:"How large is the daily foreign exchange market?", back:"Roughly $5.1 trillion — the largest financial market in the world, far bigger than global bond or equity markets." },
  { cat:"Currency Exchange Rates", concept:"Size & Importance",
    front:"Is a purely domestic-stock investor exposed to FX markets?", back:"Yes, indirectly — through the foreign revenue and competition faced by the domestic companies they hold." },

  { cat:"Currency Exchange Rates", concept:"Nominal & Real Exchange Rates",
    front:"What does the real exchange rate adjust for, that the nominal rate doesn't?", back:"Relative price levels (inflation) between the two countries — capturing true purchasing power." },
  { cat:"Currency Exchange Rates", concept:"Nominal & Real Exchange Rates",
    front:"When has a currency \"appreciated\"?", back:"When it buys more of another currency than it did before." },

  { cat:"Currency Exchange Rates", concept:"Spot, Forward & FX Swaps",
    front:"When does a spot FX transaction typically settle?", back:"About two business days after the trade (T+2)." },
  { cat:"Currency Exchange Rates", concept:"Spot, Forward & FX Swaps",
    front:"What is an FX swap?", back:"A spot transaction combined with an offsetting forward transaction — often used to roll a forward position to a new date." },

  { cat:"Currency Exchange Rates", concept:"Hedging a Foreign Investment",
    front:"In a hedged foreign bond strategy, what specifically eliminates currency risk?", back:"Locking in the exchange rate today via a forward contract, rather than relying on the future spot rate." },
  { cat:"Currency Exchange Rates", concept:"Hedging a Foreign Investment",
    front:"What are the three steps in a hedged carry-trade calculation?", back:"1) Convert at spot. 2) Earn the foreign interest rate. 3) Convert back at the locked-in forward rate." },

  { cat:"Currency Exchange Rates", concept:"% Change in Currency Value",
    front:"Give the formula for percentage change in an exchange rate.", back:"%Δ = (New rate − Old rate) / Old rate." },
  { cat:"Currency Exchange Rates", concept:"% Change in Currency Value",
    front:"If Currency A depreciates 10% against B, does B need to appreciate exactly 10% to reverse it?", back:"No — because the percentage bases differ, B needs to appreciate about 11.1% to fully reverse a 10% depreciation." },

  { cat:"Currency Exchange Rates", concept:"The Elasticities Approach",
    front:"What does the Marshall-Lerner condition tell you?", back:"Whether a currency devaluation will actually improve a country's trade balance, based on export and import demand elasticities." },
  { cat:"Currency Exchange Rates", concept:"The Elasticities Approach",
    front:"Give the generalized Marshall-Lerner condition.", back:"ωX·εX + ωM·(εM − 1) > 0." },
];

/* ============================================================
   Flashcard engine — flip, filter, shuffle, self-assessment
   ============================================================ */
(function(){
  const cardArea = document.getElementById('cardArea');
  const moduleSelect = document.getElementById('moduleSelect');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const deckProgress = document.getElementById('deckProgress');
  const deckFill = document.getElementById('deckFill');

  // Populate module filter options
  const categories = [...new Set(FLASHCARDS.map(c => c.cat))];
  categories.forEach(cat => {
    const count = FLASHCARDS.filter(c => c.cat === cat).length;
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = `${cat} (${count} cards)`;
    moduleSelect.appendChild(opt);
  });

  function shuffleArr(arr){
    const a = [...arr];
    for (let i=a.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  let deck = shuffleArr(FLASHCARDS);
  let index = 0;
  let flipped = false;
  let assessedThisCard = false;
  let reviewedCount = 0;
  const reviewedSet = new Set();

  function currentFilter(){ return moduleSelect.value; }

  function applyFilter(){
    const f = currentFilter();
    const source = f === 'all' ? FLASHCARDS : FLASHCARDS.filter(c => c.cat === f);
    deck = shuffleArr(source);
    index = 0;
    reviewedCount = 0;
    reviewedSet.clear();
    render();
  }

  function render(){
    if (deck.length === 0){
      cardArea.innerHTML = `<div class="empty-deck">No cards in this selection.</div>`;
      deckProgress.textContent = '';
      deckFill.style.width = '0%';
      return;
    }
    const card = deck[index];
    flipped = false;
    assessedThisCard = false;

    cardArea.innerHTML = `
      <div class="card-scene">
        <div class="flashcard" id="flashcardEl">
          <div class="card-face card-front">
            <div class="card-tag">${card.cat}</div>
            <div class="card-text">${card.front}</div>
            <div class="card-hint">Tap to flip</div>
          </div>
          <div class="card-face card-back">
            <div class="card-tag">${card.concept}</div>
            <div class="card-text">${card.back}</div>
            <div class="card-hint">Tap to flip back</div>
          </div>
        </div>
      </div>
      <div class="self-assess-row">
        <button class="assess-btn still-learning" id="stillLearningBtn">Still learning</button>
        <button class="assess-btn got-it" id="gotItBtn">Got it ✓</button>
      </div>
      <div class="nav-row">
        <button class="nav-btn" id="prevBtn" ${index===0 ? 'disabled' : ''}>← Previous</button>
        <span class="nav-counter">${index+1} / ${deck.length}</span>
        <button class="nav-btn" id="nextBtn" ${index===deck.length-1 ? 'disabled' : ''}>Next →</button>
      </div>
    `;

    const flashcardEl = document.getElementById('flashcardEl');
    flashcardEl.addEventListener('click', () => {
      flipped = !flipped;
      flashcardEl.classList.toggle('flipped', flipped);
      if (flipped){
        document.getElementById('stillLearningBtn').classList.add('show');
        document.getElementById('gotItBtn').classList.add('show');
      }
    });

    function assess(gotIt){
      if (assessedThisCard) return;
      assessedThisCard = true;
      if (typeof cfaRecordAnswer === 'function'){
        cfaRecordAnswer(card.concept, card.cat, gotIt);
      }
      if (!reviewedSet.has(index)){
        reviewedSet.add(index);
        reviewedCount++;
      }
      updateProgress();
      // auto-advance after a short pause
      setTimeout(() => {
        if (index < deck.length - 1){ index++; render(); }
      }, 350);
    }

    document.getElementById('stillLearningBtn').addEventListener('click', (e) => { e.stopPropagation(); assess(false); });
    document.getElementById('gotItBtn').addEventListener('click', (e) => { e.stopPropagation(); assess(true); });

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (index > 0){ index--; render(); }
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
      if (index < deck.length - 1){ index++; render(); }
    });

    updateProgress();
  }

  function updateProgress(){
    const pct = deck.length > 0 ? Math.round((reviewedCount/deck.length)*100) : 0;
    deckProgress.textContent = `${reviewedCount} of ${deck.length} cards reviewed this session`;
    deckFill.style.width = pct + '%';
  }

  moduleSelect.addEventListener('change', applyFilter);
  shuffleBtn.addEventListener('click', () => {
    deck = shuffleArr(deck);
    index = 0;
    render();
  });

  render();
})();
