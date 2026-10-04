"use client";

import React, { useState } from "react";
import { COPY } from "@/content/copy";
import { MomentumPlayground, PlaygroundState } from "@/components/playground/MomentumPlayground";
import { GrowthChartSvg } from "@/components/playground/GrowthChartSvg";
import { IndianCurrencyInput } from "@/components/ui/IndianCurrencyInput";
import { calculateRequiredSip, formatRupee, formatRupeeCompact } from "@/lib/finance";
import { ArrowRight, ShieldCheck, Calculator, Sparkles, Users } from "lucide-react";

export function HeroSection() {
  const [heroState, setHeroState] = useState<PlaygroundState>({
    goal: 10000000,
    years: 10,
    returnRate: 12,
    inflation: 6,
    start: 0,
  });

  const updateHeroState = (partial: Partial<PlaygroundState>) => {
    setHeroState((prev) => ({ ...prev, ...partial }));
  };

  const sipResult = calculateRequiredSip(
    heroState.goal,
    heroState.years,
    heroState.returnRate,
    heroState.inflation,
    heroState.start
  );

  return (
    <section id="tools" className="w-full pt-6 pb-14 md:pt-10 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Hero Layout: 2-column desktop (>=1024px), single column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Audience Line, CTAs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border border-[var(--border-subtle)] bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)]">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-green)]" />
              <span>Personal Finance for India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-normal text-[var(--text-ink)] leading-[1.1] tracking-tight">
              {COPY.brand.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-muted)] font-sans leading-relaxed">
              {COPY.brand.heroSubhead}
            </p>

            {/* Audience Line */}
            <div className="flex items-start gap-2.5 p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-ink)] font-sans leading-relaxed">
              <Users className="w-4 h-4 text-[var(--brand-green-text)] shrink-0 mt-0.5" />
              <span>{COPY.brand.heroAudience}</span>
            </div>

            {/* CTAs: Full width on mobile (w-full sm:w-auto) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#playground"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#0F1A14] bg-[var(--brand-green)] hover:bg-[var(--brand-green-hover)] rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                <span>{COPY.brand.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#story"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[var(--brand-green-text)] hover:bg-[var(--brand-green-subtle)] rounded-xl transition-colors border border-[var(--border-subtle)]"
              >
                <Calculator className="w-4 h-4" />
                <span>{COPY.brand.ctaSecondary}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-1 font-sans">
              <ShieldCheck className="w-4 h-4 text-[var(--brand-green-text)]" />
              <span>{COPY.brand.trustBadge}</span>
            </div>

            {/* Mobile Hero Compact Interactive Playground */}
            <div className="block lg:hidden pt-4">
              <HeroCompactPlayground
                heroState={heroState}
                onUpdate={updateHeroState}
                sipResult={sipResult}
              />
            </div>
          </div>

          {/* Right Column: Desktop Hero Compact Interactive Playground */}
          <div className="hidden lg:block lg:col-span-6">
            <HeroCompactPlayground
              heroState={heroState}
              onUpdate={updateHeroState}
              sipResult={sipResult}
            />
          </div>
        </div>

        {/* Full Playground Directly Below */}
        <div id="playground" className="w-full pt-4">
          <MomentumPlayground onStateChange={(st) => setHeroState(st)} />
        </div>
      </div>
    </section>
  );
}

function HeroCompactPlayground({
  heroState,
  onUpdate,
  sipResult,
}: {
  heroState: PlaygroundState;
  onUpdate: (partial: Partial<PlaygroundState>) => void;
  sipResult: ReturnType<typeof calculateRequiredSip>;
}) {
  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl p-5 shadow-lg space-y-4 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-green-text)]" />
          <span className="text-xs font-semibold text-[var(--text-ink)] uppercase tracking-wider">
            Quick Interactive Playground
          </span>
        </div>
        {/* whitespace-nowrap prevents badge from wrapping onto two lines on mobile */}
        <span className="text-[11px] tabular-nums whitespace-nowrap text-[var(--text-muted)] bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
          {formatRupeeCompact(heroState.goal)} in {heroState.years} yrs
        </span>
      </div>

      {/* 3 Interactive Quick Sliders */}
      <div className="space-y-3 bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-subtle)] text-xs">
        {/* Goal Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="hero-goal-input" className="text-[var(--text-muted)]">Goal Amount</label>
            <span className="font-semibold text-[var(--brand-green-text)] tabular-nums">{formatRupeeCompact(heroState.goal)}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={heroState.goal}
              onChange={(e) => onUpdate({ goal: Number(e.target.value) })}
              className="flex-1 accent-[var(--brand-green)] h-1.5 rounded cursor-pointer"
            />
            <IndianCurrencyInput
              id="hero-goal-input"
              value={heroState.goal}
              onChange={(val) => onUpdate({ goal: val })}
              min={100000}
              max={100000000}
              className="w-24 text-[11px] py-1"
            />
          </div>
        </div>

        {/* Years & Return Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor="hero-years" className="text-[var(--text-muted)]">Tenure</label>
              <span className="font-semibold text-[var(--text-ink)] tabular-nums">{heroState.years} Yrs</span>
            </div>
            <input
              id="hero-years"
              type="range"
              min="1"
              max="35"
              step="1"
              value={heroState.years}
              onChange={(e) => onUpdate({ years: Number(e.target.value) })}
              className="w-full accent-[var(--brand-green)] h-1.5 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor="hero-return" className="text-[var(--text-muted)]">Expected Return</label>
              <span className="font-semibold text-[var(--text-ink)] tabular-nums">{heroState.returnRate}%</span>
            </div>
            <input
              id="hero-return"
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={heroState.returnRate}
              onChange={(e) => onUpdate({ returnRate: Number(e.target.value) })}
              className="w-full accent-[var(--brand-green)] h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Output Result Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[var(--brand-green-subtle)] border border-[var(--border-subtle)] p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase">
            {COPY.playground.outputs.requiredSip}
          </span>
          <div className="text-xl font-bold tabular-nums text-[var(--brand-green-text)]">
            {formatRupee(sipResult.requiredMonthlySip)} / mo
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3.5 rounded-xl space-y-0.5">
          <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase">
            {COPY.playground.outputs.realValueTitle}
          </span>
          <div className="text-base font-bold tabular-nums text-[var(--text-ink)]">
            {formatRupee(sipResult.realValueToday)}
          </div>
        </div>
      </div>

      {/* Compact Chart */}
      <GrowthChartSvg yearlyBreakdown={sipResult.yearlyBreakdown} compact={true} />
    </div>
  );
}
