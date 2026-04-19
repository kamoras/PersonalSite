export const heroContent = {
  eyebrow: "Senior Engineer · Cisco ThousandEyes",
  location: "Guilford, Connecticut",
  intro:
    "I build resilient platform and observability software for complex systems, with a focus on correctness, maintainability, and long-term operability.",
  stats: [
    { value: "9+", label: "years in production engineering" },
    { value: "7", label: "engineering roles shipped" },
    { value: "1", label: "granted patent with more pending" },
  ],
} as const;

export const aboutContent = {
  heading: "Shipping software that scales",
  paragraphs: [
    "I'm Ryan — a Senior Software Engineer at Cisco ThousandEyes leading development on the Enterprise Agent, the product that gives enterprises deep visibility into the performance of their networks and applications.",
    "Over the past decade I've worked across research labs, startups, and large-scale infrastructure teams, owning architecture, implementation, cross-functional delivery, and production support for systems that have to keep working under real pressure.",
  ],
  badges: ["Patent granted", "Patents pending"],
  skills: [
    {
      num: "01",
      title: "Platform Architecture",
      description:
        "Designing service boundaries, runtime behavior, and failure handling so systems stay understandable and resilient as they grow.",
      accentColor: "#60a5fa",
    },
    {
      num: "02",
      title: "Systems Engineering",
      description:
        "Deep production work in C++, Java, and Python across performance-critical, distributed, and platform-heavy environments.",
      accentColor: "#a78bfa",
    },
    {
      num: "03",
      title: "Cloud and Infrastructure",
      description:
        "Kubernetes, Docker, AWS, Linux, and gRPC with a practical bias toward operability, supportability, and clean rollout paths.",
      accentColor: "#34d399",
    },
    {
      num: "04",
      title: "Technical Leadership",
      description:
        "Driving cross-team initiatives from proposal to delivery while aligning stakeholders, mentoring engineers, and keeping execution grounded.",
      accentColor: "#fbbf24",
    },
  ],
  techGroups: [
    { label: "Languages", items: ["C++", "Java", "Python", "TypeScript", "C#", "Go"] },
    { label: "Infrastructure", items: ["Kubernetes", "Docker", "AWS", "Linux", "gRPC"] },
    { label: "Platforms", items: ["Linux", "Windows", "macOS", "Cisco IOS"] },
  ],
  education: [
    {
      degree: "M.S., Computer Science",
      school: "Georgia Institute of Technology",
      detail: "Specialization: Human-Computer Interaction",
      period: "Jan 2022 — Aug 2026",
      current: true,
    },
    {
      degree: "B.S.E., Computer Science and Engineering",
      school: "University of Connecticut",
      detail: null,
      period: "Aug 2013 — May 2017",
      current: false,
    },
  ],
} as const;

export const experienceItems = [
  {
    id: 1,
    title: "Senior Software Engineer II",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Nov 2024 — Present",
    logo: "/images/te.jpg",
    current: true,
    tags: ["C++", "Java", "Python"],
    description: [
      "Continuing to deliver major projects as a senior member of the Enterprise Agents engineering team.",
      "Leading high-impact work around platform support, operating-system coverage, and the long-term maintainability of the agent runtime.",
      "Driving cross-team execution and taking projects from architecture through delivery.",
    ],
  },
  {
    id: 2,
    title: "Senior Software Engineer I",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Apr 2022 — Nov 2024",
    logo: "/images/te.jpg",
    current: false,
    tags: ["C++", "Java", "Python", "Linux"],
    description: [
      "Owned broad areas of the ThousandEyes Enterprise Agent, the software that collects and ships network telemetry into the cloud backend.",
      "Became a core technical mentor for new engineers while taking responsibility for architecture, execution planning, and high-visibility cross-functional work.",
      "Led multi-phase projects involving stakeholder alignment, scope definition, implementation, and rollout coordination.",
    ],
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "Datto",
    location: "Norwalk, CT",
    period: "Oct 2019 — Apr 2022",
    logo: "/images/datto.jpg",
    current: false,
    tags: ["C++", "PHP", "Grafana"],
    description: [
      "Worked on the core Datto BCDR product during a period of rapid scale and operational maturity.",
      "Led OKRs and product improvements in C++ and PHP, using observability data and visualization tooling to drive engineering decisions.",
      "Helped evolve a young R&D effort into a more mature product while customer scale doubled and support burden dropped.",
    ],
  },
  {
    id: 4,
    title: "Software Development Engineer",
    company: "PerkinElmer",
    location: "Shelton, CT",
    period: "Oct 2018 — Oct 2019",
    logo: "/images/perkin.jpg",
    current: false,
    tags: ["C#", "C++", "Kubernetes", "Docker", "Python"],
    description: [
      "Modernized desktop software in C# and C++ with a stronger emphasis on maintainability, testing, and product quality.",
      "Built the first proof of concept for the company's instrument cloud platform using Kubernetes, Docker, Python Flask, and Node.js.",
    ],
  },
  {
    id: 5,
    title: "Staff Software Engineer",
    company: "Capgemini Engineering",
    location: "Burlington, MA",
    period: "Jun 2018 — Oct 2018",
    logo: "/images/capg.jpg",
    current: false,
    tags: ["C++", "Python", "Embedded"],
    description: [
      "Worked on embedded software for ASML lithography systems with a focus on precision hardware control.",
      "Improved robotics-oriented software responsible for handling reticles within complex semiconductor manufacturing equipment.",
    ],
  },
  {
    id: 6,
    title: "Software Engineer II",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2017 — Jun 2018",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["Java", "C++", "Linux"],
    description: [
      "Maintained sequencing-device software at Ion Torrent, working across Java user experiences and a C++ backend.",
      "Contributed to performance and usability improvements on next-generation products used by global customers.",
    ],
  },
  {
    id: 7,
    title: "Software Engineering Intern",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2016 — Aug 2016",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["C++", "Java", "Python"],
    description: [
      "Worked with a small team maintaining software for Ion Torrent sequencing devices across development, troubleshooting, and hardware validation.",
    ],
  },
] as const;

