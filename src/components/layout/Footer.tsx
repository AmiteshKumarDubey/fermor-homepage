import React from "react";
import { Logo } from "@/components/ui/Logo";
import { COPY } from "@/content/copy";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] pt-14 pb-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed font-sans">
              {COPY.brand.heroSubhead}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full text-xs text-[var(--text-muted)] font-sans">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-green)] animate-pulse" />
              <span>Calculations run in your browser</span>
            </div>
          </div>

          {/* Links 1: Calculators & Tools */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
              Calculators & Tools
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><a href="#playground" className="hover:text-[var(--brand-green-text)] transition-colors">SIP Goal Playground</a></li>
              <li><a href="#story" className="hover:text-[var(--brand-green-text)] transition-colors">Home Loan EMI Calculator</a></li>
              <li><a href="#story" className="hover:text-[var(--brand-green-text)] transition-colors">Step-Up SIP Simulator</a></li>
              <li><a href="#story" className="hover:text-[var(--brand-green-text)] transition-colors">Net Worth Aggregator</a></li>
            </ul>
          </div>

          {/* Links 2: Method & Principles */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
              Methodology & Principles
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li><a href="#principles" className="hover:text-[var(--brand-green-text)] transition-colors">Our 5 Principles</a></li>
              <li><a href="#privacy" className="hover:text-[var(--brand-green-text)] transition-colors">Privacy Audit</a></li>
              <li><a href="#faq" className="hover:text-[var(--brand-green-text)] transition-colors">Business Model & FAQ</a></li>
              <li><a href="https://fermor.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-green-text)] transition-colors">Fermor Platform (fermor.in)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Made in India */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-sans">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            {COPY.footer.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right shrink-0">
            <span className="tabular-nums">{COPY.footer.copyright}</span>
            <span className="opacity-80">
              Crafted in India for clear financial decisions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
