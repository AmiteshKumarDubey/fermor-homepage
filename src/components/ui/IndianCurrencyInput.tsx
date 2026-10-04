"use client";

import React, { useState } from "react";

interface IndianCurrencyInputProps {
  id?: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function formatIndianGrouping(val: number | string): string {
  if (val === "" || val === undefined || val === null) return "";
  const numStr = String(val).replace(/[^0-9]/g, "");
  if (!numStr) return "";
  const num = parseInt(numStr, 10);
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("en-IN").format(num);
}

export function parseIndianGrouping(formattedStr: string): number {
  const clean = formattedStr.replace(/[^0-9]/g, "");
  if (!clean) return 0;
  return parseInt(clean, 10);
}

export function IndianCurrencyInput({
  id,
  value,
  onChange,
  min = 0,
  max = 100000000,
  className = "",
}: IndianCurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState<string | null>(null);

  const formattedDisplay = displayValue !== null ? displayValue : formatIndianGrouping(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/[^0-9]/g, "");

    if (digitsOnly === "") {
      setDisplayValue("");
      return;
    }

    const numeric = parseInt(digitsOnly, 10);
    setDisplayValue(formatIndianGrouping(numeric));
    onChange(numeric);
  };

  const handleBlur = () => {
    const numeric = parseIndianGrouping(formattedDisplay);
    const clamped = Math.max(min, Math.min(max, numeric));
    setDisplayValue(null);
    onChange(clamped);
  };

  return (
    <div className="relative inline-flex items-center">
      <span className="absolute left-2.5 text-xs text-[var(--text-muted)] pointer-events-none">
        ₹
      </span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={formattedDisplay}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`pl-6 pr-2.5 py-1.5 text-xs font-sans tabular-nums bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-[var(--text-ink)] outline-none focus:border-[var(--brand-green)] ${className}`}
      />
    </div>
  );
}
