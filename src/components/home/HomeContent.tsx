"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette, PresetPayload } from "@/components/layout/CommandPalette";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { WorkingBand } from "@/components/sections/WorkingBand";
import { LifeStageSection } from "@/components/sections/LifeStageSection";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

export function HomeContent() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSelectPreset = (preset: PresetPayload) => {
    window.dispatchEvent(
      new CustomEvent("load-playground-preset", { detail: preset })
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--selection-bg)]">
      {/* 1. Header */}
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      <main id="main-content" className="flex-1">
        {/* 2. Hero + Momentum Playground */}
        <HeroSection />

        {/* 3. Understand. Act. Grow. Scroll Story */}
        <StorySection />

        {/* 4. Show the Working Statement Band */}
        <WorkingBand />

        {/* 5. Where are you in life? Life-Stage Navigator */}
        <LifeStageSection />

        {/* 6. Privacy, Proven Network Counter */}
        <PrivacySection />

        {/* 7. Engineering Principles */}
        <PrinciplesSection />

        {/* 8. FAQ Disclosure Accordion */}
        <FaqSection />

        {/* 9. Final CTA with Waitlist Form */}
        <WaitlistSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
