"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Github, Linkedin, Bluesky } from "./BrandIcons";
import { useTheme } from "./ThemeProvider";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
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

  const textMuted = "text-[var(--text-muted)]";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[10000] border-b border-[var(--color-card-border)] bg-[var(--color-bg)] md:backdrop-blur-md"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div 
        aria-hidden="true"
        className="absolute bottom-full left-0 right-0 h-[100px]"
        style={{ backgroundColor: "var(--color-bg)" }}
      />
      <div style={{ height: "env(safe-area-inset-top, 0px)" }} />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-[var(--color-gold)]"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link
          href="/"
          aria-label="Ryan Mack — back to top"
          className={`font-playfair italic text-lg font-semibold ${textMuted} hover:text-current transition-colors`}
        >
          rm
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith("#");
            const resolvedHref = isHashLink && !isHome ? `/${link.href}` : link.href;
            const isActive = isHashLink
              ? activeSection === link.href.slice(1)
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={resolvedHref}
                aria-current={isActive ? (isHashLink ? "location" : "page") : undefined}
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
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-1">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.links.bluesky}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky profile (opens in new tab)"
            className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
          >
            <Bluesky size={16} aria-hidden="true" />
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
            href={siteConfig.resumePagePath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume (opens in new tab)"
            className="btn-resume ml-2 px-4 py-1.5 text-sm rounded font-mono tracking-wide"
          >
            Resume
          </a>
        </div>

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
          className="md:hidden border-t border-[var(--color-card-border)] bg-[var(--color-bg)]/96 backdrop-blur-md"
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("#");
              const resolvedHref = isHashLink && !isHome ? `/${link.href}` : link.href;
              const isActive = isHashLink
                ? activeSection === link.href.slice(1)
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={resolvedHref}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? (isHashLink ? "location" : "page") : undefined}
                  className={`text-sm transition-colors tracking-wide py-2 ${
                    isActive ? "text-current font-medium" : `${textMuted} hover:text-current`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className={`flex items-center gap-3 pt-2 border-t ${theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.bluesky}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky profile (opens in new tab)"
                className={`p-2.5 rounded-md ${textMuted} hover:text-current transition-colors`}
              >
                <Bluesky size={18} aria-hidden="true" />
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
                href={siteConfig.resumePagePath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume (opens in new tab)"
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
