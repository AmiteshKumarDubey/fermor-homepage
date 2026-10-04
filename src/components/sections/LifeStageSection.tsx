"use client";

import React, { useState } from "react";
import { COPY } from "@/content/copy";
import { ExternalLink, HelpCircle, Sparkles } from "lucide-react";

export function LifeStageSection() {
  const [activeStageId, setActiveStageId] = useState<string>("first-salary");

  const stages = COPY.lifeStage.stages;
  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const featuredQuestion = currentStage.questions.find((q) => q.featured) || currentStage.questions[0];
  const sideQuestions = currentStage.questions.filter((q) => q !== featuredQuestion);

  return (
    <section id="life-stage" className="w-full py-16 md:py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-subtle)] pb-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
              {COPY.lifeStage.title}
            </h2>
            <p className="text-base text-[var(--text-muted)] font-sans leading-relaxed">
              {COPY.lifeStage.subtitle}
            </p>
          </div>

          {/* Segmented Control / Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-surface)] p-1.5 rounded-xl border border-[var(--border-subtle)] shrink-0">
            {stages.map((stg) => {
              const isActive = activeStageId === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageId(stg.id)}
                  className={`px-3.5 py-2 text-xs font-sans font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--bg-card)] text-[var(--brand-green-text)] shadow-sm font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-ink)]"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Varied Asymmetric Layout: 1 Featured Card + 2 Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Featured Large Question Card */}
          <div className="lg:col-span-7 bg-[var(--bg-card)] border-2 border-[var(--brand-green)] p-7 rounded-3xl space-y-6 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans font-medium bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Milestone Question</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[var(--text-ink)] font-normal leading-snug">
                &ldquo;{featuredQuestion.q}&rdquo;
              </h3>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
              <div>
                <span className="text-xs uppercase font-medium text-[var(--text-muted)] block">
                  Fermor Solution Tool
                </span>
                <span className="text-sm font-semibold text-[var(--text-ink)]">
                  {featuredQuestion.tool}
                </span>
              </div>
              <a
                href="https://fermor.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0F1A14] bg-[var(--brand-green)] hover:bg-[var(--brand-green-hover)] rounded-xl transition-all shadow-sm shrink-0"
              >
                <span>Available on fermor.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2 Smaller Side Question Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideQuestions.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-medium)] p-5 rounded-2xl space-y-3 shadow-xs hover:border-[var(--brand-green)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)]">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-serif-display text-lg text-[var(--text-ink)] font-normal leading-snug">
                    &ldquo;{item.q}&rdquo;
                  </h4>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-sans">
                  <span className="text-[var(--text-muted)] font-medium">{item.tool}</span>
                  <a
                    href="https://fermor.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--brand-green-text)] font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Available on fermor.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
