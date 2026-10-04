"use client";

import React, { useState } from "react";
import { simulateStepUpSip, formatRupee, formatRupeeCompact } from "@/lib/finance";
import { Tag } from "@/components/ui/Tag";

export function StepUpCompare() {
  const [baseSip, setBaseSip] = useState<number>(10000);
  const [stepUpPct, setStepUpPct] = useState<number>(10);
  const [years, setYears] = useState<number>(10);

  const simulationData = simulateStepUpSip(baseSip, stepUpPct, years, 12);
  const lastYear = simulationData[simulationData.length - 1];
  const difference = lastYear.stepUpTotal - lastYear.standardTotal;

  const viewBoxWidth = 500;
  const viewBoxHeight = 200;
  const padding = 35;

  const maxVal = Math.max(...simulationData.map((d) => d.stepUpTotal), 100);

  const getX = (index: number) => padding + (index / (simulationData.length - 1)) * (viewBoxWidth - 2 * padding);
  const getY = (val: number) => viewBoxHeight - padding - (val / maxVal) * (viewBoxHeight - 2 * padding);

  const stdPoints = simulationData.map((d, i) => `${getX(i).toFixed(1)},${getY(d.standardTotal).toFixed(1)}`);
  const stepPoints = simulationData.map((d, i) => `${getX(i).toFixed(1)},${getY(d.stepUpTotal).toFixed(1)}`);

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-2xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h4 className="font-bold text-base text-[var(--text-ink)] font-sans">
            Standard SIP vs 10% Annual Step-Up
          </h4>
          <p className="text-xs text-[var(--text-muted)] font-sans">
            Increasing contributions each year drastically accelerates momentum
          </p>
        </div>
        <Tag>Comparison simulator</Tag>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)] font-sans">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Base Monthly SIP</span>
            <span className="font-semibold text-[var(--text-ink)] tabular-nums">{formatRupee(baseSip)}</span>
          </div>
          <input
            type="range"
            min="2000"
            max="50000"
            step="1000"
            value={baseSip}
            onChange={(e) => setBaseSip(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Annual Step-Up</span>
            <span className="font-semibold text-[var(--brand-green-text)] tabular-nums">+{stepUpPct}% / yr</span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            step="5"
            value={stepUpPct}
            onChange={(e) => setStepUpPct(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--text-muted)]">Duration</span>
            <span className="font-semibold text-[var(--text-ink)] tabular-nums">{years} Years</span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[var(--brand-green)] h-2 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Highlight Difference Banner */}
      <div className="p-4 bg-[var(--brand-green-subtle)] border border-[var(--border-subtle)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase font-medium">Extra Wealth Created</span>
          <div className="text-2xl font-bold tabular-nums text-[var(--brand-green-text)]">
            +{formatRupee(difference)}
          </div>
        </div>
        <div className="text-xs text-[var(--text-muted)] sm:text-right">
          <div>Step-Up Total: <strong className="text-[var(--brand-green-text)] tabular-nums">{formatRupeeCompact(lastYear.stepUpTotal)}</strong></div>
          <div>Standard Total: <strong className="text-[var(--text-ink)] tabular-nums">{formatRupeeCompact(lastYear.standardTotal)}</strong></div>
        </div>
      </div>

      {/* SVG Dual-Line Comparison Chart */}
      <div className="relative h-48 w-full bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-3 select-none">
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="w-full h-full">
          {/* Standard Path */}
          <path
            d={`M ${stdPoints.join(" L ")}`}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Step-up Path */}
          <path
            d={`M ${stepPoints.join(" L ")}`}
            fill="none"
            stroke="var(--brand-green)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* End Node Step Up */}
          <circle
            cx={getX(simulationData.length - 1)}
            cy={getY(lastYear.stepUpTotal)}
            r="5"
            fill="var(--brand-green)"
            stroke="var(--bg-card)"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute top-3 left-4 flex gap-4 text-xs font-sans">
          <span className="flex items-center gap-1.5 text-[var(--brand-green-text)] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-green)]" />
            {stepUpPct}% Step-Up SIP
          </span>
          <span className="flex items-center gap-1.5 text-[var(--text-muted)] font-medium">
            <span className="w-2.5 h-0.5 bg-[var(--text-muted)]" />
            Standard Fixed SIP
          </span>
        </div>
      </div>
    </div>
  );
}
