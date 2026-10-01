import SectionHead from "./SectionHead";

const articles = [
  {
    title: "Reducing Toil: Concrete Strategies for Sustainable Velocity",
    href: "https://medium.com/thousandeyes-engineering/reducing-toil-concrete-strategies-for-sustainable-velocity-a45e43d9e385",
    description:
      "How consolidating fragmented C++ release pipelines and automating cross-platform agent performance validation reclaimed engineering time, and why toil reduction belongs in the roadmap rather than the margins.",
  },
  {
    title: "Enhancing Support for Multiple Platforms: A Comprehensive Analysis",
    href: "https://medium.com/thousandeyes-engineering/enhancing-support-for-multiple-platforms-a-comprehensive-analysis-9deea3e233a2",
    description:
      "An in-depth analysis of the engineering challenges and architectural strategies behind expanding Enterprise Agent platform support across operating systems at fleet scale.",
  },
];

const newTab = <span className="sr-only"> (opens in new tab)</span>;

export default function Publications() {
  return (
    <section className="wrap sec" id="publications" data-track aria-labelledby="publications-heading">
      <SectionHead id="publications" title="Publications" />
      <div className="pubs">
        <article className="patent reveal" aria-labelledby="patent-title">
          <div>
            <p className="label">
              Patent · Granted Feb 24, 2026
            </p>
            <p className="patent-no">
              <span className="sr-only">US patent </span>US 12,562,955 B1
            </p>
            <h3 id="patent-title">
              <a
                href="https://patentsgazette.uspto.gov/week08/OG/html/1543-4/US12562955-20260224.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Integrated Active Network Performance Monitoring Across Vantage Points
                {newTab}
              </a>
              <span className="ext" aria-hidden="true" />
            </h3>
            <p className="abs">
              A technique for identifying nodes lacking monitoring agents across distributed networks and combining
              data from multiple collection strategies to diagnose the root causes of network performance
              degradation.
            </p>
            <p className="pm meta">
              <span>Cisco Technology, Inc.</span>
              <span>USPTO Official Gazette</span>
            </p>
          </div>
          <div>
            <p className="mnote">Additional patents are pending.</p>
          </div>
        </article>
        <div className="articles">
          {articles.map(({ title, href, description }) => (
            <article key={href} className="reveal">
              <p className="meta">ThousandEyes Engineering, on Medium</p>
              <h3>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {title}
                  {newTab}
                </a>
                <span className="ext" aria-hidden="true" />
              </h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
