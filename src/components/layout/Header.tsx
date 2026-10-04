"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/components/layout/ThemeProvider";
import { COPY } from "@/content/copy";
import { Command, Moon, Sun, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("tools");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["tools", "story", "privacy", "principles"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "tools", label: COPY.nav.tools, href: "#tools" },
    { id: "story", label: COPY.nav.howItWorks, href: "#story" },
    { id: "privacy", label: COPY.nav.privacy, href: "#privacy" },
    { id: "principles", label: COPY.nav.principles, href: "#principles" },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--brand-green)] focus:text-[#0F1A14] focus:font-semibold focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] py-3 shadow-xs"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2" aria-label="Fermor Homepage">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "bg-[var(--bg-card)] text-[var(--text-ink)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-ink)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-numbers text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md hover:border-[var(--brand-green)] hover:text-[var(--text-ink)] transition-colors"
              title="Open Command Palette (Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Command className="w-3.5 h-3.5" />
              <span>{COPY.nav.commandHint}</span>
            </button>

            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              title="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <a
              href="#playground"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#0F1A14] bg-[var(--brand-green)] hover:bg-[var(--brand-green-hover)] rounded-lg transition-colors shadow-xs active:scale-[0.98]"
            >
              {COPY.nav.startFree}
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-lg text-[var(--text-ink)] hover:bg-[var(--bg-surface)]"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex flex-col px-6 py-6 transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
            <Logo />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[var(--text-ink)] hover:bg-[var(--bg-surface)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif-display font-medium text-[var(--text-ink)] hover:text-[var(--brand-green-text)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full py-3 px-4 text-center font-mono-numbers text-sm text-[var(--text-muted)] bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] flex items-center justify-center gap-2"
            >
              <Command className="w-4 h-4" />
              <span>Search & Presets (Ctrl + K)</span>
            </button>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 text-center font-medium text-[#0F1A14] bg-[var(--brand-green)] rounded-lg shadow-sm"
            >
              {COPY.nav.startFree}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
