"use client";

import React, { useState } from "react";
import { calculateNetWorth, formatRupee, formatRupeeCompact } from "@/lib/finance";
import { IndianCurrencyInput } from "@/components/ui/IndianCurrencyInput";
import { Tag } from "@/components/ui/Tag";

export function NetWorthTool() {
  const [savings, setSavings] = useState<number>(1500000);
  const [investments, setInvestments] = useState<number>(3500000);
  const [liabilities, setLiabilities] = useState<number>(2000000);

  const totalAssets = savings + investments;
  const netWorth = calculateNetWorth(totalAssets, liabilities);

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h4 className="font-bold text-base text-[var(--text-ink)] font-sans">
            Personal Net Worth Overview
          </h4>
          <p className="text-xs text-[var(--text-muted)] font-sans">
            Calculate what you own minus what you owe in real time
          </p>
        </div>
        <Tag>Example calculation</Tag>
      </div>

      {/* 3 Editable Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] font-sans">
        <div className="space-y-1.5">
          <label htmlFor="savings-input" className="block text-xs text-[var(--text-muted)]">
            Cash & Bank Savings
          </label>
          <IndianCurrencyInput
            id="savings-input"
            value={savings}
            onChange={(val) => setSavings(val)}
            min={0}
            max={50000000}
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="investments-input" className="block text-xs text-[var(--text-muted)]">
            Stocks & Mutual Funds
          </label>
          <IndianCurrencyInput
            id="investments-input"
            value={investments}
            onChange={(val) => setInvestments(val)}
            min={0}
            max={100000000}
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="liabilities-input" className="block text-xs text-[var(--text-muted)]">
            Loans & Credit Debt
          </label>
          <IndianCurrencyInput
            id="liabilities-input"
            value={liabilities}
            onChange={(val) => setLiabilities(val)}
            min={0}
            max={50000000}
            className="w-full"
          />
        </div>
      </div>

      {/* Output Summary Card */}
      <div className="p-5 bg-[var(--brand-green-subtle)] border border-[var(--border-medium)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
        <div>
          <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
            Your True Net Worth
          </span>
          <div className="text-3xl font-bold tabular-nums text-[var(--brand-green-text)] tracking-tight">
            {formatRupee(netWorth)}
          </div>
        </div>
        <div className="text-xs text-[var(--text-muted)] space-y-1 sm:text-right">
          <div>Total Assets: <strong className="text-[var(--text-ink)] tabular-nums">{formatRupeeCompact(totalAssets)}</strong></div>
          <div>Total Liabilities: <strong className="text-amber-600 dark:text-amber-400 tabular-nums">{formatRupeeCompact(liabilities)}</strong></div>
        </div>
      </div>
    </div>
  );
}
