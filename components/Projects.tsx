import SectionHead from "./SectionHead";

type Project = {
  id: string;
  name: string;
  tagline: string;
  href: string;
  cta: string;
  description: string;
  sourcesLabel: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "civitas",
    name: "Civitas",
    cta: "Visit civitas-research.org",
    sourcesLabel: "Sources",
    tagline: "Read the Record",
    href: "https://civitas-research.org/",
    description:
      "An open source scorecard for every member of Congress, every president, and the sitting Supreme Court, built only from public records, plus state ballots and daily civic news. Scores come from published formulas, not AI. The whole site, language model included, runs on one Raspberry Pi 5 at home: no cloud hosting, no accounts, no outside money.",
    tags: ["FEC", "Congress.gov", "Voteview", "GovInfo", "Federal Register", "Lobbying (LDA)", "Oyez"],
  },
  {
    id: "spliced",
    name: "Spliced",
    cta: "Play today’s Spliced",
    sourcesLabel: "Built with",
    tagline: "Rebuild the Mix",
    href: "https://spliced.paramain.com",
    description:
      "A daily music puzzle on an 80s mixing desk. Three mystery songs are cut into clips and shuffled across its channels. Listen, swap, and splice each song back onto its own channel before your mistakes run out. Everyone gets the same puzzle each day.",
    tags: ["Web Audio API", "React", "dnd-kit", "Vite", "Vercel"],
  },
];

export default function Projects() {
  return (
    <section className="wrap sec" id="projects" data-track aria-labelledby="projects-heading">
      <SectionHead id="projects" title="Projects" />
      <div className="folios">
        {projects.map((project) => (
          <article key={project.id} className="folio reveal" aria-labelledby={`${project.id}-name`}>
            <p className="status steady">Live</p>
            <h3 id={`${project.id}-name`}>{project.name}</h3>
            <p className="tagline">{project.tagline}</p>
            <p className="desc">{project.description}</p>
            <p className="src meta">
              {project.sourcesLabel}: {project.tags.join(" · ")}
            </p>
            <p className="go">
              <a className="btn" href={project.href} target="_blank" rel="noopener noreferrer">
                {project.cta} <span className="arrow" aria-hidden="true">↗︎</span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
