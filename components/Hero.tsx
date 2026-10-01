import Image from "next/image";
import CountUp from "./CountUp";
import PrideFlag from "./PrideFlag";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: 9, suffix: "+", label: "Years in industry" },
  { value: 5, suffix: "", label: "Companies" },
  { value: 7, suffix: "", label: "Engineering roles" },
];

// Server-rendered and unanimated (apart from the surname's CSS shimmer), so
// the name — the LCP element — paints with the first frame.
export default function Hero() {
  const [firstName, ...rest] = siteConfig.name.split(" ");

  return (
    <section className="wrap hero" aria-labelledby="name">
      <div className="hero-top">
        <PrideFlag title="Progress Pride flag, in support of LGBTQ+ Pride" className="pride-flag" />
      </div>

      <h1 className="name" id="name">
        {firstName} <em>{rest.join(" ")}</em>
      </h1>

      <div className="grid-margin hero-grid">
        <div>
          <p className="lede">
            I lead development on the <b>Enterprise Agent</b> at Cisco ThousandEyes, the product that makes network
            visibility possible for enterprises worldwide. I also run Civitas, a scorecard for Congress, presidents,
            and the Supreme Court, on a Raspberry Pi at home, and write about AI and open source.
          </p>
          <div className="actions">
            <a className="btn solid" href="#writing">
              Read the essays
            </a>
            <a className="textlink" href={siteConfig.resumeDocumentPath} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a className="textlink" href="#community">Free mentorship</a>
          </div>
          <dl className="hero-stats">
            {stats.map(({ value, suffix, label }) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd>
                  <CountUp value={value} suffix={suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero-margin" aria-label="Highlights">
          <Image className="portrait" src="/images/ryan.jpg" alt="Ryan Mack" width={240} height={240} priority />
          <div>
            <p className="mnote">
              <b>Patent granted</b>, Feb 24, 2026. US 12,562,955 B1, on network monitoring across vantage points.
            </p>
            <p className="mnote">
              <b>M.S. Computer Science</b>, Georgia Tech, specializing in Human-Computer Interaction.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
