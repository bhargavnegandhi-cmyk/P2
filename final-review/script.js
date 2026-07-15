// ============================================================
// Final Review — 132 questions across all 9 Economics modules
// 2 questions per real concept/section, for reliable per-concept diagnosis
// ============================================================

const QUIZ = [
  // ========== MODULE 00: Economics Foundations (7 concepts x 2 = 14) ==========
  { cat:"Economics Foundations", concept:"Scarcity & Opportunity Cost",
    q:"A retiree spends a free afternoon gardening instead of taking a paid consulting call worth $150. What is the opportunity cost of gardening?",
    opts:["$0, since no cash was spent","$150, the forgone consulting fee","The cost of gardening tools"], correct:1,
    exp:"Opportunity cost is the value of the next-best alternative given up — here, the $150 consulting fee." },
  { cat:"Economics Foundations", concept:"Scarcity & Opportunity Cost",
    q:"Scarcity exists even for extremely wealthy individuals because:",
    opts:["They still have unlimited wants relative to limited time and resources","Wealthy people are exempt from economic constraints","Scarcity only applies to money, not time"], correct:0,
    exp:"Scarcity is about resources being limited relative to unlimited wants — money doesn't buy unlimited time or attention." },

  { cat:"Economics Foundations", concept:"Factors of Production & Economic Systems",
    q:"A commercial bakery's ovens and mixing equipment are examples of which factor of production?",
    opts:["Land","Capital","Entrepreneurship"], correct:1,
    exp:"Capital refers to tools and equipment used to produce other goods, distinct from money itself." },
  { cat:"Economics Foundations", concept:"Factors of Production & Economic Systems",
    q:"An economy where prices, set by supply and demand, drive most production decisions, with government playing a limited but real role, is best described as:",
    opts:["A pure command economy","A mixed economy","A pure market economy with zero intervention"], correct:1,
    exp:"Nearly every real economy blends market pricing with some government role — a mixed economy." },

  { cat:"Economics Foundations", concept:"The Production Possibilities Frontier",
    q:"An economy is producing at a point exactly on its PPF. To produce more of Good A, it must:",
    opts:["Give up some production of Good B", "Increase both goods simultaneously with no trade-off", "This is impossible on the frontier itself"], correct:0,
    exp:"On the frontier, resources are fully employed, so producing more of one good requires giving up some of the other." },
  { cat:"Economics Foundations", concept:"The Production Possibilities Frontier",
    q:"A country discovers a large new oil field and adopts more efficient extraction technology. What happens to its PPF?",
    opts:["It shifts inward","It shifts outward","It stays exactly the same"], correct:1,
    exp:"More resources and better technology constitute economic growth, which shifts the entire PPF outward." },

  { cat:"Economics Foundations", concept:"Microeconomics vs. Macroeconomics",
    q:"\"Why did a national unemployment rate fall to a five-year low?\" is a question of:",
    opts:["Microeconomics","Macroeconomics"], correct:1,
    exp:"A question about an economy-wide aggregate like the national unemployment rate is macroeconomics." },
  { cat:"Economics Foundations", concept:"Microeconomics vs. Macroeconomics",
    q:"\"Why did a single coffee shop raise its prices this month?\" is a question of:",
    opts:["Microeconomics","Macroeconomics"], correct:0,
    exp:"A question about one specific firm's pricing decision is microeconomics." },

  { cat:"Economics Foundations", concept:"Positive vs. Normative Economics",
    q:"\"A $1 increase in the minimum wage is correlated with a 2% decline in teen employment in this sector\" is:",
    opts:["A positive statement","A normative statement"], correct:0,
    exp:"This is a testable, factual claim about cause and effect — a positive statement." },
  { cat:"Economics Foundations", concept:"Positive vs. Normative Economics",
    q:"\"Income inequality is unfair and government should act to reduce it\" is:",
    opts:["A positive statement","A normative statement"], correct:1,
    exp:"This expresses a value judgment about fairness and what policy should do — a normative statement." },

  { cat:"Economics Foundations", concept:"Reading a Graph — Movements vs. Shifts",
    q:"On a standard supply curve (price vs. quantity supplied), a change in the good's own price causes:",
    opts:["A movement along the curve","A shift of the entire curve"], correct:0,
    exp:"Price is one of the supply curve's own two axes, so a price change causes movement along the existing curve." },
  { cat:"Economics Foundations", concept:"Reading a Graph — Movements vs. Shifts",
    q:"A new, cheaper production technology becomes available to all firms in an industry. This causes:",
    opts:["A movement along the existing supply curve","A rightward shift of the entire supply curve"], correct:1,
    exp:"Technology isn't on either axis of a supply curve, so it shifts the whole curve — here, rightward, since firms can now supply more at every price." },

  { cat:"Economics Foundations", concept:"The Circular Flow of Income",
    q:"In the circular flow model, which flow moves from firms to households?",
    opts:["Wages, rent, interest, and profit","Consumption spending","Tax payments"], correct:0,
    exp:"Firms pay households for the labor and capital households supply, in the form of wages, rent, interest, and profit." },
  { cat:"Economics Foundations", concept:"The Circular Flow of Income",
    q:"The national income identity GDP = C + I + G + (X−M) relates to the circular flow model because:",
    opts:["It's unrelated to the circular flow", "Each term corresponds to a flow between sectors in the diagram", "It only applies under a command economy"], correct:1,
    exp:"C is the household-to-firm flow, G is government's injection, and (X−M) is the net foreign-sector flow — the equation is the diagram, in algebra." },

  // ========== MODULE E1: Demand and Supply Analysis (8 concepts x 2 = 16) ==========
  { cat:"Demand & Supply Analysis", concept:"The Demand Function & Curve",
    q:"A demand function is Qx = 60 − 3Px + 0.4I. Holding income fixed, what does the coefficient on Px reflect?",
    opts:["The law of demand — quantity falls as price rises","Income elasticity","A pricing error"], correct:0,
    exp:"A negative coefficient on a good's own price is exactly the law of demand." },
  { cat:"Demand & Supply Analysis", concept:"The Demand Function & Curve",
    q:"The inverse demand function is best described as:",
    opts:["Quantity written as a function of price", "Price written as a function of quantity", "Income written as a function of price"], correct:1,
    exp:"The inverse demand function solves for price in terms of quantity — what's actually plotted as the demand curve." },

  { cat:"Demand & Supply Analysis", concept:"Price Elasticity of Demand",
    q:"A demand curve has slope ΔQ/ΔP = −5, with P=4 and Q=50 at the point of interest. What is the price elasticity?",
    opts:["−0.40", "−1.25", "−20.0"], correct:0,
    exp:"E = slope × (P/Q) = −5 × (4/50) = −0.40." },
  { cat:"Demand & Supply Analysis", concept:"Price Elasticity of Demand",
    q:"If demand is elastic and price rises, total expenditure will:",
    opts:["Rise","Fall","Stay exactly the same"], correct:1,
    exp:"With elastic demand, quantity falls proportionally more than price rises, so total expenditure falls." },

  { cat:"Demand & Supply Analysis", concept:"What Drives Elasticity?",
    q:"Which characteristic makes a good's demand MORE elastic?",
    opts:["Few or no close substitutes","Many close substitutes available","A very small share of the household budget"], correct:1,
    exp:"The more easily buyers can switch to a substitute, the more elastic their demand." },
  { cat:"Demand & Supply Analysis", concept:"What Drives Elasticity?",
    q:"Demand for a good tends to become MORE elastic:",
    opts:["The less time buyers have to adjust", "The more time buyers have to adjust", "Time has no effect on elasticity"], correct:1,
    exp:"Given more time to find substitutes and adjust habits, demand for most goods becomes more elastic in the long run." },

  { cat:"Demand & Supply Analysis", concept:"Income & Cross-Price Elasticity",
    q:"A good has an income elasticity of demand of −0.4. This good is:",
    opts:["A normal good","An inferior good","A luxury good"], correct:1,
    exp:"Negative income elasticity means quantity demanded falls as income rises — the definition of an inferior good." },
  { cat:"Demand & Supply Analysis", concept:"Income & Cross-Price Elasticity",
    q:"The cross-price elasticity between coffee and tea is calculated as +0.5. The two goods are:",
    opts:["Complements","Substitutes","Unrelated"], correct:1,
    exp:"A positive cross-price elasticity means a price rise in one increases demand for the other — substitutes." },

  { cat:"Demand & Supply Analysis", concept:"Substitution & Income Effects",
    q:"For a normal good, when its price falls, the substitution effect and income effect:",
    opts:["Both push toward buying more, reinforcing each other", "Push in opposite directions", "Both push toward buying less"], correct:0,
    exp:"For a normal good, both effects reinforce — cheaper relative price and higher real income both raise demand." },
  { cat:"Demand & Supply Analysis", concept:"Substitution & Income Effects",
    q:"\"Inferior good\" is a label describing:",
    opts:["A defective or low-quality product","A good people buy less of as income rises","A good with no substitutes"], correct:1,
    exp:"Inferior is a technical term about income elasticity direction, not a statement about product quality." },

  { cat:"Demand & Supply Analysis", concept:"Marginal Returns & Productivity",
    q:"A firm's total product rises from 180 to 230 units when labor increases from 4 to 5 hours. What is the marginal product of the 5th hour?",
    opts:["46 units","50 units","230 units"], correct:1,
    exp:"MP = ΔTP/ΔL = (230−180)/(5−4) = 50 units." },
  { cat:"Demand & Supply Analysis", concept:"Marginal Returns & Productivity",
    q:"Once marginal product of labor turns negative, this indicates:",
    opts:["The firm should hire more workers immediately", "Adding another worker actually reduces total output", "Average product must also be negative"], correct:1,
    exp:"Negative marginal product means the additional worker actively decreases total production." },

  { cat:"Demand & Supply Analysis", concept:"Marginal Revenue & Profit Max",
    q:"A firm in perfect competition sells at the market price with no ability to influence it. Its marginal revenue is:",
    opts:["Less than price","Equal to price","Greater than price"], correct:1,
    exp:"A price-taking firm's marginal revenue always equals the market price: MR = P." },
  { cat:"Demand & Supply Analysis", concept:"Marginal Revenue & Profit Max",
    q:"A firm should increase output whenever:",
    opts:["MR is less than MC","MR is greater than MC","MR equals average total cost"], correct:1,
    exp:"As long as MR exceeds MC, producing one more unit adds more to revenue than to cost." },

  { cat:"Demand & Supply Analysis", concept:"Cost Curves & Breakeven",
    q:"At Q=8, TFC=200 and TVC=640. What is average total cost (ATC)?",
    opts:["$80.0","$105.0","$30.0"], correct:1,
    exp:"TC=200+640=840. ATC=TC/Q=840/8=$105.0." },
  { cat:"Demand & Supply Analysis", concept:"Cost Curves & Breakeven",
    q:"Market price has fallen below a firm's average variable cost. The rational response is to:",
    opts:["Keep operating, since fixed costs are sunk anyway", "Shut down, since losses are smaller than continuing to operate", "Raise price to cover the gap"], correct:1,
    exp:"Below AVC, every unit produced loses money even before fixed costs — shutting down limits the loss to fixed costs alone." },

  // ========== MODULE E2: The Firm and Market Organization (8 concepts x 2 = 16) ==========
  { cat:"Firm & Market Organization", concept:"Four Market Structures",
    q:"A market with one seller, a unique product, and very high barriers to entry is:",
    opts:["Perfect competition","Monopolistic competition","Monopoly"], correct:2,
    exp:"One seller, a unique product, and high barriers to entry define monopoly." },
  { cat:"Firm & Market Organization", concept:"Four Market Structures",
    q:"Which market structure has the LOWEST barriers to entry?",
    opts:["Perfect competition","Oligopoly","Monopoly"], correct:0,
    exp:"Perfect competition is characterized by very low barriers to entry, allowing many firms to compete." },

  { cat:"Firm & Market Organization", concept:"Elasticity & Revenue",
    q:"A firm's price elasticity of demand is estimated at −0.5. If the firm raises its price, total revenue will:",
    opts:["Rise","Fall","Stay the same"], correct:0,
    exp:"|−0.5|<1, inelastic — raising price on an inelastic good increases total revenue." },
  { cat:"Firm & Market Organization", concept:"Elasticity & Revenue",
    q:"Total revenue is maximized at the output level where:",
    opts:["Marginal revenue equals zero","Marginal cost equals zero","Average revenue is at its minimum"], correct:0,
    exp:"TR keeps rising as long as MR is positive, and peaks exactly where MR crosses zero." },

  { cat:"Firm & Market Organization", concept:"Consumer Surplus",
    q:"A demand curve has a price-axis intercept of 60. At price 20, quantity demanded is 40. What is consumer surplus?",
    opts:["400","800","1,200"], correct:1,
    exp:"CS = ½ × base × height = ½ × 40 × (60−20) = ½ × 40 × 40 = 800." },
  { cat:"Firm & Market Organization", concept:"Consumer Surplus",
    q:"Consumer surplus is best described as:",
    opts:["The difference between total value to buyers and total amount actually paid", "The firm's total profit", "The government's tax revenue from a good"], correct:0,
    exp:"Consumer surplus is the gap between what buyers would have paid (value) and what they actually paid (expenditure)." },

  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Perfect Competition)",
    q:"Market demand is P=40−Q, market supply is P=4+Q. What is the equilibrium quantity?",
    opts:["18","22","36"], correct:0,
    exp:"40−Q=4+Q → 36=2Q → Q=18." },
  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Perfect Competition)",
    q:"Under perfect competition, an individual firm's demand curve is:",
    opts:["Downward sloping, matching market demand","Perfectly horizontal at the market price","Perfectly vertical"], correct:1,
    exp:"Even though market demand slopes down, each price-taking firm faces a flat demand curve at the market price." },

  { cat:"Firm & Market Organization", concept:"Cost Curves & Long-Run Equilibrium",
    q:"In long-run equilibrium under perfect competition, a firm's economic profit is:",
    opts:["Always strongly positive","Exactly zero","Always negative"], correct:1,
    exp:"Free entry drives price to minimum average cost, leaving economic profit at exactly zero." },
  { cat:"Firm & Market Organization", concept:"Cost Curves & Long-Run Equilibrium",
    q:"A perfectly competitive market is earning positive economic profit. Over the long run:",
    opts:["New entrants arrive, supply rises, price falls until profit reaches zero", "Existing firms raise prices to capture more profit", "Nothing changes"], correct:0,
    exp:"Positive economic profit attracts new entrants, driving supply up and price down until profit is competed away." },

  { cat:"Firm & Market Organization", concept:"Sources of Market Power",
    q:"A single water utility authorized because duplicating pipe infrastructure would be wasteful is an example of monopoly power from:",
    opts:["A patent","Economies of scale (natural monopoly)","Network effects"], correct:1,
    exp:"This is the classic natural monopoly case — large fixed infrastructure costs favor a single provider." },
  { cat:"Firm & Market Organization", concept:"Sources of Market Power",
    q:"A monopolist's demand curve is QD=500−5P. What is the price-axis intercept of its marginal revenue curve?",
    opts:["100","50","200"], correct:0,
    exp:"Demand rewritten: P=100−0.2QD. MR shares demand's price intercept (100); only the slope doubles." },

  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Monopoly)",
    q:"A monopolist faces demand P=600−3Q and TC=5,000+60Q+3Q². What is the profit-maximizing quantity?",
    opts:["45","60","90"], correct:0,
    exp:"MR=600−6Q, MC=60+6Q. Setting equal: 600−6Q=60+6Q → 540=12Q → Q=45." },
  { cat:"Firm & Market Organization", concept:"Optimal Price & Output (Monopoly)",
    q:"A profit-maximizing monopolist (MR=MC, MC>0) always operates where demand is:",
    opts:["Inelastic","Elastic","Unit elastic"], correct:1,
    exp:"MR is only positive in the elastic region of a linear demand curve, and since MC is positive at the optimum, MR=MC can only occur there." },

  { cat:"Firm & Market Organization", concept:"Price Discrimination",
    q:"An airline charges different prices for the same route based on how far in advance a ticket is booked, as a proxy for business vs. leisure travelers. This is:",
    opts:["First-degree price discrimination","Second-degree price discrimination","Third-degree price discrimination"], correct:2,
    exp:"Segmenting customers by an observable trait (booking timing, proxying traveler type) is third-degree price discrimination." },
  { cat:"Firm & Market Organization", concept:"Price Discrimination",
    q:"A gym charges a monthly membership fee plus a per-visit fee. This pricing structure is called a:",
    opts:["Two-part tariff","Volume discount","Price ceiling"], correct:0,
    exp:"A fixed fee plus a per-unit charge is the defining structure of a two-part tariff." },

  // ========== MODULE E3a: GDP, Income & Expenditure (5 concepts x 2 = 10) ==========
  { cat:"GDP, Income & Expenditure", concept:"What Is GDP?",
    q:"A government sends a $1,200 unemployment benefit check to a laid-off worker. Does this count in GDP?",
    opts:["Yes, it's government spending","No, it's a transfer payment with no new production","Only if the worker spends it immediately"], correct:1,
    exp:"Transfer payments move money without new production, so they're excluded from GDP entirely." },
  { cat:"GDP, Income & Expenditure", concept:"What Is GDP?",
    q:"GDP can be measured using which two approaches that yield the same result?",
    opts:["Income and expenditure","Profit and loss","Supply and demand"], correct:0,
    exp:"The income approach and expenditure approach must yield identical totals, since spending is someone else's income." },

  { cat:"GDP, Income & Expenditure", concept:"The Value-Added Method",
    q:"A lumber mill sells $150 of wood to a furniture maker, who sells a finished table to a retailer for $400, who sells it to a customer for $650. What is this table's contribution to GDP?",
    opts:["$1,200 (summing every sale)","$650 (the final sale price only)","$150 (just the raw materials)"], correct:1,
    exp:"Only the final sale to the end customer counts toward GDP — $650." },
  { cat:"GDP, Income & Expenditure", concept:"The Value-Added Method",
    q:"A steel producer sells $500 of steel to a car manufacturer, who builds a car sold for $18,000. What is the steel's direct contribution to GDP?",
    opts:["$500, counted separately","$0 directly — its value is embedded in the car's final price","$18,500"], correct:1,
    exp:"The steel is an intermediate good; only the car's final sale price counts toward GDP." },

  { cat:"GDP, Income & Expenditure", concept:"Nominal vs. Real GDP",
    q:"Nominal GDP grew 6% this year, while the GDP deflator rose from 100 to 102. Approximately what was real GDP growth?",
    opts:["8%","About 4%","6%"], correct:1,
    exp:"Real GDP growth ≈ nominal growth − inflation ≈ 6% − 2% = 4%." },
  { cat:"GDP, Income & Expenditure", concept:"Nominal vs. Real GDP",
    q:"The GDP deflator is calculated as:",
    opts:["(Real GDP / Nominal GDP) × 100","(Nominal GDP / Real GDP) × 100","Nominal GDP − Real GDP"], correct:1,
    exp:"GDP deflator = (Nominal GDP / Real GDP) × 100." },

  { cat:"GDP, Income & Expenditure", concept:"The Components of GDP",
    q:"A household's marginal propensity to consume (MPC) is 0.65. What is its marginal propensity to save (MPS)?",
    opts:["0.65","0.35","1.65"], correct:1,
    exp:"MPC + MPS = 1, so MPS = 1 − 0.65 = 0.35." },
  { cat:"GDP, Income & Expenditure", concept:"The Components of GDP",
    q:"In GDP = C+I+G+(X−M), which component represents business spending on capital goods and inventory changes?",
    opts:["C","I","G"], correct:1,
    exp:"I is gross private domestic investment — capital goods spending plus inventory changes." },

  { cat:"GDP, Income & Expenditure", concept:"Saving, Investment & the Trade Balance",
    q:"A country has private saving of 18% of GDP, investment of 21%, and a balanced government budget. What must its trade balance be?",
    opts:["A 3% trade surplus","A 3% trade deficit","Exactly balanced trade"], correct:1,
    exp:"S=I+(G−T)+(X−M) → 18=21+0+(X−M) → X−M=−3%, a trade deficit funding the investment shortfall." },
  { cat:"GDP, Income & Expenditure", concept:"Saving, Investment & the Trade Balance",
    q:"A government fiscal deficit [(G−T)>0] must be offset, according to the macro identity, by:",
    opts:["The private sector saving more than it invests, a trade deficit, or some mix of both", "Higher GDP growth alone", "A stronger currency"], correct:0,
    exp:"Rearranging the identity: G−T=(S−I)−(X−M). A fiscal deficit requires excess private saving, a trade deficit, or both." },

  // ========== MODULE E3b: AD, AS & Economic Growth (6 concepts x 2 = 12) ==========
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Demand Curve",
    q:"A rise in the price level reduces the real value of household savings, reducing spending. This is:",
    opts:["The wealth effect","The interest rate effect","The real exchange rate effect"], correct:0,
    exp:"A price rise eroding the real purchasing power of nominal wealth is the wealth effect." },
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Demand Curve",
    q:"A higher domestic price level makes imports relatively cheaper and exports relatively more expensive abroad, reducing net exports. This is:",
    opts:["The wealth effect","The interest rate effect","The real exchange rate effect"], correct:2,
    exp:"This is the real exchange rate effect — one of the three reasons AD slopes downward." },

  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Supply Curve",
    q:"In the very short run (VSRAS), aggregate supply is:",
    opts:["Vertical","Upward sloping","Horizontal (flat)"], correct:2,
    exp:"Over a few months, firms adjust output without changing prices — a flat VSRAS curve." },
  { cat:"AD, AS & Economic Growth", concept:"The Aggregate Supply Curve",
    q:"The economy's potential output is represented by the position of which curve?",
    opts:["VSRAS","SRAS","LRAS"], correct:2,
    exp:"The vertical LRAS curve's position marks potential (full-employment) real GDP." },

  { cat:"AD, AS & Economic Growth", concept:"Shifts in AD & AS",
    q:"A central bank cuts interest rates, encouraging more investment spending at every price level. This is:",
    opts:["A movement along the AD curve","A rightward shift of the AD curve","A shift of the AS curve"], correct:1,
    exp:"Lower rates raise investment at every price level, shifting the whole AD curve right." },
  { cat:"AD, AS & Economic Growth", concept:"Shifts in AD & AS",
    q:"A sharp rise in global oil prices most directly causes:",
    opts:["A rightward shift in AD","A leftward shift in AS","A rightward shift in LRAS only"], correct:1,
    exp:"Higher input costs raise production costs at every price level, shifting AS left." },

  { cat:"AD, AS & Economic Growth", concept:"Four Macroeconomic Equilibria",
    q:"AD falls sharply due to weak consumer confidence, pushing output below potential GDP, with falling prices. This is:",
    opts:["An inflationary gap","A recessionary gap","Stagflation"], correct:1,
    exp:"AD falling below potential GDP, with falling output and prices, is a recessionary gap." },
  { cat:"AD, AS & Economic Growth", concept:"Four Macroeconomic Equilibria",
    q:"An economy experiences falling output and rising prices simultaneously, driven by an oil price shock. This is:",
    opts:["A recessionary gap","An inflationary gap","Stagflation, from a leftward AS shift"], correct:2,
    exp:"Falling output with rising prices together is the signature of an AS-driven shock — stagflation." },

  { cat:"AD, AS & Economic Growth", concept:"The Production Function & Growth Accounting",
    q:"According to growth accounting, TFP grows 1.2%, labor grows 2%, capital grows 3%, with WL=0.65, WK=0.35. What is potential GDP growth?",
    opts:["3.55%","6.2%","2.35%"], correct:0,
    exp:"Growth = 1.2 + 0.65(2) + 0.35(3) = 1.2+1.3+1.05 = 3.55%." },
  { cat:"AD, AS & Economic Growth", concept:"The Production Function & Growth Accounting",
    q:"Diminishing marginal productivity of capital implies that:",
    opts:["Each additional unit of capital, holding labor fixed, adds progressively less output", "Capital has no effect on output", "Output always grows proportionally with capital"], correct:0,
    exp:"Diminishing returns mean each added unit of capital, with labor fixed, contributes less than the previous unit." },

  { cat:"AD, AS & Economic Growth", concept:"Measures of Sustainable Growth",
    q:"Labor productivity is calculated as:",
    opts:["Real GDP divided by aggregate hours worked","Nominal GDP divided by the labor force","TFP divided by capital"], correct:0,
    exp:"Labor productivity = Real GDP / Aggregate hours worked." },
  { cat:"AD, AS & Economic Growth", concept:"Measures of Sustainable Growth",
    q:"Developed countries typically have a higher LEVEL of labor productivity but a lower GROWTH RATE than developing countries. Why?",
    opts:["Developing countries start from a lower capital base, where diminishing returns haven't yet reduced the payoff from new capital", "Developed countries have less capital accumulated", "This pattern never actually occurs"], correct:0,
    exp:"This is the convergence pattern — developing economies often see faster productivity growth as they build up capital from a lower base." },

  // ========== MODULE E4: Business Cycles (10 concepts x 2 = 20) ==========
  { cat:"Business Cycles", concept:"Consumer Behavior",
    q:"Which category of consumer spending shows the most pronounced cyclical swings?",
    opts:["Non-durable goods","Durable goods","Services"], correct:1,
    exp:"Durable goods are easy to postpone replacing, making them the most cyclically sensitive category." },
  { cat:"Business Cycles", concept:"Consumer Behavior",
    q:"Services spending tracks which measure of income most closely?",
    opts:["One-time windfall income","Permanent income","Government transfer payments only"], correct:1,
    exp:"Services spending tracks households' durable sense of financial security (permanent income), not one-off windfalls." },

  { cat:"Business Cycles", concept:"Housing & Business Investment",
    q:"Housing demand is unusually sensitive to which factor, more than most sectors?",
    opts:["Interest rates","Government spending levels","The unemployment rate alone"], correct:0,
    exp:"Since most homes are mortgage-financed, housing demand responds strongly to borrowing costs." },
  { cat:"Business Cycles", concept:"Housing & Business Investment",
    q:"Among all sectors of the economy, which typically fluctuates MOST with the business cycle?",
    opts:["Non-durable consumer goods","Business investment","Government spending"], correct:1,
    exp:"Business investment is the most volatile component of GDP across the cycle." },

  { cat:"Business Cycles", concept:"External Trade",
    q:"A country's exports are most directly driven by:",
    opts:["Domestic GDP growth","Economic conditions in trading partner countries","The domestic unemployment rate"], correct:1,
    exp:"Exports reflect foreign demand, so they respond to trading partners' conditions, not domestic conditions." },
  { cat:"Business Cycles", concept:"External Trade",
    q:"A country's currency appreciates significantly. All else equal, its trade balance is likely to:",
    opts:["Improve, as exports rise and imports fall", "Worsen, as imports become cheaper and exports pricier abroad", "Be completely unaffected"], correct:1,
    exp:"A stronger currency makes imports cheaper and exports pricier abroad, tending to worsen the trade balance." },

  { cat:"Business Cycles", concept:"Types & Measures",
    q:"A country has a labor force of 220,000 and 11,000 unemployed. What is the unemployment rate?",
    opts:["5.0%","11.0%","20.0%"], correct:0,
    exp:"Unemployment rate = Unemployed/Labor force = 11,000/220,000 = 5.0%." },
  { cat:"Business Cycles", concept:"Types & Measures",
    q:"A discouraged worker who has stopped looking for a job entirely is:",
    opts:["Counted as unemployed","Excluded from the labor force entirely","Counted as employed"], correct:1,
    exp:"Discouraged workers are statistically outside the labor force and don't count in the official unemployment rate." },

  { cat:"Business Cycles", concept:"Why It Lags the Cycle",
    q:"Why does the unemployment rate typically lag the business cycle?",
    opts:["Businesses are reluctant to change headcount quickly, and discouraged workers re-enter the labor force with a delay", "Unemployment is measured only once a decade", "Unemployment always moves before GDP does"], correct:0,
    exp:"Firms delay hiring/firing decisions, and the labor force itself expands and contracts with a lag, both making unemployment a lagging indicator." },
  { cat:"Business Cycles", concept:"Why It Lags the Cycle",
    q:"Which of these tends to be an EARLIER signal of labor market weakness than the unemployment rate?",
    opts:["Overtime hours and temporary staffing levels","The federal minimum wage","Corporate dividend announcements"], correct:0,
    exp:"Businesses cut overtime and temp staff before touching full-time headcount, making these earlier warning signs." },

  { cat:"Business Cycles", concept:"Inflation, Deflation & Hyperinflation",
    q:"A country's inflation rate falls from 20% to 8% over two years, with prices still rising. This is:",
    opts:["Deflation","Disinflation","Hyperinflation"], correct:1,
    exp:"Inflation remaining positive but slowing is disinflation, distinct from deflation." },
  { cat:"Business Cycles", concept:"Inflation, Deflation & Hyperinflation",
    q:"Why is deflation considered particularly dangerous for an economy?",
    opts:["It has no real economic effects", "It increases the real burden of fixed-nominal debt, prompting spending cuts that deepen the downturn", "It always leads directly to hyperinflation"], correct:1,
    exp:"Falling prices raise the real burden of existing debt, prompting cuts that can deepen a contraction." },

  { cat:"Business Cycles", concept:"Measuring Inflation",
    q:"A fixed-basket (Laspeyres) price index generally tends to:",
    opts:["Understate true inflation","Overstate true inflation, due to substitution, quality, and new product biases","Have no systematic bias"], correct:1,
    exp:"All three biases push the same direction — a fixed-basket index generally overstates true inflation." },
  { cat:"Business Cycles", concept:"Measuring Inflation",
    q:"A basket has 30 units of Good A (price rises from $4 to $5) and 20 units of Good B (price stays at $6). What is the price index (base=100)?",
    opts:["112.5","125.0","108.3"], correct:0,
    exp:"Base value = 30(4)+20(6) = 240. Current value = 30(5)+20(6) = 270. Index = (270/240)×100 = 112.5." },

  { cat:"Business Cycles", concept:"Cost-Push vs. Demand-Pull",
    q:"Wages grow 6% while productivity grows only 2%. This combination signals:",
    opts:["Rising unit labor costs, a cost-push inflation pressure", "Falling unit labor costs", "No effect on inflation"], correct:0,
    exp:"When compensation growth outpaces productivity growth, unit labor costs rise — a cost-push signal." },
  { cat:"Business Cycles", concept:"Cost-Push vs. Demand-Pull",
    q:"Demand-pull inflation is most closely associated with:",
    opts:["Actual GDP running close to or above potential GDP, creating bottlenecks", "Falling wages across the economy", "A shrinking money supply"], correct:0,
    exp:"As output approaches or exceeds potential GDP, capacity constraints create demand-pull pressure." },

  { cat:"Business Cycles", concept:"Leading, Coincident & Lagging Indicators",
    q:"The yield curve spread (long-term minus short-term rates) is classified as which type of indicator?",
    opts:["Leading","Coincident","Lagging"], correct:0,
    exp:"The yield curve reflects forward-looking expectations, making it a classic leading indicator." },
  { cat:"Business Cycles", concept:"Leading, Coincident & Lagging Indicators",
    q:"Industrial production and non-agricultural employment are examples of:",
    opts:["Leading indicators","Coincident indicators","Lagging indicators"], correct:1,
    exp:"These series move in step with the broader economy, making them coincident indicators." },

  { cat:"Business Cycles", concept:"Theories of the Business Cycle",
    q:"Real Business Cycle (RBC) theory attributes fluctuations primarily to:",
    opts:["Shifts in aggregate supply, like technology or input price changes", "Shifts in aggregate demand from consumer confidence", "Changes in the unemployment rate alone"], correct:0,
    exp:"RBC theory is a supply-side explanation — fluctuations stem from AS shifts, with minimal need for intervention." },
  { cat:"Business Cycles", concept:"Theories of the Business Cycle",
    q:"An economist argues a recession is best fixed with active fiscal stimulus to restore full employment. This aligns with:",
    opts:["Real Business Cycle theory","Keynesian theory","Monetarist theory"], correct:1,
    exp:"Advocating active intervention to restore full employment is the defining Keynesian position." },

  // ========== MODULE E5: Monetary and Fiscal Policy (8 concepts x 2 = 16) ==========
  { cat:"Monetary & Fiscal Policy", concept:"Monetary vs. Fiscal Policy",
    q:"A central bank raises its policy interest rate to cool an overheating economy. Is this monetary or fiscal policy?",
    opts:["Monetary policy","Fiscal policy"], correct:0,
    exp:"Actions by a central bank influencing money and credit conditions are monetary policy." },
  { cat:"Monetary & Fiscal Policy", concept:"Monetary vs. Fiscal Policy",
    q:"Which is a distinguishing feature of fiscal policy, not shared by monetary policy?",
    opts:["It can be used to redistribute income and wealth","It affects the overall economy","It is set by unelected officials only"], correct:0,
    exp:"Fiscal policy, through taxation and spending, can deliberately redistribute income and wealth." },

  { cat:"Monetary & Fiscal Policy", concept:"Functions & Definitions of Money",
    q:"Which of the following is NOT one of the three classic functions of money?",
    opts:["Medium of exchange","Unit of account","Guarantee of future economic growth"], correct:2,
    exp:"The three functions are medium of exchange, store of wealth, and unit of account." },
  { cat:"Monetary & Fiscal Policy", concept:"Functions & Definitions of Money",
    q:"Broad money, compared to narrow money, includes:",
    opts:["Only physical notes and coins","Narrow money plus a wider range of liquid assets usable for purchases","Only central bank reserves"], correct:1,
    exp:"Broad money encompasses narrow money plus a wider range of liquid assets like savings accounts." },

  { cat:"Monetary & Fiscal Policy", concept:"The Money Creation Process",
    q:"A bank receives a $250 deposit with a 20% reserve requirement. How much can it lend out?",
    opts:["$250","$200","$50"], correct:1,
    exp:"The bank keeps 20% ($50) as reserves and lends the remaining 80% ($200)." },
  { cat:"Monetary & Fiscal Policy", concept:"The Money Creation Process",
    q:"With a 25% reserve requirement, how much total money can be created from an initial $150 deposit?",
    opts:["$600","$450","$187.50"], correct:0,
    exp:"Total money = Deposit/Reserve requirement = $150/0.25 = $600." },

  { cat:"Monetary & Fiscal Policy", concept:"The Quantity Theory of Money",
    q:"The quantity equation of exchange is:",
    opts:["M × V = P × Y","M + V = P + Y","M / V = P / Y"], correct:0,
    exp:"M×V=P×Y: quantity of money times velocity equals price level times real output." },
  { cat:"Monetary & Fiscal Policy", concept:"The Quantity Theory of Money",
    q:"Economists who believe money supply growth directly drives inflation are called:",
    opts:["Keynesians","Monetarists","Behavioralists"], correct:1,
    exp:"Monetarists hold that a causal relationship runs from money supply growth to inflation." },

  { cat:"Monetary & Fiscal Policy", concept:"The Demand for Money",
    q:"Which motive for holding money is most sensitive to changes in interest rates?",
    opts:["Transactions-related demand","Precautionary demand","Speculative demand"], correct:2,
    exp:"Speculative demand reflects the opportunity cost of holding cash versus interest-bearing assets." },
  { cat:"Monetary & Fiscal Policy", concept:"The Demand for Money",
    q:"Interest rates on bonds rise sharply. What happens to the speculative demand for money?",
    opts:["It falls, since holding cash means giving up more return", "It rises, since bonds are now more attractive", "It is unaffected"], correct:0,
    exp:"As bond returns rise, the opportunity cost of holding cash rises too, reducing speculative money demand." },

  { cat:"Monetary & Fiscal Policy", concept:"Money Market Equilibrium",
    q:"In the money market, the money supply curve (MS) is typically drawn as:",
    opts:["Upward sloping","Vertical","Horizontal"], correct:1,
    exp:"MS is vertical because the nominal quantity of money at any moment is treated as fixed." },
  { cat:"Monetary & Fiscal Policy", concept:"Money Market Equilibrium",
    q:"The nominal interest rate sits below the money market's equilibrium rate. What is happening?",
    opts:["Excess demand for money, pushing rates up toward equilibrium", "Excess supply of money, pushing rates down further", "The market is already in equilibrium"], correct:0,
    exp:"Below equilibrium, money demand exceeds supply; people sell bonds to raise cash, pushing rates up." },

  { cat:"Monetary & Fiscal Policy", concept:"The Fisher Effect",
    q:"Investors require a 3.5% real return, with expected inflation of 2.8%. What nominal rate should they demand?",
    opts:["0.7%","6.3%","9.8%"], correct:1,
    exp:"Rnom = Rreal + πe = 3.5% + 2.8% = 6.3%." },
  { cat:"Monetary & Fiscal Policy", concept:"The Fisher Effect",
    q:"The Fisher effect relies on money neutrality, which holds that in the long run, money supply changes affect:",
    opts:["Only nominal variables, not real variables like the real interest rate", "Only real variables", "Neither real nor nominal variables"], correct:0,
    exp:"Money neutrality holds that money supply changes affect nominal prices but leave real variables unchanged long-run." },

  { cat:"Monetary & Fiscal Policy", concept:"The Costs of Inflation",
    q:"When actual inflation comes in unexpectedly HIGH, who benefits and who is hurt?",
    opts:["Borrowers benefit; lenders are hurt","Lenders benefit; borrowers are hurt","Neither party is affected"], correct:0,
    exp:"Higher-than-expected inflation erodes the real value of fixed nominal debt, benefiting the borrower." },
  { cat:"Monetary & Fiscal Policy", concept:"The Costs of Inflation",
    q:"Which type of inflation is generally considered most economically costly?",
    opts:["Expected inflation, since it's fully anticipated", "Unexpected inflation, since it redistributes wealth and distorts price signals", "Zero inflation"], correct:1,
    exp:"Unexpected inflation can't be planned for and redistributes real wealth unpredictably between borrowers and lenders." },

  // ========== MODULE E6: International Trade and Capital Flows (8 concepts x 2 = 16) ==========
  { cat:"International Trade & Capital Flows", concept:"GDP vs. GNP & Basic Terms",
    q:"A US-owned factory operates in Vietnam. This factory's output counts toward:",
    opts:["Vietnam's GDP and the US's GNP","The US's GDP and Vietnam's GNP","Neither country's GDP or GNP"], correct:0,
    exp:"GDP is location-based (Vietnam), while GNP is ownership-based (US)." },
  { cat:"International Trade & Capital Flows", concept:"GDP vs. GNP & Basic Terms",
    q:"If a country's exports exceed its imports, it has a:",
    opts:["Trade deficit","Trade surplus","Balanced trade position"], correct:1,
    exp:"Exports greater than imports is the definition of a trade surplus." },

  { cat:"International Trade & Capital Flows", concept:"Patterns & Trends in Trade",
    q:"A US pension fund buys shares of a French company on the French exchange, with no intention of controlling it. This is:",
    opts:["Foreign direct investment (FDI)","Foreign portfolio investment (FPI)","A current account transfer"], correct:1,
    exp:"A shorter-term investment in foreign financial instruments without operational control is FPI." },
  { cat:"International Trade & Capital Flows", concept:"Patterns & Trends in Trade",
    q:"A company building and operating its own factory in another country, with full operational control, is engaging in:",
    opts:["Foreign portfolio investment (FPI)","Foreign direct investment (FDI)","A unilateral transfer"], correct:1,
    exp:"Direct investment in productive assets with operational control is FDI, making the firm a multinational corporation." },

  { cat:"International Trade & Capital Flows", concept:"Absolute vs. Comparative Advantage",
    q:"Worker output: Country X makes 25 shirts or 5 hats per day; Country Y makes 15 shirts or 5 hats per day. Which country has the comparative advantage in hats?",
    opts:["Country X","Country Y","Neither, they are identical"], correct:1,
    exp:"X's opp. cost per hat = 25/5=5 shirts. Y's = 15/5=3 shirts. Y's lower cost gives it the comparative advantage in hats." },
  { cat:"International Trade & Capital Flows", concept:"Absolute vs. Comparative Advantage",
    q:"Even if one country has an absolute advantage in producing every good, can both countries still gain from trade?",
    opts:["No, only the more efficient country benefits", "Yes, as long as each country has a comparative advantage in something", "Only with identical technology"], correct:1,
    exp:"Comparative advantage guarantees mutual gains from trade even when one country is more efficient at everything, as long as opportunity costs differ." },

  { cat:"International Trade & Capital Flows", concept:"The Gains from Trade",
    q:"Two countries' autarkic prices for a good are 6 and 14. Which world price allows both to gain from trade?",
    opts:["5","10","15"], correct:1,
    exp:"Any world price strictly between the two autarkic prices (6 and 14) allows mutual gains; 10 falls within that range." },
  { cat:"International Trade & Capital Flows", concept:"The Gains from Trade",
    q:"The further a world price sits from a country's own autarkic price, the:",
    opts:["Less that country gains from trade","More that country gains from trade","Gains are unrelated to the world price"], correct:1,
    exp:"A world price further from a country's own autarkic price means a bigger gap between what it pays/receives and its own opportunity cost — a bigger gain." },

  { cat:"International Trade & Capital Flows", concept:"The Ricardian Model",
    q:"In the Ricardian model of trade, comparative advantage arises from differences in:",
    opts:["Relative capital and labor endowments","Labor productivity, reflecting differences in technology","Government trade policy alone"], correct:1,
    exp:"With labor as the only variable factor, technology-driven labor productivity differences are the sole source of comparative advantage." },
  { cat:"International Trade & Capital Flows", concept:"The Ricardian Model",
    q:"A country's comparative advantage in the Ricardian model is:",
    opts:["Permanent and unchangeable","Subject to change as technology gaps close or shift", "Determined only by natural resources"], correct:1,
    exp:"Comparative advantage in the Ricardian model can shift over time as relative technology changes." },

  { cat:"International Trade & Capital Flows", concept:"The Heckscher–Ohlin Model",
    q:"According to the Heckscher–Ohlin model, a labor-abundant country would be expected to:",
    opts:["Export labor-intensive goods and import capital-intensive goods", "Export capital-intensive goods and import labor-intensive goods", "Export and import identical baskets"], correct:0,
    exp:"A country specializes in and exports goods intensive in the factor it holds abundantly." },
  { cat:"International Trade & Capital Flows", concept:"The Heckscher–Ohlin Model",
    q:"Which model allows trade to redistribute income within a country, benefiting the abundant factor and hurting the scarce one?",
    opts:["The Ricardian model","The Heckscher–Ohlin model","Neither model"], correct:1,
    exp:"With two factors of production, Heckscher–Ohlin allows relative factor prices to shift with trade, creating winners and losers." },

  { cat:"International Trade & Capital Flows", concept:"BOP Components",
    q:"A worker sends money home to family abroad as a remittance. This is recorded in the BOP under:",
    opts:["Merchandise trade","Unilateral transfers","The financial account"], correct:1,
    exp:"A one-way transfer with nothing given in exchange belongs in unilateral transfers within the current account." },
  { cat:"International Trade & Capital Flows", concept:"BOP Components",
    q:"The financial account of the balance of payments records:",
    opts:["Physical goods bought and sold across borders", "A country's financial assets abroad and foreign-owned assets domestically", "Tourism and transportation services only"], correct:1,
    exp:"The financial account tracks investment flows — assets held abroad and domestic assets held by foreigners." },

  { cat:"International Trade & Capital Flows", concept:"The National Income Identity",
    q:"A country's GDP (Y) is $750B, with C+I+G totaling $725B. What is its current account balance?",
    opts:["A $25B surplus","A $25B deficit","Exactly balanced"], correct:0,
    exp:"CA = Y − (C+I+G) = 750 − 725 = $25B, a surplus." },
  { cat:"International Trade & Capital Flows", concept:"The National Income Identity",
    q:"A country running a persistent current account deficit is, in effect:",
    opts:["Lending its surplus savings abroad", "Importing present consumption, financed by borrowing from abroad", "Completely self-sufficient"], correct:1,
    exp:"A current account deficit means a country consumes more than it produces, financed by borrowing from abroad." },

  // ========== MODULE E7: Currency Exchange Rates (6 concepts x 2 = 12) ==========
  { cat:"Currency Exchange Rates", concept:"Size & Importance",
    q:"By daily turnover, the foreign exchange market is:",
    opts:["Smaller than global equity markets","The largest financial market in the world","About the same size as global bond markets"], correct:1,
    exp:"At roughly $5.1 trillion daily, FX is by far the world's largest financial market." },
  { cat:"Currency Exchange Rates", concept:"Size & Importance",
    q:"An investor holds only domestic stocks, never buying foreign securities. Is this investor exposed to FX movements?",
    opts:["No, direct foreign holdings are required for any exposure", "Yes, indirectly, through foreign revenue and competition faced by domestic companies", "Only if the investor also holds bonds"], correct:1,
    exp:"Domestic companies often earn significant foreign revenue and compete globally, creating indirect FX exposure." },

  { cat:"Currency Exchange Rates", concept:"Nominal & Real Exchange Rates",
    q:"The real exchange rate differs from the nominal rate because it:",
    opts:["Ignores inflation entirely", "Adjusts for relative price levels, capturing true purchasing power", "Is always identical to the nominal rate"], correct:1,
    exp:"The real exchange rate multiplies the nominal rate by the price level ratio, capturing true purchasing power." },
  { cat:"Currency Exchange Rates", concept:"Nominal & Real Exchange Rates",
    q:"When a currency buys MORE of another currency than before, it has:",
    opts:["Depreciated","Appreciated","Defaulted"], correct:1,
    exp:"A currency that can purchase more of another currency has appreciated." },

  { cat:"Currency Exchange Rates", concept:"Spot, Forward & FX Swaps",
    q:"A spot foreign exchange transaction typically settles:",
    opts:["Immediately, with no delay","About two business days after the trade (T+2)","Exactly one year after the trade"], correct:1,
    exp:"Spot transactions for most currencies settle on a T+2 basis." },
  { cat:"Currency Exchange Rates", concept:"Spot, Forward & FX Swaps",
    q:"An FX swap is best described as:",
    opts:["A single spot transaction only", "A spot transaction combined with an offsetting forward transaction", "A type of currency option"], correct:1,
    exp:"An FX swap combines a spot transaction with an offsetting forward, often used to roll a position to a new date." },

  { cat:"Currency Exchange Rates", concept:"Hedging a Foreign Investment",
    q:"In a hedged foreign bond strategy, what specifically eliminates the investor's currency risk?",
    opts:["The fact that the bond is risk-free", "Locking in the conversion rate today via a forward contract", "Choosing a one-year maturity"], correct:1,
    exp:"The forward contract removes uncertainty about the future spot rate, which is the actual source of currency risk." },
  { cat:"Currency Exchange Rates", concept:"Hedging a Foreign Investment",
    q:"Spot rate 0.20, foreign interest rate 3%, forward rate 0.205. Approximately what is the domestic-currency return?",
    opts:["About 3%","About 5.6%","About 10%"], correct:1,
    exp:"(1/0.20)×1.03×0.205 − 1 = 5×1.03×0.205−1 = 1.05575−1 ≈ 5.6%." },

  { cat:"Currency Exchange Rates", concept:"% Change in Currency Value",
    q:"The GBP/USD rate moves from 1.4000 to 1.3300. What is the approximate percentage change?",
    opts:["−5.0%","−7.0%","+5.0%"], correct:0,
    exp:"%Δ = (1.3300−1.4000)/1.4000 = −0.0700/1.4000 = −5.0%." },
  { cat:"Currency Exchange Rates", concept:"% Change in Currency Value",
    q:"If Currency A depreciates 10% against Currency B, what appreciation in B fully reverses the move?",
    opts:["Exactly 10%","Approximately 11.1%","Exactly 20%"], correct:1,
    exp:"Percentage changes use different bases, so reversing a 10% depreciation requires roughly 11.1% appreciation." },

  { cat:"Currency Exchange Rates", concept:"The Elasticities Approach",
    q:"The Marshall-Lerner condition addresses:",
    opts:["Whether a currency devaluation will improve a country's trade balance", "How central banks set interest rates", "How GDP is calculated"], correct:0,
    exp:"Marshall-Lerner specifies when a devaluation moves the trade balance toward surplus, based on demand elasticities." },
  { cat:"Currency Exchange Rates", concept:"The Elasticities Approach",
    q:"Export share ωX=0.4, export elasticity εX=1.3, import elasticity εM=0.7. Does the Marshall-Lerner condition hold?",
    opts:["Yes, 0.34 > 0","No, the value is negative","Cannot be determined"], correct:0,
    exp:"0.4(1.3) + 0.6(0.7−1) = 0.52 − 0.18 = 0.34 > 0 — the condition holds." },
];

