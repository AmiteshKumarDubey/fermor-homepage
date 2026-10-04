import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between p-6">
      <div className="max-w-6xl mx-auto w-full">
        <Logo />
      </div>

      <main className="max-w-md mx-auto text-center space-y-6 py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)] font-mono text-2xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-serif-display text-[var(--text-ink)]">
            Calculation Not Found
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed">
            The financial calculator or guide page you requested does not exist or has been relocated.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0F1A14] bg-[var(--brand-green)] hover:bg-[var(--brand-green-hover)] rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </main>

      <footer className="text-center text-xs font-mono text-[var(--text-muted)]">
        © {new Date().getFullYear()} Fermor. Transparent Financial Tools.
      </footer>
    </div>
  );
}
