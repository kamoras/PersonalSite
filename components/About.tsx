import SectionHead from "./SectionHead";

const practices = [
  {
    title: "Software Design",
    description:
      "Architect systems that survive production. From API contracts to deployment topology, designing for correctness, maintainability, and scale from day one.",
  },
  {
    title: "Systems Programming",
    description:
      "Deep expertise in C++, Java, and Python across a decade of production engineering: performance-critical code, memory management, and embedded systems.",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Building and operating distributed systems at enterprise scale on Kubernetes, Docker, and AWS. Comfortable owning infrastructure end to end.",
  },
  {
    title: "Technical Leadership",
    description:
      "Leading cross-functional projects from architecture to delivery: stakeholder alignment, mentoring engineers, and driving execution in high-growth teams.",
  },
];

const toolkit = [
  { label: "Languages", items: "C++, Java, Python, TypeScript, C#, Go" },
  { label: "Infrastructure", items: "Kubernetes, Docker, AWS, gRPC" },
  { label: "Platforms", items: "Linux, Windows, macOS, Cisco IOS" },
];

const education = [
  {
    degree: "M.S., Computer Science",
    school: "Georgia Institute of Technology",
    detail: "Specialization: Human-Computer Interaction",
    period: "Jan 2022 – Aug 2026",
    credentialUrl: "https://www.parchment.com/lp/award/ded1d8e1-c469-4ee3-afdb-89df135911c3",
  },
  {
    degree: "B.S.E., Computer Science and Engineering",
    school: "University of Connecticut",
    detail: null,
    period: "Aug 2013 – May 2017",
    credentialUrl: null,
  },
];

export default function About() {
  return (
    <section className="wrap sec" id="about" data-track aria-labelledby="about-heading">
      <SectionHead id="about" title="About" />
      <div className="grid-margin about-body">
        <div className="reveal">
          <div className="bio">
            <p>
              I&rsquo;m Ryan, a Senior Software Engineer at <b>Cisco ThousandEyes</b>. I lead development on the
              Enterprise Agent, the software customers run inside their own networks to measure the paths to the apps
              and services they depend on.
            </p>
            <p>
              Over nine years across research labs, startups, and Cisco-scale infrastructure, I&rsquo;ve owned every
              phase of the development lifecycle: inventing new systems with{" "}
              <b>a granted patent and patents pending</b>, scaling production software to thousands of customers, and
              mentoring the next generation of engineers.
            </p>
          </div>
          <ul className="practice">
            {practices.map(({ title, description }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="reveal" aria-label="Education and toolkit">
          <h3 className="label margin-h">Education</h3>
          <ul className="edu">
            {education.map(({ degree, school, detail, period, credentialUrl }) => (
              <li key={school}>
                <b>
                  {credentialUrl ? (
                    <a className="inline-link" href={credentialUrl} target="_blank" rel="noopener noreferrer">
                      {degree}
                      <span className="ext" aria-hidden="true" />
                      <span className="sr-only"> (verified credential on Parchment, opens in new tab)</span>
                    </a>
                  ) : (
                    degree
                  )}
                </b>
                <span>{school}</span>
                {detail && <span>{detail}</span>}
                <span className="meta">{period}</span>
              </li>
            ))}
          </ul>
          <div className="kit">
            <h3 className="label margin-h">Toolkit</h3>
            <dl>
              {toolkit.map(({ label, items }) => (
                <div key={label} className="contents">
                  <dt>{label}</dt>
                  <dd>{items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
