import BookingLink from "./BookingLink";
import SectionHead from "./SectionHead";

const volunteering = [
  {
    org: "Blue Horizon Sailing",
    role: "Technology Volunteer",
    period: "Jan 2026 – Present",
    current: true,
    description: "Providing technical support and expertise for the organization.",
  },
  {
    org: "Braven",
    role: "Volunteer Coach",
    period: "Oct 2023 – Present",
    current: true,
    description:
      "Mock interview events for university students entering the workforce at San Jose State and CUNY City College.",
  },
  {
    org: "UConn Center for Career Development",
    role: "Advisor",
    period: "May 2017 – Jul 2024",
    current: false,
    description:
      "7 years mentoring students through HuskyLink: career guidance, resume reviews, and mock interviews.",
  },
  {
    org: "Genesys Works Bay Area",
    role: "Volunteer",
    period: "Nov 2023 – Jan 2024",
    current: false,
    description: "Helped high school students with college essays and major selection.",
  },
];

const topics = ["Breaking into tech", "Career growth", "Interview prep", "Resume reviews", "Navigating the industry", "Code & architecture"];

export default function Community() {
  return (
    <section className="wrap sec" id="community" data-track aria-labelledby="community-heading">
      <SectionHead id="community" title="Mentorship & community" />
      <div className="offer reveal">
        <div>
          <p className="big">
            Free 1:1 sessions for anyone looking to break into software engineering, grow their career, or
            navigate the industry.
          </p>
          <p className="sub">No catch. Book a time that works for you.</p>
          <ul className="topics" aria-label="Session topics">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <div className="go">
            <BookingLink className="btn solid">
              Book a free session
            </BookingLink>
            <span className="meta">Scheduling through Calendly</span>
          </div>
        </div>
      </div>

      <h3 className="label vol-head">Volunteer work</h3>
      <ol className="ledger">
        {volunteering.map((v) => (
          <li key={v.org} className="row no-margin reveal">
            <div className="when meta">
              {v.period}
              {v.current && (
                <>
                  <br />
                  <span className="status">Ongoing</span>
                </>
              )}
            </div>
            <div className="body">
              <h4>
                {v.org} <span className="at">· {v.role}</span>
              </h4>
              <p>{v.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