export const projectItems = [
  {
    name: "Civitas",
    subtitle: "Expose the Machine",
    href: "https://civitas.paramain.com/",
    status: "Live",
    summary:
      "A political transparency platform that aggregates public federal records to surface connections between campaign donations and legislative voting, with AI analysis running locally on a Raspberry Pi 5.",
    impact: [
      { value: "535", label: "Congress members scored" },
      { value: "47", label: "Presidents analyzed" },
      { value: "9", label: "SCOTUS justices" },
      { value: "Nightly", label: "Pipeline updates" },
    ],
    sources: ["FEC", "Congress.gov", "GovInfo", "Federal Register", "BLS", "Senate Lobbying"],
    detail:
      "Designed as an end-to-end product: ingestion, entity resolution, ranking logic, and public presentation with a strong constraint against unnecessary cloud dependencies.",
  },
] as const;

export const publicationItems = [
  {
    kind: "Article",
    title: "Enhancing Support for Multiple Platforms: A Comprehensive Analysis",
    href: "https://medium.com/thousandeyes-engineering/enhancing-support-for-multiple-platforms-a-comprehensive-analysis-9deea3e233a2",
    source: "ThousandEyes Engineering",
    outlet: "Medium",
    summary:
      "An engineering deep dive into the architectural and operational tradeoffs involved in expanding Enterprise Agent support across multiple operating systems.",
  },
  {
    kind: "Patent",
    title: "Integrated Active Network Performance Monitoring Across Vantage Points",
    href: "https://patentsgazette.uspto.gov/week08/OG/html/1543-4/US12562955-20260224.html",
    source: "Cisco Technology, Inc.",
    outlet: "Granted Feb 24, 2026",
    badge: "Granted",
    summary:
      "A technique for identifying unmonitored nodes across distributed networks and combining multiple collection strategies to diagnose root causes of performance degradation.",
    patentNumber: "US 12,562,955 B1",
  },
] as const;

export const communityContent = {
  mentorship:
    "I offer free 1:1 sessions for students and early-career engineers who want direct feedback on resumes, interviewing, career decisions, or breaking into software engineering.",
  volunteering: [
    {
      org: "Blue Horizon Sailing",
      role: "Technology Volunteer",
      period: "Jan 2026 — Present",
      current: true,
      description: "Providing technical support and expertise for the organization.",
    },
    {
      org: "Braven",
      role: "Volunteer Coach",
      period: "Oct 2023 — Present",
      current: true,
      description:
        "Supporting university students entering the workforce through mock interviews and career-readiness coaching.",
    },
    {
      org: "UConn Center for Career Development",
      role: "Advisor",
      period: "May 2017 — Jul 2024",
      current: false,
      description:
        "Mentored students through HuskyLink for seven years on resumes, interviewing, and early-career decision-making.",
    },
    {
      org: "Genesys Works Bay Area",
      role: "Volunteer",
      period: "Nov 2023 — Jan 2024",
      current: false,
      description: "Helped high school students with college essays and major selection.",
    },
  ],
} as const;
