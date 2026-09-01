export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudySection {
  title: string;
  content: string[];
}

export interface ExecutionItem {
  title: string;
  description: string[];
}

export interface CaseStudy {
  slug: string;
  company: string;
  role: string;
  title: string;
  subtitle: string;
  thumbnail?: string;
  highlightMetrics: CaseStudyMetric[]; // For card display (2-3 key metrics)
  context: string[];
  problem: string[];
  strategy: string[];
  execution: ExecutionItem[];
  results: CaseStudyMetric[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "lomita-investment-memo-agent",
    company: "Lomita AI",
    role: "Founder",
    title: "Automating Investment Memo Prep with AI Agents",
    subtitle: "Turning raw GP data rooms into validated, audit-ready investment analysis with a multi-agent workflow.",
    highlightMetrics: [
      { label: "Memo Prep Time", before: "4+ days", after: "~30 min" },
      { label: "Cost per Run", before: "Days of analyst time", after: "<$15" },
      { label: "Data Accuracy", before: "Unverified", after: ">99%" },
    ],
    context: [
      "Through Lomita AI, I partnered with Selby Lane Capital, a fund-of-funds investor whose diligence process centered on a standardized \"Master Template\" workbook: one row per portfolio investment across every fund a GP has raised, plus fund-level performance data and a battery of quantitative analyses.",
      "Building that workbook was entirely manual. Analysts combed through raw GP data rooms—Excel files and PDFs with inconsistent layouts, multi-row headers, and operating metrics scattered across dozens of columns—then hand-built the analysis on top. It took 4+ days of skilled analyst time per GP, and a single silent error (like a row offset mapping every company to its neighbor's data) could undermine the whole memo.",
    ],
    problem: [
      "Investment memo prep was slow, error-prone, and impossible to fully trust.",
      "Every GP data room had a different structure—no two extractions were the same",
      "Manual data entry introduced silent errors that were hard to catch downstream",
      "Analysts spent their time transcribing numbers instead of forming investment judgment",
      "Verifying the final workbook against source files was as much work as building it",
      "The team needed diligence-grade accuracy—every number traceable to a source document—at a fraction of the time cost.",
    ],
    strategy: [
      "I designed the system around a core principle: AI does the tedious work, adversarial AI checks it, and humans stay in the loop at the decision points.",
      "Divide and specialize — Break the workflow into narrow, single-purpose agents (extract, validate, fix, analyze) instead of one monolithic prompt.",
      "Trust through adversarial validation — Every extraction is independently re-checked against the source files by a separate QA agent, with fix loops until the data is clean.",
      "Human review at checkpoints, not everywhere — The investor reviews the workbook at two defined milestones rather than babysitting the whole run.",
    ],
    execution: [
      {
        title: "Standardizing the Data Model",
        description: [
          "Before any automation, we needed a rigorous target schema.",
          "Defined a Master sheet schema: one row per investment with entry/exit dates, invested capital, proceeds, IRR, MOIC, and detailed operating metrics",
          "Defined a Fund Performance schema: one row per fund vintage with net returns and DPI",
          "Codified the team's data rules—value splits, currency conventions, edge-case handling—so every workbook comes out identical regardless of the GP's source format",
        ],
      },
      {
        title: "Multi-Agent Extraction and Validation",
        description: [
          "The heart of the system is a three-phase workflow of ten specialized agents.",
          "Extraction agents read the raw data room and build the base workbook",
          "Adversarial validator agents independently re-read the source files and cross-check every number, producing a structured issues list",
          "A fixer agent corrects discrepancies by going back to the source data, then the validator re-checks—looping until the data is clean",
          "Human review checkpoints gate each phase, so the investor signs off before analysis is built on top",
        ],
      },
      {
        title: "Automated Quantitative Analysis",
        description: [
          "Once the data is validated, the workflow generates the full analytical package automatically.",
          "14 analysis modules produce 20+ workbook tabs: MOIC distributions, sector and region breakdowns, partner attribution, value creation bridges, and more",
          "Fund scorecards benchmark performance against Cambridge Associates top-quartile data by strategy and vintage",
          "Every tab is formatted in the firm's house style, ready to drop into a memo",
        ],
      },
      {
        title: "A System That Improves Itself",
        description: [
          "Each run makes the next one better.",
          "A run logger tracks every phase, validation error, and fix cycle for a complete audit trail",
          "After each run, a post-run analyst agent categorizes all errors, identifies systemic patterns, and suggests concrete improvements to the workflow",
          "This feedback loop turned one-off automation into a compounding asset",
        ],
      },
    ],
    results: [
      { label: "Memo Prep Time", before: "4+ days", after: "~30 min" },
      { label: "Cost per Run", before: "Days of analyst time", after: "<$15" },
      { label: "Data Accuracy", before: "Unverified", after: ">99%" },
    ],
    featured: true,
  },
  {
    slug: "lomita-made-by-marge-gifting",
    company: "Lomita AI",
    role: "Founder",
    title: "Building a B2B Gifting Platform for Made by Marge",
    subtitle: "A custom, Shopify-integrated web app that opened an entirely new sales channel for a fast-growing cookie-dough brand.",
    highlightMetrics: [
      { label: "New Channel Revenue", before: "$0", after: ">$5,000" },
      { label: "Bulk Ordering", before: "One by one", after: "One CSV upload" },
      { label: "Gift Subscriptions", before: "Manual tracking", after: "Automatic" },
    ],
    context: [
      "Made by Marge sells fresh-baked cookie dough direct to consumers. Margaret wanted to grow beyond her existing channels and reach businesses—opening a B2B gifting motion where a company could send cookie dough to its people at scale.",
      "The problem was operational. Placing dozens or hundreds of orders by hand, tracking recurring gifts, and keeping it all in sync with her store simply wasn't feasible manually. She needed software that made bulk and recurring gifting effortless, and that plugged straight into the Shopify system she already runs on.",
    ],
    problem: [
      "A promising sales channel was locked behind manual operations.",
      "Bulk orders meant placing dozens or hundreds of Shopify orders one at a time",
      "Recurring gifts—like employee birthdays—required tracking every recipient and date by hand",
      "Any workaround outside Shopify would create a parallel process to maintain and reconcile",
      "Without software, the B2B gifting motion couldn't exist at all.",
    ],
    strategy: [
      "Instead of a generic storefront, we built the exact workflow her new buyers needed.",
      "Make bulk and recurring effortless — One CSV upload should turn into many orders, shipped on schedule.",
      "Integrate natively — Orders had to flow into the Shopify order-management system she already runs, with no parallel process.",
      "Position for gifting audiences — Design the product around HR, client relations, investor relations, and individual gifters.",
    ],
    execution: [
      {
        title: "Batch Subscriptions from a CSV",
        description: [
          "The core flow turns a spreadsheet into a gifting program.",
          "A business uploads a list of recipients and dates—such as employees and their birthdays",
          "The app automatically creates a subscription for each recipient, scheduled to send on the right day",
          "Recurring gifts ship on birthdays and key dates, automatically",
        ],
      },
      {
        title: "Bulk One-Time Orders",
        description: [
          "For one-off occasions, the same upload flow places everything at once.",
          "Need to send dough to every client who closed last month? Upload the list and the app places all the orders as a single flow",
          "No more copying orders into Shopify one at a time",
        ],
      },
      {
        title: "Native Shopify Integration",
        description: [
          "The app creates the batch orders programmatically inside her Shopify store.",
          "Everything is fulfilled and tracked through her existing order-management system",
          "No parallel process to maintain—the gifting platform and the store stay in sync by construction",
        ],
      },
      {
        title: "Positioned for New Audiences",
        description: [
          "The product was designed around the buyers the new channel would serve.",
          "HR and people teams: employee birthday and milestone gifting on autopilot",
          "Client and investor relations: thoughtful gifts to clients, portfolio companies, and investors",
          "Individual gifters: subscription gifts for friends and family on recurring occasions",
        ],
      },
    ],
    results: [
      { label: "New Channel Revenue", before: "$0", after: ">$5,000" },
      { label: "Bulk Ordering", before: "One by one", after: "One CSV upload" },
      { label: "Gift Subscriptions", before: "Manual tracking", after: "Automatic" },
    ],
    featured: true,
  },
  {
    slug: "dimo-mainstream-adoption",
    company: "DIMO",
    role: "First Product Hire",
    title: "Driving Mainstream Adoption at DIMO",
    subtitle: "Transforming a crypto-native product into a mainstream car ownership platform",
    highlightMetrics: [
      { label: "MAU Growth", before: "15k", after: "133k" },
      { label: "PMF Score", before: "37%", after: "72%" },
      { label: "Feature Adoption", before: "5%", after: "69%" },
    ],
    context: [
      "When I joined DIMO as the first product hire, the product had strong early traction (~15k MAU), but almost entirely within a crypto-native audience. DIMO was originally launched as a DePIN project, and most users engaged primarily to monitor token rewards—not to manage or understand their vehicles.",
      "Customer interviews and product analytics showed that while this audience was engaged, it represented a growth ceiling. At the same time, crypto-forward UX decisions—particularly our wallet-based account system—created significant friction and eroded trust for mainstream car owners.",
    ],
    problem: [
      "DIMO's core product experience was misaligned with its growth ambition.",
      "Users came for tokens, not vehicle insights",
      "Vehicle analytics lacked product-market fit (only ~5% of sessions engaged)",
      "Crypto-native onboarding created extreme friction:",
      "~10 minutes to sign up",
      "~2 minutes to sign in",
      "The \"average commuter\" persona actively distrusted crypto-heavy experiences",
      "To grow meaningfully, we needed to break out of the crypto niche and build a product that delivered clear, everyday value to mainstream car owners.",
    ],
    strategy: [
      "I led a two-pronged strategy to reposition DIMO for mainstream adoption:",
      "Remove friction at the front door — Deliver a best-in-class authentication experience without sacrificing self-custody.",
      "Refocus the product around real car-owner needs — Ground strategy in deep customer research and behavioral data.",
    ],
    execution: [
      {
        title: "Rebuilding the Account System",
        description: [
          "The first priority was fixing onboarding. The existing wallet-based system was a hard blocker for mainstream users.",
          "Designed and shipped a new smart-wallet architecture using passkeys and email authentication",
          "Built on ZeroDev and Turnkey infrastructure to preserve self-custody while dramatically simplifying UX",
          "Reduced signup time from 10 minutes → 1.1 minutes",
          "Reduced sign-in time from 2 minutes → 11 seconds",
          "This change alone unlocked mainstream adoption and drove rapid user growth. We increased our MAU from 15k to 133k in the months following this release.",
        ],
      },
      {
        title: "Re-defining \"Smart Car Ownership\"",
        description: [
          "With friction removed, we focused on value.",
          "Through user interviews and behavioral analysis, we refined the product's core promise around three jobs-to-be-done:",
          "Know and control the status of your car",
          "Extend the lifespan and value of your vehicle",
          "Save money on ownership",
          "This became the north star for all roadmap decisions.",
        ],
      },
      {
        title: "Fixing Trust Through Data Quality",
        description: [
          "A major blocker to adoption was trust.",
          "~75% of users interviewed reported at least one data accuracy issue",
          "I built a structured triage process with Customer Support to:",
          "Identify root causes systematically",
          "Route issues to the correct engineering or data pipeline owners",
          "Eliminate ad-hoc, distracting escalations",
          "This significantly improved data reliability and user confidence. We saw tickets per WAU drop from 4% to 1.3%.",
        ],
      },
      {
        title: "Shipping Features That Mattered",
        description: [
          "Over two quarters, we reworked the app around the three strategic pillars above. Key launches included:",
          "AI-powered error code detection to proactively surface car issues",
          "Charging and battery health insights to reduce EV ownership costs",
          "Fuel efficiency tracking with historical trends and cost drivers",
          "Driving benchmarks to contextualize behavior over time and vs peers",
          "AI Vehicle Genius, giving users an on-demand car expert in their pocket",
          "Each feature was explicitly tied to a real ownership pain point—not novelty.",
        ],
      },
    ],
    results: [
      { label: "MAU Growth", before: "15k", after: "133k" },
      { label: "Vehicle Insights Adoption", before: "5%", after: "69%" },
      { label: "PMF Score", before: "37%", after: "72%" },
      { label: "WAU / MAU", before: "66%", after: "85%" },
      { label: "Signup Time", before: "10 min", after: "1.1 min" },
      { label: "Sign-in Time", before: "2 min", after: "11 sec" },
    ],
    featured: true,
  },
  {
    slug: "dimo-business-model",
    company: "DIMO",
    role: "First Product Hire",
    title: "Building a Sustainable Business Model at DIMO",
    subtitle: "Transforming a free product with poor unit economics into a profitable subscription business with 90% retention.",
    highlightMetrics: [
      { label: "6mo Retention", before: "<10%", after: "90%" },
      { label: "Feature Adoption", before: "28%", after: "91%" },
      { label: "Revenue", before: "$0", after: "$2.2M" },
    ],
    context: [
      "After successfully breaking out of the crypto niche and tapping into the mainstream car-owner audience, DIMO had started attracting the right userbase. However, the business model hadn't evolved with the product—we weren't charging anything, which meant we were burning money on every incremental customer.",
      "At the time, we relied on the Smartcar API to connect to users' vehicles. This created significant limitations: the data quality was insufficient to power meaningful vehicle analytics, and accuracy issues were common. Without reliable data, we couldn't deliver the kind of delightful, valuable experience that would justify a paid product.",
      "We needed to solve two problems at once: find a way to dramatically improve data quality AND build a sustainable business model with real unit economics.",
    ],
    problem: [
      "DIMO had a product problem and a business model problem.",
      "No revenue: giving away the product for free with no path to monetization",
      "Poor data quality: Smartcar API couldn't deliver the depth of vehicle data needed",
      "Low engagement: only 28% of sessions used vehicle analytics features",
      "Terrible retention: less than 10% of users retained after 6 months",
      "We needed to figure out how to create a truly valuable product experience AND build a sustainable business model that shows revenue and profitability.",
    ],
    strategy: [
      "I led a two-pronged strategy to solve both the product and business model challenges:",
      "Upgrade the data source — Find a hardware solution that could deliver the rich vehicle data needed to create real value for users.",
      "Implement a subscription model — Align our business model with customer value and create sustainable unit economics.",
    ],
    execution: [
      {
        title: "Deep Customer Research",
        description: [
          "Before making any major decisions, I needed to understand what customers really wanted—and what they would pay for.",
          "Conducted extensive customer interviews to identify pain points and willingness to pay",
          "Performed market research on current offerings and pricing models",
          "Focused specifically on OBD2 dongles as a potential solution",
          "Found that competitors successfully used a combo of upfront hardware cost + subscription model.",
        ],
      },
      {
        title: "Identifying the Right Hardware Partner",
        description: [
          "We identified Ruptela, an OBD2 dongle manufacturer that could build devices to our specifications.",
          "Negotiated manufacturing partnership for custom DIMO-spec dongles",
          "Ensured the hardware could deliver the depth of vehicle data we needed",
          "Created a supply chain that could scale with user growth",
          "This hardware upgrade was the foundation for delivering real product value.",
        ],
      },
      {
        title: "Launching the Subscription Model",
        description: [
          "We implemented a $99/year subscription tied to the hardware device.",
          "Cut off free access to align customers with our value proposition",
          "Priced based on competitive research and willingness-to-pay data",
          "Created a clear value exchange: better hardware = better data = better experience",
          "This forced us to find the right customers who truly valued what we offered.",
        ],
      },
      {
        title: "Delivering on the Product Promise",
        description: [
          "With better data from the OBD2 dongles, we could finally deliver meaningful vehicle analytics.",
          "Rebuilt vehicle analytics features around the richer data set",
          "Improved data accuracy and reliability significantly",
          "Created features that users actually engaged with daily",
          "The better data quality led to a dramatically better user experience.",
        ],
      },
    ],
    results: [
      { label: "6mo App Retention", before: "<10%", after: "90%" },
      { label: "WAU / MAU", before: "23%", after: "78%" },
      { label: "Feature Adoption", before: "28%", after: "91%" },
      { label: "Revenue", before: "$0", after: "$2.2M" },
      { label: "DAU / MAU", before: "4%", after: "41%" },
      { label: "Revenue per User", before: "$0", after: "$99/yr" },
    ],
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}
