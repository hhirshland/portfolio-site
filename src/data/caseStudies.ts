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
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}
