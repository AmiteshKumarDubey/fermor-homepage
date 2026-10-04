# Fermor Homepage

My submission for the Founding Software Engineering Intern assignment.

- **Live Demo:** [https://fermor-homepage-jjzh.vercel.app](https://fermor-homepage-jjzh.vercel.app)
- **Repository:** [https://github.com/AmiteshKumarDubey/fermor-homepage](https://github.com/AmiteshKumarDubey/fermor-homepage)

---

## What it is

A homepage for Fermor with a live goal calculator in the first screen, a loan EMI tool, a step-up SIP comparison, a net worth tool, a life-stage section, a browser-only privacy counter, a command palette (Ctrl+K), dark and light themes, and a mobile layout.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Zod
- Vitest
- Hand-built SVG charts

---

## Setup & Scripts

1. Clone the repository:
   ```bash
   git clone https://github.com/AmiteshKumarDubey/fermor-homepage.git
   cd fermor-homepage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_FORM_ENDPOINT=your_formspree_endpoint
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Available scripts:
   - `npm test`: Run Vitest unit tests for financial logic
   - `npm run lint`: Run ESLint check
   - `npm run build`: Build Next.js production bundle

---

## Project Structure

```
src/
├── app/                  # App router pages, OG image & waitlist API route
├── components/
│   ├── layout/           # Header, Footer, ThemeProvider & CommandPalette
│   ├── playground/       # Momentum SIP calculator & hand-built SVG chart
│   ├── sections/         # Homepage sections (Hero, Story, Working, LifeStage, Privacy, Principles, FAQ, Waitlist)
│   ├── story/            # EMI, Step-Up SIP & Net Worth interactive mini-tools
│   └── ui/               # IndianCurrencyInput, Logo & Tag UI components
├── content/              # Centralized copy dictionary
└── lib/                  # Pure financial math engine & Vitest unit tests
```

---

## Screenshots

![Desktop Dark](/docs/screenshots/desktop-dark.svg)
*Desktop Dark Theme & Hero Playground*

![Mobile Viewport](/docs/screenshots/mobile-390px.svg)
*Mobile 390px Viewport Layout*

![Light Theme](/docs/screenshots/light-theme.svg)
*Light Theme Warm Paper Style*

![Command Palette](/docs/screenshots/command-palette.svg)
*Command Palette (Ctrl+K) Presets*

---

## Decisions

**Live calculator in the hero.** Most finance websites explain a lot first and let you try the tools later. I wanted someone to get something useful in the first screen, so the hero has a small SIP calculator that updates as you move the sliders.

**Dark green theme.** Fermor's logo is green, so I built the colours around it. I kept the design calm and simple because money can feel stressful. There is also a light theme, which you can switch with the sun icon.

**"Show the math" panel.** Fermor's idea is making finance clear. I added a panel that puts the user's own numbers into the formula step by step, so people can check the answer themselves instead of just trusting it.

**Privacy counter.** The calculations run in the browser. The counter shows how many network requests happened since you started using the tool, so the claim can be checked.

**What I would build next.** An old vs new income tax comparer, a retirement withdrawal (SWP) planner, and a downloadable summary of a user's calculation.

**What I left out.** No login, no fake user numbers or testimonials, and no extra pages. This is a homepage, so I focused on making the first impression and one working idea good.

**How I worked.** I looked at fermor.in and Fermor's LinkedIn page to understand the product. The layout, copy and code are my own interpretation. I used an AI coding tool to help with the code, and I made the product and design decisions.
