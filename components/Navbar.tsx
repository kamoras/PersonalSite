"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in the reading area of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    ["about", "experience", "publications", "projects", "community", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Focus trap, escape key, and body scroll lock for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    const firstFocusable = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstFocusable?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusable = Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const navBg =
    theme === "dark"
      ? scrolled
        ? "bg-[#100d09]/92 backdrop-blur-md border-b border-white/[0.06]"
        : "bg-transparent"
      : scrolled
      ? "bg-[#faf7f2]/92 backdrop-blur-md border-b border-black/[0.06]"
      : "bg-transparent";

  // Accessible muted text colors (meet 4.5:1 contrast)
  const textMuted = "text-[var(--text-muted)]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      {/* Scroll progress indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-[var(--color-gold)] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Logo — links to top of page */}
        <Link
          href="/"
          aria-label="Ryan Mack — back to top"
          className={`font-playfair italic text-lg font-semibold ${textMuted} hover:text-current transition-colors`}
        >
          rm
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-sm transition-colors tracking-wide ${
                  isActive ? "text-current font-medium" : `${textMuted} hover:text-current`
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-gold)] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="https://github.com/kamoras"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/ryan-mack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            {theme === "dark" ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
          </button>
          <a
            href="/documents/Ryan-M-Mack-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (PDF, opens in new tab)"
            className="btn-resume ml-2 px-4 py-1.5 text-sm rounded font-mono tracking-wide"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          className={`md:hidden p-2 rounded-md ${textMuted} hover:text-current transition-colors`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`md:hidden border-t ${
            theme === "dark"
              ? "border-white/[0.06] bg-[#100d09]/96"
              : "border-black/[0.06] bg-[#faf7f2]/96"
          } backdrop-blur-md`}
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm ${textMuted} hover:text-current transition-colors tracking-wide py-2`}
              >
                {link.label}
              </a>
            ))}
            <div className={`flex items-center gap-3 pt-2 border-t ${theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
              <a
                href="https://github.com/kamoras"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ryan-mack"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
              <a
                href="/documents/Ryan-M-Mack-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (PDF, opens in new tab)"
                className="btn-resume ml-auto px-4 py-2 text-sm rounded font-mono"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
