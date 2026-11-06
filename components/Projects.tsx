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
      "The public record of the U.S. federal government in one place: a record for every member of Congress, president and Supreme Court justice, with votes, bills, campaign money, stock trades and elections, each figure shown with its source. Members are compared with their peers measure by measure, never given a grade. The whole site, a small language model included, runs on one Raspberry Pi 5 at home: no cloud AI, no accounts, no outside money.",
    tags: ["FEC", "Congress.gov", "Voteview", "GovInfo", "Federal Register", "Lobbying (LDA)", "Oyez"],
  },
  {
    id: "hopline",
    name: "Hopline",
    cta: "Find your train",
    sourcesLabel: "Built with",
    tagline: "Where’s My Train?",
    href: "https://hopline.paramain.com",
    description:
      "Live trains, subways, buses, ferries and flights from Maine to Virginia on one map, merged from more than a dozen operators’ feeds. Type a train number or your station to see what’s due and how late it’s running. Delays are explained in the operator’s words, or by where the time was lost, never by a guess. No accounts, no cookies, no tracking; saved commutes stay in your browser.",
    tags: ["GTFS-Realtime", "Next.js", "MapLibre GL", "OpenFreeMap", "Vercel"],
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
      <p className="section-foot">
        <a className="textlink" href="https://www.paramain.com" target="_blank" rel="noopener noreferrer">
          More projects, big and small, at paramain.com <span aria-hidden="true">↗︎</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </p>
    </section>
  );
}
