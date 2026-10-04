"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Search, Compass, Sun, Moon, Sparkles, X, ArrowRight } from "lucide-react";

export interface PresetPayload {
  goal: number;
  years: number;
  returnRate: number;
  inflation: number;
  start: number;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset?: (preset: PresetPayload) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectPreset }: CommandPaletteProps) {
  const { setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent or dispatch
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    // Presets
    {
      type: "preset",
      category: "Calculators & Presets",
      label: "Buy a ₹50L Home (15 Yrs)",
      icon: Sparkles,
      action: () => {
        onSelectPreset?.({ goal: 5000000, years: 15, returnRate: 12, inflation: 6, start: 500000 });
        scrollToId("tools");
      },
    },
    {
      type: "preset",
      category: "Calculators & Presets",
      label: "Retire in 25 Years (₹3 Cr Target)",
      icon: Sparkles,
      action: () => {
        onSelectPreset?.({ goal: 30000000, years: 25, returnRate: 12, inflation: 6, start: 1000000 });
        scrollToId("tools");
      },
    },
    {
      type: "preset",
      category: "Calculators & Presets",
      label: "Save ₹10L in 5 Years",
      icon: Sparkles,
      action: () => {
        onSelectPreset?.({ goal: 1000000, years: 5, returnRate: 12, inflation: 6, start: 0 });
        scrollToId("tools");
      },
    },
    {
      type: "preset",
      category: "Calculators & Presets",
      label: "First ₹1 Cr Target (10 Yrs)",
      icon: Sparkles,
      action: () => {
        onSelectPreset?.({ goal: 10000000, years: 10, returnRate: 12, inflation: 6, start: 0 });
        scrollToId("tools");
      },
    },

    // Navigation
    {
      type: "nav",
      category: "Jump to Section",
      label: "Momentum Playground (SIP Tool)",
      icon: Compass,
      action: () => scrollToId("tools"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Understand. Act. Grow. (Interactive Story)",
      icon: Compass,
      action: () => scrollToId("story"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Where are you in life? (Life Stages)",
      icon: Compass,
      action: () => scrollToId("life-stage"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Privacy Audit & Network Counter",
      icon: Compass,
      action: () => scrollToId("privacy"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Our 5 Engineering Principles",
      icon: Compass,
      action: () => scrollToId("principles"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Frequently Asked Questions",
      icon: Compass,
      action: () => scrollToId("faq"),
    },
    {
      type: "nav",
      category: "Jump to Section",
      label: "Join Waitlist",
      icon: Compass,
      action: () => scrollToId("waitlist"),
    },

    // Theme
    {
      type: "theme",
      category: "Preferences",
      label: "Switch to Light Theme",
      icon: Sun,
      action: () => setTheme("light"),
    },
    {
      type: "theme",
      category: "Preferences",
      label: "Switch to Dark Theme",
      icon: Moon,
      action: () => setTheme("dark"),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToId = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] gap-3">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or calculator preset..."
            className="flex-1 bg-transparent text-base text-[var(--text-ink)] placeholder-[var(--text-muted)] outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-surface)]"
            aria-label="Close Command Palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              No matching commands or presets found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between gap-3 text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--brand-green-subtle)] text-[var(--brand-green-text)] font-medium"
                      : "text-[var(--text-ink)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--brand-green-text)]" : "text-[var(--text-muted)]"}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-numbers opacity-60">
                    <span>{item.category}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono-numbers">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px]">↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px]">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px]">ESC</kbd> Close</span>
          </div>
          <span className="hidden sm:inline">Fermor Command Engine</span>
        </div>
      </div>
    </div>
  );
}
