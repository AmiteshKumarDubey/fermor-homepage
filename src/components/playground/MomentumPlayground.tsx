"use client";

import React, { Suspense, useCallback, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { calculateRequiredSip, formatRupee, formatRupeeCompact } from "@/lib/finance";
import { GrowthChartSvg } from "./GrowthChartSvg";
import { FormulaBreakdown } from "./FormulaBreakdown";
import { IndianCurrencyInput } from "@/components/ui/IndianCurrencyInput";
import { Tag } from "@/components/ui/Tag";
import { COPY } from "@/content/copy";
import { Share2, Check, ChevronDown, ChevronUp, Calculator } from "lucide-react";

export interface PlaygroundState {
  goal: number;
  years: number;
  returnRate: number;
  inflation: number;
  start: number;
}

export function MomentumPlayground({
  onStateChange,
}: {
  onStateChange?: (state: PlaygroundState) => void;
}) {
  return (
    <Suspense fallback={<PlaygroundSkeleton />}>
      <MomentumPlaygroundContent onStateChange={onStateChange} />
    </Suspense>
  );
}

function PlaygroundSkeleton() {
  return (
    <div className="w-full h-96 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] animate-pulse p-8 flex items-center justify-center">
      <span className="text-sm font-sans tabular-nums text-[var(--text-muted)]">Loading Momentum Engine...</span>
    </div>
  );
}

function MomentumPlaygroundContent({
  onStateChange,
}: {
  onStateChange?: (state: PlaygroundState) => void;
}) {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [state, setState] = useState<PlaygroundState>(() => {
    const pGoal = searchParams.get("goal");
    const pYears = searchParams.get("years");
    const pReturn = searchParams.get("return");
    const pInflation = searchParams.get("inflation");
    const pStart = searchParams.get("start");

    return {
      goal: pGoal ? Math.max(100000, Number(pGoal)) : 10000000,
      years: pYears ? Math.max(1, Number(pYears)) : 10,
      returnRate: pReturn ? Math.max(0, Number(pReturn)) : 12,
      inflation: pInflation ? Math.max(0, Number(pInflation)) : 6,
      start: pStart ? Math.max(0, Number(pStart)) : 0,
    };
  });

  const [showWorking, setShowWorking] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const markInteracted = useCallback(() => {
    if (!userHasInteracted) {
      setUserHasInteracted(true);
      window.dispatchEvent(new CustomEvent("first-playground-interaction"));
    }
  }, [userHasInteracted]);

  const updateState = useCallback(
    (newPartial: Partial<PlaygroundState>) => {
      markInteracted();
      setState((prev) => {
        const next = { ...prev, ...newPartial };
        if (onStateChange) onStateChange(next);

        startTransition(() => {
          const params = new URLSearchParams();
          params.set("goal", next.goal.toString());
          params.set("years", next.years.toString());
          params.set("return", next.returnRate.toString());
          params.set("inflation", next.inflation.toString());
          params.set("start", next.start.toString());
          window.history.replaceState(null, "", `?${params.toString()}`);
        });

        return next;
      });
    },
    [markInteracted, onStateChange]
  );

  // Handle global presets
  useEffect(() => {
    const handlePreset = (e: CustomEvent<PlaygroundState>) => {
      if (e.detail) {
        updateState(e.detail);
      }
    };
    window.addEventListener("load-playground-preset" as unknown as string, handlePreset as unknown as EventListener);
    return () => window.removeEventListener("load-playground-preset" as unknown as string, handlePreset as unknown as EventListener);
  }, [updateState]);

  const sipResult = calculateRequiredSip(
    state.goal,
    state.years,
    state.returnRate,
    state.inflation,
    state.start
  );

  const handleCopyLink = () => {
    markInteracted();
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl shadow-xl overflow-hidden p-5 sm:p-7 space-y-7 transition-all font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[var(--text-ink)] tracking-tight">
              {COPY.playground.title}
            </h3>
            <Tag>{COPY.playground.exampleTag}</Tag>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-sans">
            {COPY.playground.subtitle}
          </p>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans tabular-nums text-[var(--brand-green-text)] bg-[var(--brand-green-subtle)] hover:bg-[var(--brand-green)] hover:text-[#0F1A14] transition-colors border border-[var(--border-subtle)]"
          title="Share calculation link with current parameters"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{COPY.playground.linkCopied}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>{COPY.playground.copyLink}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Inputs Left (Sticky desktop top-24), Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Synced Inputs (Sticky top-24 on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5 bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border-subtle)]">
          {/* Goal Amount Slider + Formatted Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label htmlFor="goal-input" className="font-medium text-[var(--text-ink)]">
                {COPY.playground.inputs.goalAmount}
              </label>
              <span className="tabular-nums text-[var(--brand-green-text)] font-semibold">
                {formatRupeeCompact(state.goal)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="goal-slider"
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={state.goal}
                onChange={(e) => updateState({ goal: Number(e.target.value) })}
                className="flex-1 accent-[var(--brand-green)] cursor-pointer h-2 bg-[var(--border-subtle)] rounded-lg"
              />
              <IndianCurrencyInput
                id="goal-input"
                value={state.goal}
                onChange={(val) => updateState({ goal: val })}
                min={100000}
                max={100000000}
                className="w-32"
              />
            </div>
          </div>

          {/* Tenure (Years) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label htmlFor="years-input" className="font-medium text-[var(--text-ink)]">
                {COPY.playground.inputs.years}
              </label>
              <span className="tabular-nums text-[var(--text-ink)] font-semibold">
                {state.years} Years ({state.years * 12} Mos)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="years-slider"
                type="range"
                min="1"
                max="40"
                step="1"
                value={state.years}
                onChange={(e) => updateState({ years: Number(e.target.value) })}
                className="flex-1 accent-[var(--brand-green)] cursor-pointer h-2 bg-[var(--border-subtle)] rounded-lg"
              />
              <input
                id="years-input"
                type="number"
                min="1"
                max="50"
                value={state.years}
                onChange={(e) => updateState({ years: Math.max(1, Math.min(50, Number(e.target.value))) })}
                className="w-20 px-2.5 py-1.5 text-xs font-sans tabular-nums bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-[var(--text-ink)] outline-none focus:border-[var(--brand-green)]"
              />
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label htmlFor="return-input" className="font-medium text-[var(--text-ink)]">
                {COPY.playground.inputs.expectedReturn}
              </label>
              <span className="tabular-nums text-[var(--text-ink)] font-semibold">
                {state.returnRate}% p.a.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="return-slider"
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={state.returnRate}
                onChange={(e) => updateState({ returnRate: Number(e.target.value) })}
                className="flex-1 accent-[var(--brand-green)] cursor-pointer h-2 bg-[var(--border-subtle)] rounded-lg"
              />
              <input
                id="return-input"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={state.returnRate}
                onChange={(e) => updateState({ returnRate: Math.max(0, Math.min(30, Number(e.target.value))) })}
                className="w-20 px-2.5 py-1.5 text-xs font-sans tabular-nums bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-[var(--text-ink)] outline-none focus:border-[var(--brand-green)]"
              />
            </div>
          </div>

          {/* Inflation Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label htmlFor="inflation-input" className="font-medium text-[var(--text-ink)]">
                {COPY.playground.inputs.inflationRate}
              </label>
              <span className="tabular-nums text-[var(--text-muted)]">
                {state.inflation}% p.a.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="inflation-slider"
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={state.inflation}
                onChange={(e) => updateState({ inflation: Number(e.target.value) })}
                className="flex-1 accent-[var(--brand-green)] cursor-pointer h-2 bg-[var(--border-subtle)] rounded-lg"
              />
              <input
                id="inflation-input"
                type="number"
                min="0"
                max="15"
                step="0.5"
                value={state.inflation}
                onChange={(e) => updateState({ inflation: Math.max(0, Math.min(15, Number(e.target.value))) })}
                className="w-20 px-2.5 py-1.5 text-xs font-sans tabular-nums bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-[var(--text-ink)] outline-none focus:border-[var(--brand-green)]"
              />
            </div>
          </div>

          {/* Starting Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label htmlFor="start-input" className="font-medium text-[var(--text-ink)]">
                {COPY.playground.inputs.startingAmount}
              </label>
              <span className="tabular-nums text-[var(--text-muted)]">
                {formatRupeeCompact(state.start)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="start-slider"
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={state.start}
                onChange={(e) => updateState({ start: Number(e.target.value) })}
                className="flex-1 accent-[var(--brand-green)] cursor-pointer h-2 bg-[var(--border-subtle)] rounded-lg"
              />
              <IndianCurrencyInput
                id="start-input"
                value={state.start}
                onChange={(val) => updateState({ start: val })}
                min={0}
                max={50000000}
                className="w-32"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Outputs & Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Required Monthly SIP Card */}
            <div className="bg-[var(--brand-green-subtle)] border border-[var(--border-medium)] p-5 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider font-sans">
                  {COPY.playground.outputs.requiredSip}
                </span>
                <Calculator className="w-4 h-4 text-[var(--brand-green-text)]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-sans tabular-nums text-[var(--brand-green-text)] tracking-tight">
                {sipResult.isGoalMetByStart ? "₹0 / mo" : `${formatRupee(sipResult.requiredMonthlySip)} / mo`}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-sans">
                {sipResult.isGoalMetByStart
                  ? "Your initial lump sum already meets the target goal!"
                  : `Monthly investment required at ${state.returnRate}% annual return`}
              </p>
            </div>

            {/* Inflation Adjusted Purchasing Power Card */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 rounded-xl space-y-1">
              <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider font-sans">
                {COPY.playground.outputs.realValueTitle}
              </span>
              <div className="text-xl sm:text-2xl font-bold font-sans tabular-nums text-[var(--text-ink)]">
                {formatRupee(sipResult.realValueToday)}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-sans leading-snug">
                {formatRupeeCompact(state.goal)} in {state.years} years buys what {formatRupeeCompact(sipResult.realValueToday)} buys today at {state.inflation}% inflation.
              </p>
            </div>
          </div>

          {/* SVG Growth Chart */}
          <GrowthChartSvg yearlyBreakdown={sipResult.yearlyBreakdown} />

          {/* Detailed Totals Row */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-xs font-sans tabular-nums text-center">
            <div>
              <span className="block text-[var(--text-muted)] text-[10px] uppercase">{COPY.playground.outputs.totalInvestment}</span>
              <span className="font-semibold text-[var(--text-ink)]">{formatRupeeCompact(sipResult.totalInvested)}</span>
            </div>
            <div>
              <span className="block text-[var(--text-muted)] text-[10px] uppercase">{COPY.playground.outputs.estimatedReturns}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{formatRupeeCompact(sipResult.estimatedReturns)}</span>
            </div>
            <div>
              <span className="block text-[var(--text-muted)] text-[10px] uppercase">{COPY.playground.outputs.futureNominalValue}</span>
              <span className="font-semibold text-[var(--brand-green-text)]">{formatRupeeCompact(state.goal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show the Working Math Panel */}
      <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-col gap-4">
        <button
          onClick={() => {
            markInteracted();
            setShowWorking(!showWorking);
          }}
          className="self-start inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium text-[var(--brand-green-text)] bg-[var(--bg-surface)] hover:bg-[var(--brand-green-subtle)] border border-[var(--border-subtle)] rounded-lg transition-colors"
        >
          <span>{showWorking ? COPY.playground.hideMath : COPY.playground.showMath}</span>
          {showWorking ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showWorking && (
          <FormulaBreakdown
            goalAmount={state.goal}
            years={state.years}
            expectedReturn={state.returnRate}
            inflationRate={state.inflation}
            startingAmount={state.start}
            requiredSip={sipResult.requiredMonthlySip}
            realValueToday={sipResult.realValueToday}
          />
        )}

        <p className="text-[11px] text-[var(--text-muted)] italic font-sans">
          {COPY.playground.disclaimer}
        </p>
      </div>
    </div>
  );
}
