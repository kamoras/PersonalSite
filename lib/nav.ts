export type SiteSection = { id: string; label: string };

// The homepage's sections, in order. The rail, top bar and mobile sheet all
// read from this list so they can't drift.
export const siteSections: SiteSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "community", label: "Mentorship" },
  { id: "contact", label: "Contact" },
];

// On the homepage sections are in-page anchors; elsewhere they link back
// home, except Writing, which has its own page.
export function sectionHref(id: string, onHome: boolean): string {
  if (id === "writing" && !onHome) return "/blog";
  return onHome ? `#${id}` : `/#${id}`;
}
