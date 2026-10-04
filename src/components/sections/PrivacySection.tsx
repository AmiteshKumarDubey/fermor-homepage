"use client";

import React, { useEffect, useState } from "react";
import { COPY } from "@/content/copy";
import { ShieldCheck, Activity, Lock, RefreshCw } from "lucide-react";

export function PrivacySection() {
  const [networkCount, setNetworkCount] = useState<number>(0);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [interactionTimestamp, setInteractionTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setInteractionTimestamp(performance.now());
      }
    };

    window.addEventListener("first-playground-interaction", handleFirstInteraction);
    return () => window.removeEventListener("first-playground-interaction", handleFirstInteraction);
  }, [hasInteracted]);

  useEffect(() => {
    if (!hasInteracted || interactionTimestamp === null) return;

    const updateCount = () => {
      if (typeof window === "undefined" || !window.performance) return;

      const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const relevantEntries = entries.filter((entry) => {
        const isFetchOrXhr = entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest";
        const afterInteraction = entry.startTime >= interactionTimestamp;
        return isFetchOrXhr && afterInteraction;
      });

      const waitlistRequests = relevantEntries.filter((e) => e.name.includes("/api/waitlist"));
      const toolRequests = relevantEntries.length - waitlistRequests.length;

      setNetworkCount(toolRequests);
      setWaitlistCount(waitlistRequests.length);
    };

    const interval = setInterval(updateCount, 1000);
    updateCount();

    return () => clearInterval(interval);
  }, [hasInteracted, interactionTimestamp]);

  return (
    <section id="privacy" className="w-full py-16 md:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--brand-green-text)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{COPY.privacy.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
            {COPY.privacy.title}
          </h2>
          <p className="text-base text-[var(--text-muted)] font-sans leading-relaxed">
            {COPY.privacy.subtitle}
          </p>
        </div>

        {/* Live PerformanceObserver Network Counter Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Live Counter Display */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <span className="text-xs font-sans font-medium uppercase tracking-wider text-[var(--text-muted)]">
              {COPY.privacy.counterLabel}
            </span>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-bold font-sans tabular-nums text-[var(--brand-green-text)] tracking-tight">
                {networkCount}
              </span>
              <div className="text-left space-y-0.5 font-sans">
                <span className="block text-xs font-semibold text-[var(--text-ink)]">
                  Network Calls
                </span>
                <span className="block text-[11px] text-[var(--text-muted)]">
                  {hasInteracted ? "Live PerformanceObserver active" : "Waiting for first interaction"}
                </span>
              </div>
            </div>

            {waitlistCount > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-sans">
                <Activity className="w-3.5 h-3.5" />
                <span>Waitlist Form Submission Request: {waitlistCount}</span>
              </div>
            )}
          </div>

          {/* Explanation & Technical Details */}
          <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] pt-6 lg:pt-0 lg:pl-8 font-sans">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-[var(--text-ink)]">
                  Local Memory Processing
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {COPY.privacy.explanation}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-muted)] shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-[var(--text-ink)]">
                  Transparent Privacy Metric
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {COPY.privacy.guaranteeText} Try dragging sliders in any tool above—the counter stays at zero because calculations execute purely in client memory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
