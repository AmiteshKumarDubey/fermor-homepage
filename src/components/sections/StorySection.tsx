"use client";

import React, { useState } from "react";
import { COPY } from "@/content/copy";
import { EmiMiniTool } from "@/components/story/EmiMiniTool";
import { StepUpCompare } from "@/components/story/StepUpCompare";
import { NetWorthTool } from "@/components/story/NetWorthTool";

export function StorySection() {
  const [activeChapter, setActiveChapter] = useState<string>("understand");

  const chapters = COPY.story.chapters;

  return (
    <section id="story" className="w-full py-16 md:py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-green)]" />
            <span>{COPY.story.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-normal text-[var(--text-ink)] tracking-tight">
            {COPY.story.heading}
          </h2>
          <p className="text-base text-[var(--text-muted)] font-sans leading-relaxed">
            {COPY.story.subheading}
          </p>
        </div>

        {/* Layout: Desktop Sticky Left Index, Right Interactive Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chapter Selector */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            {chapters.map((chap) => {
              const isActive = activeChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapter(chap.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--bg-card)] border-[var(--brand-green)] shadow-md"
                      : "bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 pb-1">
                    <span className={`font-serif-display text-2xl font-bold ${isActive ? "text-[var(--brand-green-text)]" : "text-[var(--text-muted)]"}`}>
                      {chap.number}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-[var(--text-ink)]">
                      {chap.title}
                    </h3>
                  </div>
                  <h4 className="font-serif-display text-base text-[var(--text-ink)] font-normal">
                    {chap.headline}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] font-sans pt-1 leading-relaxed">
                    {chap.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Interactive Mini-Tool */}
          <div className="lg:col-span-8 space-y-8">
            <div className="transition-all duration-300">
              {activeChapter === "understand" && <EmiMiniTool />}
              {activeChapter === "act" && <StepUpCompare />}
              {activeChapter === "grow" && <NetWorthTool />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
