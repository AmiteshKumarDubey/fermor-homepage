export const COPY = {
  brand: {
    name: "Fermor",
    tagline: "Understand. Act. Grow.",
    heroTitle: "Begin your financial momentum.",
    heroSubhead: "Clarity for every money decision. We show the full arithmetic, run calculations locally in your browser, and never ask you to sign up just to see the math.",
    heroAudience: "Built for young earners and first-time buyers in India making their first major financial decisions (SIP, loans, tax, retirement).",
    trustBadge: "Free. No login wall. Your numbers stay in your browser.",
    ctaPrimary: "Start free",
    ctaSecondary: "See how the math works",
    madeInIndia: "Crafted for India's next generation of earners",
  },
  nav: {
    tools: "Tools",
    guides: "Guides",
    method: "Method",
    principles: "Principles",
    commandHint: "Ctrl K",
    startFree: "Start free",
  },
  playground: {
    title: "Momentum Playground",
    subtitle: "Model your financial target. Watch how regular monthly investments compound alongside inflation.",
    inputs: {
      goalAmount: "Goal Amount (₹)",
      years: "Tenure (Years)",
      expectedReturn: "Expected Annual Return (%)",
      inflationRate: "Inflation Rate (%)",
      startingAmount: "Starting Amount (₹)",
    },
    outputs: {
      requiredSip: "Required Monthly SIP",
      realValueTitle: "What it's worth today",
      totalInvestment: "Principal Invested",
      portfolioValue: "Portfolio value",
      estimatedReturns: "Est. Growth",
      futureNominalValue: "Target Goal",
    },
    showMath: "Show the full math",
    hideMath: "Hide calculation steps",
    copyLink: "Copy link with inputs",
    linkCopied: "Link copied to clipboard!",
    disclaimer: "Illustrative projection, not financial advice. Market returns are not guaranteed. Calculations use annuity-due monthly compounding.",
    exampleTag: "Example projection",
  },
  story: {
    sectionTag: "How Fermor Works",
    heading: "Understand. Act. Grow.",
    subheading: "Finance isn't about guessing. It's about visible mechanics at every stage of your life.",
    chapters: [
      {
        id: "understand",
        number: "01",
        title: "Understand",
        headline: "See loan math before bank paperwork",
        description: "Analyse your exact Equated Monthly Instalment (EMI) split into principal and interest from day one.",
      },
      {
        id: "act",
        number: "02",
        title: "Act",
        headline: "Multiply momentum with Step-Up SIPs",
        description: "Increasing your monthly contribution by just 10% each year drastically shrinks the time to your financial goals.",
      },
      {
        id: "grow",
        number: "03",
        title: "Grow",
        headline: "Track your true net worth",
        description: "Your wealth isn't just your bank account balance—it's what you own minus what you owe.",
      },
    ],
  },
  workingBand: {
    quote: "Most tools give you an answer. We show you the arithmetic.",
    subtitle: "Every calculator on Fermor renders transparent, step-by-step logic directly in your browser. No hidden black-box formulas.",
  },
  lifeStage: {
    title: "Where are you in life?",
    subtitle: "Select your current financial milestone to see the exact questions we solve.",
    stages: [
      {
        id: "first-salary",
        label: "First salary",
        questions: [
          { q: "How much of my in-hand salary should I invest vs spend?", tool: "Salary Take-Home Matrix", featured: true },
          { q: "Which tax regime (Old vs New) leaves me with more cash?", tool: "Income Tax Comparer", featured: false },
          { q: "How do I build a 6-month emergency cushion safely?", tool: "Liquidity & FD Yield Tool", featured: false },
        ],
      },
      {
        id: "buying-home",
        label: "Buying a home",
        questions: [
          { q: "How much down payment can I afford without wiping savings?", tool: "Home Buyer Readiness Assessment", featured: true },
          { q: "Is a 20-year or 15-year home loan better for my cash flow?", tool: "EMI & Interest Optimizer", featured: false },
          { q: "Should I pre-pay loan principal or continue investing in SIPs?", tool: "Prepay vs Invest Simulator", featured: false },
        ],
      },
      {
        id: "starting-family",
        label: "Starting a family",
        questions: [
          { q: "How to calculate inflation-adjusted education costs in 15 years?", tool: "Child Goal Momentum Calculator", featured: true },
          { q: "How much term insurance coverage does my family actually need?", tool: "Pure Risk Coverage Estimator", featured: false },
          { q: "How to balance health insurance top-ups with emergency funds?", tool: "Health Safety Net Evaluation", featured: false },
        ],
      },
      {
        id: "retirement",
        label: "Planning retirement",
        questions: [
          { q: "What monthly passive income will I need at age 60 with inflation?", tool: "FIRE & Corpus Calculator", featured: true },
          { q: "How to transition from equity accumulation to systematic withdrawal (SWP)?", tool: "SWP Longevity Simulator", featured: false },
          { q: "What is my true net worth across PF, real estate, and equity?", tool: "Net Worth Aggregator", featured: false },
        ],
      },
    ],
  },
  privacy: {
    badge: "Browser-only calculations",
    title: "Your numbers never leave this page.",
    subtitle: "We believe privacy is an engineering commitment, not a policy document. Watch our zero-data guarantee in real time.",
    explanation: "While you use the tools, nothing is sent anywhere. This counter shows requests made since you started.",
    counterLabel: "Network requests since you started using the tool",
    guaranteeText: "Calculations run 100% locally in your client's JS runtime.",
  },
  principles: {
    title: "Our Engineering Principles",
    subtitle: "Built to rebuild trust in personal finance tools.",
    items: [
      {
        num: "01",
        title: "Show the Full Math",
        desc: "No black boxes. Every result displays its underlying algebraic steps, variables, and financial conventions.",
      },
      {
        num: "02",
        title: "No Login Wall",
        desc: "You shouldn't need to hand over your email address or phone number just to calculate an EMI or SIP return.",
      },
      {
        num: "03",
        title: "Client-Side Execution",
        desc: "Inputs stay inside your browser memory. We never transmit your personal financial targets to a remote database.",
      },
      {
        num: "04",
        title: "Clearly Labeled Links",
        desc: "Any partner link or sponsorship is explicitly marked in high-contrast text. No native ad deception.",
      },
      {
        num: "05",
        title: "Mobile-First Precision",
        desc: "Designed ground-up for high performance on Indian mobile networks and screens of all viewports.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about Fermor's tools and methodology.",
    items: [
      {
        q: "Is Fermor free to use?",
        a: "Yes. All calculators, simulators, and guides on Fermor are completely free to use without restrictions.",
      },
      {
        q: "Do I need an account to use the calculators?",
        a: "No. You can access every feature without registering, logging in, or providing any personal details.",
      },
      {
        q: "Where does my data go when I input numbers?",
        a: "Nowhere. All arithmetic runs client-side in your web browser. Your financial figures are never stored or sent to any server.",
      },
      {
        q: "How accurate are the calculators?",
        a: "Our calculators use standard Indian financial formulas (such as monthly compounding for SIPs and reducing-balance method for EMIs). We explicitly list all assumptions and conventions alongside the output.",
      },
      {
        q: "How does Fermor make money?",
        a: "Fermor earns revenue through clearly labeled affiliate partnerships and advertisements. If a user chooses to sign up for a third-party service via a link on our platform, we may earn a referral fee. These links are always transparently labeled.",
      },
      {
        q: "Is this financial advice?",
        a: "No. Fermor provides educational tools and mathematical models to help you understand financial options. It does not constitute certified investment, tax, or legal advice.",
      },
    ],
  },
  waitlist: {
    title: "Get early access to Fermor tools",
    subtitle: "Join thoughtful Indian earners getting financial clarity delivered straight to their inbox.",
    nameLabel: "Your Name (Optional)",
    emailLabel: "Email Address *",
    planningLabel: "What financial milestone are you planning for?",
    submitBtn: "Join Waitlist",
    submitting: "Submitting...",
    successMsg: "You're on the list! We'll reach out as soon as new tools launch.",
    errorMsg: "Something went wrong. Please verify your details and try again.",
  },
  footer: {
    disclaimer: "Educational tool. Not investment, tax or legal advice. Calculated figures are illustrative estimates based on specified assumptions.",
    copyright: `© ${new Date().getFullYear()} Fermor. All rights reserved.`,
  },
};
