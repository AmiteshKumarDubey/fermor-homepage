"use client";

import React, { useState } from "react";
import { calculateEmi, formatRupee, formatRupeeCompact } from "@/lib/finance";
import { Tag } from "@/components/ui/Tag";

export function EmiMiniTool() {
  const [loan, setLoan] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);

  const emiResult = calculateEmi(loan, rate, tenure);

  const principalPct = Math.round((emiResult.principalAmount / emiResult.totalPayment) * 100) || 50;
  const interestPct = 100 - principalPct;

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h4 className="font-bold text-base text-[var(--text-ink)] font-sans">
            Home Loan EMI & Amortization
          </h4>
          <p className="text-xs text-[var(--text-muted)] font-sans">
            Break down principal vs interest for reducing-balance loans
          </p>
        </div>
        <Tag>Example calculation</Tag>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] font-sans">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Loan Amount</span>
            <span className="font-semibold text-[var(--text-ink)] tabular-nums">{formatRupeeCompact(loan)}</span>
          </div>
          <input
            type="range"
            min="500000"
            max="20000000"
            step="100000"
            value={loan}
            onChange={(e) => setLoan(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Interest Rate</span>
            <span className="font-semibold text-[var(--text-ink)] tabular-nums">{rate}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="15"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Tenure</span>
            <span className="font-semibold text-[var(--text-ink)] tabular-nums">{tenure} Yrs</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Output Summary & Stacked Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[var(--brand-green-subtle)] border border-[var(--border-subtle)] rounded-xl">
          <div>
            <span className="text-xs font-medium uppercase text-[var(--text-muted)] font-sans">
              Monthly EMI
            </span>
            <div className="text-2xl font-bold font-sans tabular-nums text-[var(--brand-green-text)]">
              {formatRupee(emiResult.monthlyEmi)} / mo
            </div>
          </div>
          <div className="text-left sm:text-right font-sans text-xs text-[var(--text-muted)]">
            <div>Total Interest: <strong className="text-[var(--text-ink)] tabular-nums">{formatRupeeCompact(emiResult.totalInterest)}</strong></div>
            <div>Total Payable: <strong className="text-[var(--text-ink)] tabular-nums">{formatRupeeCompact(emiResult.totalPayment)}</strong></div>
          </div>
        </div>

        {/* Stacked Principal vs Interest Bar */}
        <div className="space-y-1.5 font-sans">
          <div className="flex justify-between text-xs text-[var(--text-muted)]">
            <span>Principal ({principalPct}%)</span>
            <span>Interest ({interestPct}%)</span>
          </div>
          <div className="h-4 w-full bg-[var(--bg-surface)] rounded-full overflow-hidden flex border border-[var(--border-subtle)]">
            <div
              className="h-full bg-[var(--brand-green)] transition-all duration-300"
              style={{ width: `${principalPct}%` }}
              title={`Principal: ${formatRupee(emiResult.principalAmount)}`}
            />
            <div
              className="h-full bg-amber-500/70 dark:bg-amber-600/70 transition-all duration-300"
              style={{ width: `${interestPct}%` }}
              title={`Interest: ${formatRupee(emiResult.totalInterest)}`}
            />
          </div>
        </div>
      </div>

      {/* First 12 Months Amortization Schedule Table */}
      <div className="space-y-2">
        <h5 className="text-xs font-semibold text-[var(--text-ink)] font-sans uppercase tracking-wider">
          First 12 Months Amortization Schedule
        </h5>
        <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
          <table className="w-full text-xs font-sans tabular-nums text-left">
            <thead className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-medium">
              <tr>
                <th className="py-2.5 px-3">Month</th>
                <th className="py-2.5 px-3">EMI</th>
                <th className="py-2.5 px-3">Principal</th>
                <th className="py-2.5 px-3">Interest</th>
                <th className="py-2.5 px-3">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-ink)]">
              {emiResult.scheduleFirst12Months.map((m) => (
                <tr key={m.month} className="hover:bg-[var(--bg-surface)]/50 transition-colors">
                  <td className="py-2 px-3 font-medium">Month {m.month}</td>
                  <td className="py-2 px-3">{formatRupee(m.payment)}</td>
                  <td className="py-2 px-3 text-[var(--brand-green-text)] font-medium">{formatRupee(m.principal)}</td>
                  <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{formatRupee(m.interest)}</td>
                  <td className="py-2 px-3 text-[var(--text-muted)]">{formatRupee(m.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
