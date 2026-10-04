import React from "react";
import { COPY } from "@/content/copy";

export function PrinciplesSection() {
  const items = COPY.principles.items;

  return (
    <section id="principles" className="w-full py-16 md:py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-green)]" />
            <span>Product Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
            {COPY.principles.title}
          </h2>
          <p className="text-base text-[var(--text-muted)] font-sans leading-relaxed">
            {COPY.principles.subtitle}
          </p>
        </div>

        {/* Numbered Editorial Column List (No generic 3-card repeating grid) */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {items.map((item) => (
            <div
              key={item.num}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-[var(--bg-surface)]/30 transition-colors px-2 rounded-lg"
            >
              <div className="md:col-span-2">
                <span className="font-serif-display text-3xl font-normal text-[var(--brand-green-text)]">
                  {item.num}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif-display text-2xl font-normal text-[var(--text-ink)]">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
