"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { YearlyGrowthPoint, formatRupeeCompact, formatRupee } from "@/lib/finance";
import { COPY } from "@/content/copy";

interface GrowthChartSvgProps {
  yearlyBreakdown: YearlyGrowthPoint[];
  compact?: boolean;
}

export function GrowthChartSvg({ yearlyBreakdown, compact = false }: GrowthChartSvgProps) {
  const [hoveredPoint, setHoveredPoint] = useState<YearlyGrowthPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  if (!yearlyBreakdown || yearlyBreakdown.length === 0) return null;

  const viewBoxWidth = 500;
  const viewBoxHeight = compact ? 180 : 230;
  const paddingX = 45;
  const paddingY = compact ? 20 : 30;

  const maxVal = Math.max(
    ...yearlyBreakdown.map((p) => Math.max(p.total, p.invested)),
    1000
  );

  const pointsCount = yearlyBreakdown.length;

  const getX = (index: number) => {
    if (pointsCount <= 1) return paddingX;
    return paddingX + (index / (pointsCount - 1)) * (viewBoxWidth - 2 * paddingX);
  };

  const getY = (val: number) => {
    const usableHeight = viewBoxHeight - 2 * paddingY;
    return viewBoxHeight - paddingY - (val / maxVal) * usableHeight;
  };

  // Fixed 1-point-per-year path points
  const totalPoints = yearlyBreakdown.map((p, i) => `${getX(i).toFixed(1)},${getY(p.total).toFixed(1)}`);
  const investedPoints = yearlyBreakdown.map((p, i) => `${getX(i).toFixed(1)},${getY(p.invested).toFixed(1)}`);

  const totalPathD = `M ${totalPoints.join(" L ")}`;
  const investedPathD = `M ${investedPoints.join(" L ")}`;

  // Area under total growth curve
  const areaD = `M ${getX(0)},${viewBoxHeight - paddingY} L ${totalPoints.join(" L ")} L ${getX(pointsCount - 1)},${viewBoxHeight - paddingY} Z`;

  // Endpoint node (Year N)
  const lastIndex = pointsCount - 1;
  const endpointX = getX(lastIndex);
  const endpointY = getY(yearlyBreakdown[lastIndex].total);

  // Grid lines
  const gridYCount = 3;
  const gridLines = Array.from({ length: gridYCount + 1 }).map((_, idx) => {
    const val = (maxVal / gridYCount) * idx;
    const y = getY(val);
    return { val, y };
  });

  return (
    <div className={`relative w-full ${compact ? "h-48" : "aspect-[2/1] sm:aspect-[2.2/1]"} bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-4 flex flex-col justify-between select-none`}>
      {/* Chart Title & Legend (Geist sans font) */}
      <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[var(--border-subtle)]">
        <span className="text-[var(--text-ink)] font-semibold">Growth Projection</span>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-green)] inline-block" />
            <span className="text-[var(--text-ink)] font-medium">{COPY.playground.outputs.portfolioValue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[var(--text-muted)] inline-block" />
            <span className="text-[var(--text-muted)] font-medium">{COPY.playground.outputs.totalInvestment}</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 w-full pt-1">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--brand-green)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLines.map((g, idx) => (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={g.y}
                x2={viewBoxWidth - paddingX}
                y2={g.y}
                stroke="var(--border-subtle)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={paddingX - 6}
                y={g.y + 3}
                fill="var(--text-muted)"
                fontSize="9"
                fontFamily="var(--font-sans)"
                className="tabular-nums"
                textAnchor="end"
              >
                {formatRupeeCompact(g.val)}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaD} fill="url(#growthAreaGradient)" />

          {/* Invested Path */}
          <motion.path
            d={investedPathD}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Total Path (Animate initial draw only via pathLength, no morph interpolation) */}
          <motion.path
            d={totalPathD}
            fill="none"
            stroke="var(--brand-green)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Endpoint Node Only (No intermediate dots) */}
          <circle
            cx={endpointX}
            cy={endpointY}
            r="4.5"
            fill="var(--brand-green)"
            stroke="var(--bg-card)"
            strokeWidth="2"
          />

          {/* Interactive Hover Area overlay */}
          {yearlyBreakdown.map((p, i) => {
            const x = getX(i);
            const yTotal = getY(p.total);
            const isHovered = hoveredPoint?.year === p.year;

            return (
              <g key={i}>
                <rect
                  x={x - 15}
                  y={0}
                  width={30}
                  height={viewBoxHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredPoint(p);
                    setHoverPos({ x, y: yTotal });
                  }}
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    setHoverPos(null);
                  }}
                />
                {isHovered && (
                  <>
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={viewBoxHeight - paddingY}
                      stroke="var(--brand-green)"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                    />
                    <circle
                      cx={x}
                      cy={yTotal}
                      r="6"
                      fill="var(--brand-green)"
                      stroke="var(--bg-card)"
                      strokeWidth="2"
                    />
                  </>
                )}
                {/* Year Labels on X Axis */}
                {!compact && (i === 0 || i === pointsCount - 1 || i === Math.floor(pointsCount / 2)) && (
                  <text
                    x={x}
                    y={viewBoxHeight - 6}
                    fill="var(--text-muted)"
                    fontSize="10"
                    fontFamily="var(--font-sans)"
                    className="tabular-nums"
                    textAnchor="middle"
                  >
                    Yr {p.year}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && hoverPos && (
          <div
            className="absolute z-20 pointer-events-none bg-[var(--bg-card)] border border-[var(--border-medium)] px-3 py-2 rounded-lg shadow-xl text-xs font-sans space-y-1 transform -translate-x-1/2 -translate-y-full -mt-2"
            style={{
              left: `${(hoverPos.x / viewBoxWidth) * 100}%`,
              top: `${(hoverPos.y / viewBoxHeight) * 100}%`,
            }}
          >
            <div className="font-semibold text-[var(--text-ink)] pb-1 border-b border-[var(--border-subtle)]">
              Year {hoveredPoint.year}
            </div>
            <div className="flex justify-between gap-4 text-[var(--text-muted)]">
              <span>{COPY.playground.outputs.portfolioValue}:</span>
              <span className="text-[var(--brand-green-text)] font-semibold tabular-nums">{formatRupee(hoveredPoint.total)}</span>
            </div>
            <div className="flex justify-between gap-4 text-[var(--text-muted)]">
              <span>{COPY.playground.outputs.totalInvestment}:</span>
              <span className="text-[var(--text-ink)] tabular-nums">{formatRupee(hoveredPoint.invested)}</span>
            </div>
            <div className="flex justify-between gap-4 text-[var(--text-muted)]">
              <span>{COPY.playground.outputs.estimatedReturns}:</span>
              <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">+{formatRupee(hoveredPoint.growth)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
