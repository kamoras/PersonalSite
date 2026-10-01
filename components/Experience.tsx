import Image from "next/image";
import SectionHead from "./SectionHead";

const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer II",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Nov 2024 – Present",
    logo: "/images/te.jpg",
    current: true,
    tags: ["C++", "Java", "Python"],
    description: [
      "Continuing to work on major projects as a senior member of the Enterprise Agents engineering team.",
      "Primarily work in C++, Java, and Python to deliver high-impact projects for the business. A key concern has been support for our software on new platforms and operating systems.",
      "Working cross-team and driving projects through completion are key skills in this role.",
    ],
  },
  {
    id: 2,
    title: "Senior Software Engineer I",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Apr 2022 – Nov 2024",
    logo: "/images/te.jpg",
    current: false,
    tags: ["C++", "Java", "Python", "Linux"],
    description: [
      "ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance. My team works on the core ThousandEyes product, the Enterprise Agent, which collects network data and sends it to a cloud backend to create insightful views for customers, making the entire internet as visible as a local network.",
      "As a member of a team in hyper-growth mode, I took ownership across the full stack. After mastering these systems, I quickly became a teacher and mentor for new engineers joining the team.",
      "Led large cross-functional projects: creating the solution architecture, earning stakeholder buy-in, scoping work, and executing side-by-side with my teammates while keeping stakeholders updated through each phase.",
    ],
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "Datto",
    location: "Norwalk, CT",
    period: "Oct 2019 – Apr 2022",
    logo: "/images/datto.jpg",
    current: false,
    tags: ["C++", "PHP", "Grafana"],
    description: [
      "Joined Datto, a rapidly growing startup, in 2019. A year later, watched as CEO Tim Weller rang the NYSE bell as the company went public (NYSE:MSP).",
      "Worked on the core Datto BCDR (backup and continuity) product using C++ and PHP, leading OKRs each quarter to enhance this central part of the business. Used data and visualizations like Grafana to drive development decisions.",
      "During my time at Datto, we doubled our customer base while reducing support ticket volume, evolving the product from a fledgling R&D project into a mature piece of software.",
    ],
  },
  {
    id: 4,
    title: "Software Development Engineer",
    company: "PerkinElmer",
    location: "Shelton, CT",
    period: "Oct 2018 – Oct 2019",
    logo: "/images/perkin.jpg",
    current: false,
    tags: ["C#", "C++", "Kubernetes", "Docker", "Python"],
    description: [
      "Worked on Syngistix, a Windows desktop app, in C# and C++, following agile and TDD practices. Modernized a legacy software product into something more maintainable.",
      "Creator of the first PoC for PerkinElmer's instrument cloud platform. Working with minimal requirements, I built a first-of-its-kind instrument cloud using Kubernetes, Docker, Python Flask, and Node.js, then taught my team the technologies as I learned them.",
    ],
  },
  {
    id: 5,
    title: "Staff Software Engineer",
    company: "Capgemini Engineering",
    location: "Burlington, MA",
    period: "Jun 2018 – Oct 2018",
    logo: "/images/capg.jpg",
    current: false,
    tags: ["C++", "Python", "Embedded"],
    description: [
      "Worked on projects for ASML in Wilton, CT, focusing on embedded programming for EUV (extreme ultraviolet) lithography systems.",
      "Wrote software to improve the function of the 'top' of ASML lithography devices, responsible for handling the reticle (the glass photomask used to etch semiconductor chip designs into silicon wafers) through complex robotics in a clean environment.",
    ],
  },
  {
    id: 6,
    title: "Software Engineer II",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2017 – Jun 2018",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["Java", "C++", "Linux"],
    description: [
      "Full-time member of the team maintaining genetic sequencing devices at the Ion Torrent division of Thermo Fisher.",
      "Used Java to create robust user experiences and provide localization for global customers. Maintained a C++ backend and consistently cut bottlenecks. Our next-generation product became capable of running an entire DNA sequence in a single work shift (8 hours), previously unheard of.",
    ],
  },
  {
    id: 7,
    title: "Software Engineering Intern",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2016 – Aug 2016",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["C++", "Java", "Python"],
    description: [
      "Internship working with a team of ~5 engineers maintaining software for Ion Torrent genetic sequencing devices. Responsibilities included software development, troubleshooting technical issues, and testing new hardware and software.",
    ],
  },
];

type Role = (typeof experiences)[number];


function RoleRow({ role }: { role: Role }) {
  return (
    <li className="row no-margin reveal">
      <div className="when meta">
        <Image className="logo" src={role.logo} alt="" width={80} height={80} />
        <span className="dates">{role.period}</span>
        {role.current && <span className="status">Current</span>}
        <span className="loc">{role.location}</span>
        <ul className="tags" aria-label="Technologies">
          {role.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="body">
        <h3>
          {role.title} <span className="at">at {role.company}</span>
        </h3>
        <div className={`exp-paras${role.description.length > 1 ? " split" : ""}`}>
          {role.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section className="wrap sec" id="experience" data-track aria-labelledby="experience-heading">
      <SectionHead id="experience" title="Experience" />
      <ol className="ledger exp">
        {experiences.map((role) => (
          <RoleRow key={role.id} role={role} />
        ))}
      </ol>
    </section>
  );
}