/* ============================================================
   Quiz engine — shuffled order, category tags, breakdown by module
   ============================================================ */
(function(){
  const shell = document.getElementById('quizShell');
  if (!shell) return;

  function shuffle(arr){
    const a = [...arr];
    for (let i=a.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  let order = shuffle(QUIZ);
  let current = 0;
  let score = 0;
  let answered = new Array(order.length).fill(null);
  const categories = [...new Set(QUIZ.map(q=>q.cat))];
  const catScores = {};
  categories.forEach(c => catScores[c] = {correct:0, total:0});

  function renderIntro(){
    shell.innerHTML = `
      <div style="text-align:center; padding:20px 0;">
        <p style="color:var(--ink-soft); margin-bottom:20px;">${order.length} questions, shuffled — 2 per concept, across all 9 modules, for a genuinely reliable readiness read. One attempt per question, with an explanation after each.</p>
        <button class="start-btn" id="startBtn">Start the Final Review →</button>
      </div>`;
    document.getElementById('startBtn').addEventListener('click', () => { renderQuestion(); });
  }

  function renderQuestion(){
    const item = order[current];
    let html = `<div class="cat-tag">${item.cat} · ${item.concept}</div>`;
    html += `<div class="quiz-progress">Question ${current+1} of ${order.length} &nbsp;·&nbsp; Score so far: ${score}</div>`;
    html += `<div class="quiz-q">${item.q}</div>`;
    html += `<div class="opt-list" id="quizOpts">`;
    item.opts.forEach((opt, i) => {
      html += `<button class="opt-btn" data-i="${i}">${opt}</button>`;
    });
    html += `</div>`;
    html += `<div class="quiz-explain" id="quizExplain">${item.exp}</div>`;
    html += `<div class="quiz-nav">
      <button class="btn ghost" id="quizPrev" ${current===0 ? 'disabled' : ''}>← Previous</button>
      <button class="btn" id="quizNext" disabled>${current === order.length-1 ? 'See final score' : 'Next →'}</button>
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
        const isCorrect = i === item.correct;
        if (isCorrect) score++;
        catScores[item.cat].total++;
        if (isCorrect) catScores[item.cat].correct++;
        if (typeof cfaRecordAnswer === 'function' && item.concept){
          cfaRecordAnswer(item.concept, item.cat, isCorrect);
        }
        opts.forEach(b => {
          b.disabled = true;
          const bi = +b.dataset.i;
          if (bi === item.correct) b.classList.add('correct');
          else if (bi === i) b.classList.add('incorrect');
        });
        explain.classList.add('show');
        nextBtn.disabled = false;
      });
    });

    nextBtn.addEventListener('click', () => {
      if (current < order.length - 1){ current++; renderQuestion(); }
      else { renderScore(); }
    });
    prevBtn.addEventListener('click', () => {
      if (current > 0){ current--; renderQuestion(); }
    });
  }

  function renderScore(){
    const pct = Math.round((score / order.length) * 100);
    let msg = "Solid overall foundation — use the breakdown below to see exactly which modules to revisit.";
    if (pct >= 90) msg = "Excellent — you've genuinely internalized the full curriculum.";
    else if (pct >= 70) msg = "Good work — a few gaps worth revisiting, shown below.";

    let breakdownHTML = '<div class="cat-breakdown">';
    categories.forEach(cat => {
      const cs = catScores[cat];
      const catPct = cs.total > 0 ? Math.round((cs.correct/cs.total)*100) : 0;
      breakdownHTML += `
        <div class="cat-row">
          <div class="name">${cat}</div>
          <div class="track"><div class="fill" style="width:${catPct}%;"></div></div>
          <div class="score">${cs.correct}/${cs.total}</div>
        </div>`;
    });
    breakdownHTML += '</div>';

    shell.innerHTML = `
      <div class="quiz-score">
        <div style="font-family:var(--font-mono); font-size:.8rem; color:var(--ink-soft); text-transform:uppercase; letter-spacing:.08em;">Final score</div>
        <div class="big">${score} / ${order.length}</div>
        <p style="max-width:52ch; margin:10px auto 6px; color:var(--ink-soft);">${msg}</p>
      </div>
      <h3 style="font-family:var(--font-mono); font-size:.8rem; text-transform:uppercase; letter-spacing:.05em; color:var(--indigo); margin:24px 0 4px;">Score by module</h3>
      ${breakdownHTML}
      <div style="text-align:center; margin-top:24px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn" id="quizRestart">Retake (new shuffled order)</button>
        <a href="../readiness/index.html" class="btn ghost" style="text-decoration:none; display:inline-flex; align-items:center;">See full readiness dashboard →</a>
      </div>`;
    document.getElementById('quizRestart').addEventListener('click', () => {
      order = shuffle(QUIZ);
      current = 0; score = 0;
      answered = new Array(order.length).fill(null);
      categories.forEach(c => { catScores[c] = {correct:0, total:0}; });
      renderQuestion();
    });
  }

  renderIntro();
})();
