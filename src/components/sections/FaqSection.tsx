"use client";

import React, { useState } from "react";
import { COPY } from "@/content/copy";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = COPY.faq.items;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 md:py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-green)]" />
            <span>Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
            {COPY.faq.title}
          </h2>
          <p className="text-base text-[var(--text-muted)] font-sans max-w-lg mx-auto leading-relaxed">
            {COPY.faq.subtitle}
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-sans focus-visible:outline-2 focus-visible:outline-[var(--brand-green)]"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base sm:text-lg text-[var(--text-ink)]">
                    {item.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--brand-green-text)]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[var(--text-muted)] font-sans leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/30">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
