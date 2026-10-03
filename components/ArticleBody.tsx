"use client";

import { useEffect, useRef } from "react";

const NOTE_GAP = 14;

// Fills a note with its number and a copy of the footnote's content, built
// from DOM nodes rather than HTML strings.
function fillNote(note: HTMLElement, label: string, footnote: HTMLElement, keyHidden: boolean) {
  const key = document.createElement("span");
  key.className = "sn-k";
  key.textContent = label;
  if (keyHidden) key.setAttribute("aria-hidden", "true");
  const clone = footnote.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("a[data-footnote-backref]").forEach((a) => a.remove());
  note.replaceChildren(key, ...Array.from(clone.childNodes));
}

// The block an inline note opens beneath. Refs anywhere else (a table cell,
// a heading) keep their plain jump-to-Notes link.
function noteHost(ref: HTMLAnchorElement): HTMLElement | null {
  return ref.closest<HTMLElement>("p, li");
}

function footnoteFor(ref: HTMLAnchorElement): HTMLElement | null {
  const id = ref.getAttribute("href")?.slice(1);
  return id ? document.getElementById(id) : null;
}

// Renders an essay's sanitized HTML. On wide screens each footnote is also set
// in the margin beside its reference (Tufte-style sidenotes); on narrow ones a
// tapped reference expands its note inline under the paragraph. The Notes
// list at the end stays the canonical, accessible copy, so the margin copies
// are aria-hidden and their links are kept out of the tab order.
export default function ArticleBody({ html }: { html: string }) {
  const proseRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prose = proseRef.current;
    const margin = marginRef.current;
    if (!prose || !margin) return;
    const refs = Array.from(prose.querySelectorAll<HTMLAnchorElement>("a[data-footnote-ref]"));

    const marginVisible = () => getComputedStyle(margin).display !== "none";

    const layout = () => {
      margin.replaceChildren();
      if (!marginVisible()) {
        // Narrow layout: references expand their note in place, so say so.
        for (const ref of refs) {
          if (noteHost(ref) && !ref.hasAttribute("aria-expanded")) ref.setAttribute("aria-expanded", "false");
        }
        return;
      }
      // Wide layout (including after rotating a tablet): the margin carries the
      // notes, so drop any inline copies and the expandable state.
      prose.querySelectorAll(".inline-note").forEach((note) => note.remove());
      for (const ref of refs) {
        ref.removeAttribute("aria-expanded");
        ref.removeAttribute("aria-controls");
      }
      const base = margin.getBoundingClientRect().top;
      let floor = 0;
      const seen = new Set<string>();
      for (const ref of refs) {
        const footnote = footnoteFor(ref);
        if (!footnote || seen.has(footnote.id)) continue;
        seen.add(footnote.id);
        const note = document.createElement("div");
        note.className = "sidenote";
        note.dataset.for = footnote.id;
        fillNote(note, ref.textContent ?? "", footnote, false);
        note.querySelectorAll("a").forEach((a) => a.setAttribute("tabindex", "-1"));
        margin.appendChild(note);
        const top = Math.max(ref.getBoundingClientRect().top - base - 4, floor);
        note.style.top = `${top}px`;
        floor = top + note.offsetHeight + NOTE_GAP;
      }
    };

    const highlight = (ref: HTMLAnchorElement, on: boolean) => {
      const id = footnoteFor(ref)?.id;
      if (!id) return;
      margin.querySelector(`[data-for="${CSS.escape(id)}"]`)?.classList.toggle("hot", on);
    };

    const toggleInline = (ref: HTMLAnchorElement, footnote: HTMLElement, host: HTMLElement) => {
      const existing = prose.querySelector<HTMLElement>(`.inline-note[data-for="${CSS.escape(ref.id)}"]`);
      if (existing) {
        existing.remove();
        ref.setAttribute("aria-expanded", "false");
        ref.removeAttribute("aria-controls");
        return;
      }
      // role="note", not <aside>: an aside is a landmark, and every expanded
      // note would add one (duplicates when two refs share a footnote).
      const note = document.createElement("div");
      note.className = "inline-note";
      note.id = `${ref.id}-note`;
      note.dataset.for = ref.id;
      note.setAttribute("role", "note");
      note.setAttribute("aria-label", `Note ${ref.textContent ?? ""}`);
      fillNote(note, ref.textContent ?? "", footnote, true);
      // Inside a list item, so the note never becomes a direct child of <ul>/<ol>.
      if (host.tagName === "LI") host.append(note);
      else host.after(note);
      ref.setAttribute("aria-expanded", "true");
      ref.setAttribute("aria-controls", note.id);
    };

    const onClick = (e: MouseEvent) => {
      const ref = (e.target as Element).closest<HTMLAnchorElement>("a[data-footnote-ref]");
      if (!ref || marginVisible()) return;
      const footnote = footnoteFor(ref);
      const host = noteHost(ref);
      if (!footnote || !host) return;
      e.preventDefault();
      toggleInline(ref, footnote, host);
    };
    const onPoint = (e: Event) => {
      const ref = (e.target as Element).closest<HTMLAnchorElement>("a[data-footnote-ref]");
      if (ref) highlight(ref, e.type === "mouseover" || e.type === "focusin");
    };

    layout();
    document.fonts?.ready.then(layout);
    // Web fonts and late layout shifts move the references after mount.
    const observer = new ResizeObserver(layout);
    observer.observe(prose);
    prose.addEventListener("click", onClick);
    for (const type of ["mouseover", "mouseout", "focusin", "focusout"]) prose.addEventListener(type, onPoint);
    return () => {
      observer.disconnect();
      prose.removeEventListener("click", onClick);
      for (const type of ["mouseover", "mouseout", "focusin", "focusout"]) prose.removeEventListener(type, onPoint);
    };
  }, [html]);

  return (
    <>
      <div className="prose-col">
        <div ref={proseRef} className="prose" data-progress-of dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <aside ref={marginRef} className="sidenotes" aria-hidden="true" />
    </>
  );
}
