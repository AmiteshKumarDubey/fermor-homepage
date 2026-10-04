import React from "react";

export function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 
        [LOGO SVG SLOT]
        Replace the SVG below with the official Fermor green logo asset.
      */}
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--brand-green)] flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M4 6H20M4 6L10 12M4 6L8 2M10 12H24M10 12L16 18M16 18H24M16 18L20 22"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Wordmark */}
      <span className="font-semibold text-xl tracking-tight text-[var(--text-ink)] font-sans">
        Fermor
      </span>
    </div>
  );
}
