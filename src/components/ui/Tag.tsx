import React from "react";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono-numbers font-medium bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-green)]" />
      {children}
    </span>
  );
}
