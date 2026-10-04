import React from "react";
import { formatRupee } from "@/lib/finance";

interface FormulaBreakdownProps {
  goalAmount: number;
  years: number;
  expectedReturn: number;
  inflationRate: number;
  startingAmount: number;
  requiredSip: number;
  realValueToday: number;
}

export function FormulaBreakdown({
  goalAmount,
  years,
  expectedReturn,
  inflationRate,
  startingAmount,
  requiredSip,
  realValueToday,
}: FormulaBreakdownProps) {
  const n = years * 12;
  const i = expectedReturn / 12 / 100;
  const startFv = Math.round(startingAmount * Math.pow(1 + i, n));
  const remainingGoal = Math.max(0, goalAmount - startFv);
  const fvFactor = i === 0 ? n : ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-5 font-mono-numbers text-xs space-y-4 transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <h4 className="font-semibold text-sm text-[var(--text-ink)]">
          Step-by-Step Arithmetic Working
        </h4>
        <span className="px-2 py-0.5 rounded text-[11px] bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)] font-mono">
          Annuity-Due Convention
        </span>
      </div>

      <div className="p-3 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] leading-relaxed">
        <strong>Convention Note:</strong> Calculated using monthly payments invested at the <em>beginning</em> of each period (annuity-due), matching standard Indian mutual fund SIP execution dates.
      </div>

      <div className="space-y-3 divide-y divide-[var(--border-subtle)]">
        {/* Step 1 */}
        <div className="pt-2 space-y-1">
          <div className="text-[var(--text-muted)]">Step 1: Monthly interest rate (i)</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            i = annual_return / 12 / 100 = {expectedReturn}% / 1200 = <span className="text-[var(--brand-green-text)]">{i.toFixed(6)}</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 2: Total compounding periods (n)</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            n = years × 12 = {years} × 12 = <span className="text-[var(--brand-green-text)]">{n} months</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 3: Future Value of initial starting lump sum</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            FV_start = start × (1 + i)^n = {formatRupee(startingAmount)} × (1 + {i.toFixed(4)})^{n} = <span className="text-[var(--brand-green-text)]">{formatRupee(startFv)}</span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 4: Remaining Target Goal</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            Remaining = Goal - FV_start = {formatRupee(goalAmount)} - {formatRupee(startFv)} = <span className="text-[var(--brand-green-text)]">{formatRupee(remainingGoal)}</span>
          </div>
        </div>

        {/* Step 5 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 5: Annuity-due future value multiplier</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            FV_factor = [((1 + i)^n - 1) / i] × (1 + i) = <span className="text-[var(--brand-green-text)]">{fvFactor.toFixed(4)}</span>
          </div>
        </div>

        {/* Step 6 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 6: Required Monthly SIP (P)</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            P = Remaining / FV_factor = {formatRupee(remainingGoal)} / {fvFactor.toFixed(4)} = <strong className="text-[var(--brand-green-text)] text-base">{formatRupee(requiredSip)}</strong>
          </div>
        </div>

        {/* Step 7 */}
        <div className="pt-3 space-y-1">
          <div className="text-[var(--text-muted)]">Step 7: Purchasing power in today&apos;s rupees (Inflation adjustment)</div>
          <div className="text-[var(--text-ink)] font-mono text-sm">
            Real Value = Goal / (1 + inflation/100)^years = {formatRupee(goalAmount)} / (1 + {inflationRate/100})^{years} = <span className="text-[var(--brand-green-text)]">{formatRupee(realValueToday)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
