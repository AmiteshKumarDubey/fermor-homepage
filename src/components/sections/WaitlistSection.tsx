"use client";

import React, { useState } from "react";
import { z } from "zod";
import { COPY } from "@/content/copy";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const clientWaitlistSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  planningGoal: z.enum(["Loan", "Investing", "Tax", "Retirement", "Other"]),
  honeypot: z.string().optional(),
});

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planningGoal, setPlanningGoal] = useState<"Loan" | "Investing" | "Tax" | "Retirement" | "Other">("Investing");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parseResult = clientWaitlistSchema.safeParse({ name, email, planningGoal, honeypot });

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      setErrors({ email: fieldErrors.email?.[0] });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || COPY.waitlist.errorMsg);
      }

      setIsSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : COPY.waitlist.errorMsg;
      setErrors({ general: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="w-full py-16 md:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="max-w-xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
              {COPY.waitlist.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-sans leading-relaxed">
              {COPY.waitlist.subtitle}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-[var(--brand-green-subtle)] border border-[var(--border-medium)] rounded-2xl flex items-center gap-4 text-[var(--brand-green-text)] font-sans animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 shrink-0 text-[var(--brand-green-text)]" />
              <div className="space-y-1">
                <h4 className="font-semibold text-base">You&apos;re on the early access list!</h4>
                <p className="text-xs text-[var(--text-muted)]">{COPY.waitlist.successMsg}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              {/* Honeypot anti-bot field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Do not fill this out if you are human:</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="waitlist-name" className="block text-xs font-medium text-[var(--text-ink)]">
                    {COPY.waitlist.nameLabel}
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--brand-green)] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="waitlist-email" className="block text-xs font-medium text-[var(--text-ink)]">
                    {COPY.waitlist.emailLabel}
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface)] border rounded-xl text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none transition-colors ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--brand-green)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Planning Select */}
              <div className="space-y-1.5">
                <label htmlFor="waitlist-goal" className="block text-xs font-medium text-[var(--text-ink)]">
                  {COPY.waitlist.planningLabel}
                </label>
                <select
                  id="waitlist-goal"
                  value={planningGoal}
                  onChange={(e) => setPlanningGoal(e.target.value as typeof planningGoal)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-ink)] outline-none focus:border-[var(--brand-green)] transition-colors cursor-pointer"
                >
                  <option value="Investing">Mutual Funds & Equity SIPs</option>
                  <option value="Loan">Home & Personal Loans (EMI)</option>
                  <option value="Tax">Income Tax Optimization (Old vs New)</option>
                  <option value="Retirement">Retirement & Passive Income (FIRE)</option>
                  <option value="Other">Other Financial Milestone</option>
                </select>
              </div>

              {errors.general && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Submit Button (WCAG AA: Solid brand green background with dark ink text) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-[#0F1A14] bg-[var(--brand-green)] hover:bg-[var(--brand-green-hover)] disabled:opacity-60 rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{COPY.waitlist.submitting}</span>
                  </>
                ) : (
                  <>
                    <span>{COPY.waitlist.submitBtn}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
