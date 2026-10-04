# Fermor — Personal Finance Homepage

> **Founding Software Engineering Intern Assignment Submission**  
> *Author:* Amitesh Kumar Dubey  
> *Live Demo:* Deploy on Vercel to generate live URL (e.g. `https://fermor-homepage-amitesh.vercel.app`)

---

## 1. Overview & Core Concept

**"The Page is the Product"**

Most fintech landing pages attempt to sell visitors on a promise before offering value. Fermor reverses this pattern: visitors interact with our financial engine in the very first screen. 

Fermor is built around the philosophy that **financial clarity requires visible arithmetic**. Every calculation runs locally in your browser—inputs are never sent to a remote server, no login walls block access, and every formula expands into step-by-step mathematical working.

---

## 2. Key Features & Implementation Highlights

- **Hero & Quick Interactive Playground (First Screen Product)**: Features a compact interactive SIP playground right in the hero header (Goal, Tenure, and Expected Return sliders with live SIP output, inflation-adjusted power, and compact SVG chart).
- **Target Audience Callout**: Explicitly built for young earners and first-time buyers in India making their first major financial decisions (SIP, loans, tax, retirement).
- **Full Momentum Playground (Signature Tool)**: Real-time monthly SIP required calculator using the **annuity-due convention** (payments at the beginning of each period). Features synced sliders and Indian digit grouping inputs (`1,00,00,000`), inflation-adjusted purchasing power, and a hand-built SVG growth chart with initial `pathLength` draw animations.
- **Step-by-Step Formula Expansion**: A toggleable math panel displaying user variables substituted step-by-step into pure formulas in `Geist Mono`.
- **URL Query State Sync**: All calculator inputs serialize cleanly into URL search parameters (`?goal=10000000&years=10&return=12&inflation=6&start=0`) with one-click link sharing.
- **"Understand. Act. Grow." Interactive Story**:
  - *01 Understand*: Home loan EMI reducing-balance calculator with stacked principal/interest visualizer and 12-month amortization schedule table.
  - *02 Act*: Standard SIP vs 10% annual Step-Up SIP comparison chart highlighting accelerated compounding wealth creation.
  - *03 Grow*: Net Worth aggregator (Assets minus Liabilities) with editable inputs.
- **"Show the Working" Statement Band**: Oversized serif typography paired with a clean mono code block demonstrating client-side formula execution.
- **"Where are you in life?" Life-Stage Navigator**: Varied asymmetric layout featuring a large featured milestone question card alongside smaller side cards across four key life stages (*First salary*, *Buying a home*, *Starting a family*, *Planning retirement*).
- **Browser-Only Calculations & Live Network Counter**: Real-time `PerformanceObserver` tracking external `fetch` and `XHR` network requests initiated **after** first user interaction—demonstrating 0 network calls during tool usage. Waitlist submissions are counted and displayed transparently.
- **Accessible Command Palette (`Ctrl/Cmd + K`)**: Modal launcher supporting instant section navigation, theme switching, and calculator presets (*"Buy a ₹50L home"*, *"Retire in 25 years"*, *"Save ₹10L in 5 years"*, *"First ₹1 Cr milestone"*).
- **Zod-Validated Waitlist Handler**: Next.js Server Route (`/api/waitlist`) featuring honeypot bot prevention, inline error feedback, and Formspree / Webhook integration (`NEXT_PUBLIC_FORM_ENDPOINT`).

---

## 3. Product & Engineering Decisions (In First Person)

### Why the page is the product
I chose not to build a standard marketing website with generic copy like *"revolutionize"* or *"seamless"*. When young Indian earners visit a financial platform, they distrust black-box claims and lead-capture popups. By embedding an interactive SIP engine directly in the hero header, visitors get immediate mathematical value before we ever ask them for an email address.

### Why the Momentum Playground is the hero
Personal financial planning in India revolves around target milestones—buying a house, funding higher education, or reaching FIRE (Financial Independence, Retire Early). The Momentum Playground gives immediate feedback: changing your return expectation by 1% or adding ₹5,000 to your starting amount dynamically recalculates the exact monthly SIP required to reach your target, accounting for inflation.

### Why these fonts and colors
- **Typography**: I paired `Instrument Serif` (editorial display face reminiscent of classical financial journalism like the *Financial Times*) with `Geist` (clean grotesque UI sans) and `Geist Mono` (for formulas, math working, and code-like values).
- **Color System**: I selected a warm tactile paper background (`#F6F4EE`) paired with deep green ink (`#0F1A14`) and brand green (`#2FA35B`). All body copy and links use a dedicated `#1F7A43` token ensuring a **5.4:1 contrast ratio**, while solid green buttons feature dark ink text reaching a **7.8:1 contrast ratio**—fully compliant with **WCAG AA contrast guidelines**.
- **No-Flash Theme Engine**: An inline `<ThemeScript />` executes prior to document body paint, preserving dark/light mode state without flicker.

