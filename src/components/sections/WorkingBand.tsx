"use client";

import React, { useEffect, useState } from "react";
import { COPY } from "@/content/copy";

const FORMULAS_TO_TYPE = [
  "monthly_rate = annual_return / 12 / 100;",
  "FV_sip = P × [((1 + i)^n - 1) / i] × (1 + i);",
  "EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1];",
  "real_value = Goal / (1 + inflation)^years;",
  "Net_Worth = Total_Assets - Liabilities;",
];

export function WorkingBand() {
  const [currentFormulaIndex, setCurrentFormulaIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = FORMULAS_TO_TYPE[currentFormulaIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < fullText.length) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, 40);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      }, 20);
    } else if (isDeleting && displayedText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentFormulaIndex((prev) => (prev + 1) % FORMULAS_TO_TYPE.length);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentFormulaIndex]);

  return (
    <section className="w-full bg-[#0F1A14] dark:bg-[#060A08] text-[#F0F4F1] py-16 md:py-24 border-y border-[var(--border-medium)] select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Oversized Serif Statement */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-sans tracking-widest text-[#34B867] uppercase font-semibold">
              Transparent Methodology
            </span>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal leading-[1.15] text-[#F0F4F1]">
              &ldquo;{COPY.workingBand.quote}&rdquo;
            </blockquote>
            <p className="text-sm sm:text-base text-[#94A398] font-sans max-w-xl leading-relaxed">
              {COPY.workingBand.subtitle}
            </p>
          </div>

          {/* Clean Mono Code Block with Caption */}
          <div className="lg:col-span-5 bg-[#070D0A] border border-[#1F2E26] rounded-xl p-5 shadow-lg space-y-3 font-mono text-xs">
            <div className="h-20 flex items-center text-[#34B867] text-sm leading-relaxed overflow-hidden">
              <pre className="font-mono">
                <code>
                  {displayedText}
                  <span className="inline-block w-2 h-4 bg-[#34B867] ml-1 animate-pulse align-middle" />
                </code>
              </pre>
            </div>
            <figcaption className="pt-2 border-t border-[#1F2E26] text-[11px] text-[#94A398] font-sans">
              Exact mathematical equation executed in client browser memory.
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