### Why the privacy counter matters
Fintech users in India are routinely spammed by telemarketers immediately after using loan or SIP calculators online. Our live `PerformanceObserver` counter offers transparent, verifiable proof: as you drag sliders and model goals, zero network calls are dispatched to remote servers.

### What I would build next
1. **Systematic Withdrawal Plan (SWP) Longevity Simulator**: Modeling post-retirement income streams with inflation-adjusted monthly drawdowns and equity sequence-of-returns risk.
2. **Income Tax Regime Comparer (Old vs New)**: Side-by-side tax liability engine accounting for 80C, 80D, and HRA deductions.
3. **Exportable Financial Blueprint**: One-click client-side PDF summary generator detailing the user's custom formulas and amortization tables.

### What I intentionally left out
- **No Login Wall**: You do not need an account to model your financial future.
- **No Heavy Crypto/Neon Gradients or Floating 3D Shapes**: Kept the visual aesthetic grounded, editorial, and calm.
- **No Fake Social Proof**: No invented user counts, fake awards, or artificial testimonials. Any illustrative figure is explicitly labeled as an *"example projection"*.

---

## 4. Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Variables
- **Icons**: Lucide React
- **Validation**: Zod (Client & Server)
- **Testing**: Vitest (`src/lib/finance.test.ts`)
- **Linting**: ESLint (`npm run lint` passing with 0 errors)
- **Graphics**: Hand-built SVG paths (No external chart libraries)

---

## 5. Getting Started & Local Setup

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/amiteshkumardubey/fermor-homepage.git
cd fermor-homepage

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Unit Tests
```bash
npm test
```

### Run ESLint Verification
```bash
npm run lint
```

### Production Build
```bash
npm run build
npm start
```

---

## 6. Project Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout with next/font & ThemeProvider
│   ├── page.tsx               # Homepage orchestrator component
│   ├── not-found.tsx          # Custom editorial 404 page
│   ├── og/route.tsx           # Dynamic OpenGraph image generator (next/og)
│   ├── robots.ts              # SEO Robots configuration
│   ├── sitemap.ts             # Dynamic Sitemap configuration
│   └── api/
│       └── waitlist/route.ts  # Zod-validated Waitlist API route handler
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Sticky navigation with theme toggle & mobile trap
│   │   ├── Footer.tsx         # Responsive footer with disclaimers
│   │   ├── CommandPalette.tsx # Accessible Ctrl+K modal launcher
│   │   ├── ThemeProvider.tsx  # Dark/Light theme context
│   │   └── ThemeScript.tsx    # Zero-flash inline theme initialization script
│   ├── sections/
│   │   ├── HeroSection.tsx    # 2-Column Hero + Quick Interactive Playground
│   │   ├── StorySection.tsx   # Scroll-driven story with interactive mini-tools
│   │   ├── WorkingBand.tsx    # Statement band + clean code block formula animation
│   │   ├── LifeStageSection.tsx # Life-stage varied navigator (Featured + Side cards)
│   │   ├── PrivacySection.tsx # PerformanceObserver live network request counter
│   │   ├── PrinciplesSection.tsx # Editorial numbered principles list
│   │   ├── FaqSection.tsx     # Accessible disclosure accordion
│   │   └── WaitlistSection.tsx# Waitlist form with Zod validation
│   ├── playground/
│   │   ├── MomentumPlayground.tsx # Main SIP calculator container (Sticky desktop)
│   │   ├── GrowthChartSvg.tsx # Hand-coded SVG growth chart (Endpoint dot, Portfolio value legend)
│   │   └── FormulaBreakdown.tsx # Step-by-step arithmetic working panel
│   ├── story/
│   │   ├── EmiMiniTool.tsx    # EMI slider, stacked bar & 12-mo schedule table
│   │   ├── StepUpCompare.tsx  # Dual-line Step-Up SIP comparison chart
│   │   └── NetWorthTool.tsx   # Interactive Assets vs Liabilities simulator
│   └── ui/
│       ├── IndianCurrencyInput.tsx # Live Indian digit grouping (1,00,00,000)
│       ├── Logo.tsx           # Inline SVG wordmark slot
│       └── Tag.tsx            # Illustrative example pill tag
├── lib/
│   ├── finance.ts             # Pure financial math library (Annuity-due, EMI, Step-Up)
│   └── finance.test.ts        # Vitest unit test suite (100% passing)
└── content/
    └── copy.ts                # Centralized editorial text repository
```

---

## 7. Screenshots & Visual Artifacts

Screenshots are stored in `/docs/screenshots/`:
- `desktop-light.png`: Desktop 1280px+ view showing Hero & Quick Interactive Playground.
- `mobile-360.png`: Mobile 360px viewport view showing single-column layout.
- `command-palette.png`: Keyboard-accessible Ctrl+K modal with financial presets.
