// src/components/Timeline.tsx
/**
 * Timeline component displaying career history with company logos
 * 
 * Features:
 * - Intersection Observer for scroll animations
 * - Company logos with fallback handling
 * - Responsive design with dark/light mode support
 * - Continuous timeline line with positioned dots
 * 
 * Maintainability improvements:
 * - Extracted company logo mapping to constants
 * - Separated CompanyLogo into reusable component
 * - Configuration constants for easy tweaking
 * - Proper TypeScript typing throughout
 */
import React, { useEffect, useRef, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

interface TimelineEntry {
  title: string;
  company: string;
  date: string;
  description: string[];
  color: number;
  animationEffect?: string;
}

// Company logo mapping for better maintainability
const COMPANY_LOGOS: Record<string, string> = {
  'Thermo Fisher': '/images/thermo.jpg',
  'Capgemini': '/images/capg.jpg', 
  'PerkinElmer': '/images/perkin.jpg',
  'Datto': '/images/datto.jpg',
  'Cisco ThousandEyes': '/images/te.jpg',
} as const;

const DEFAULT_LOGO = '/images/thermo.jpg';

// Reusable component for company logos
interface CompanyLogoProps {
  company: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company }) => {
  const getCompanyLogo = (company: string): string => {
    const logoKey = Object.keys(COMPANY_LOGOS).find(key => company.includes(key));
    return logoKey ? COMPANY_LOGOS[logoKey] : DEFAULT_LOGO;
  };

  return (
    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
        <img 
          src={getCompanyLogo(company)} 
          alt={`${company} logo`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {

// Constants for timeline configuration
const TIMELINE_CONFIG = {
  ANIMATION_THRESHOLD: 0.1,
  INTERSECTION_OBSERVER_OPTIONS: { threshold: 0.1 },
  TIMELINE_SPACING: 'space-y-12',
  TIMELINE_PADDING: 'pb-12',
} as const;

// Timeline data - could be moved to a separate data file
const TIMELINE_ENTRIES: TimelineEntry[] = [
    {
      title: 'Senior Software Engineer II',
      company: 'Cisco ThousandEyes',
      date: 'San Francisco, California (Remote) (November 2024 - Present)',
      description: [
        'Continuing to work on major projects as a senior member of the Enterprise Agents engineering team. I primarily work in C++, Java, and Python to work on high-impact projects for the business. A key concern has been support for our software on new platforms and operating systems. Working cross-team and driving projects through completion have been key skills for me in this role.'
      ],
      color: 4,
    },
    {
      title: 'Senior Software Engineer I',
      company: 'Cisco ThousandEyes',
      date: 'San Francisco, California (Remote) (April 2022 - November 2024)',
      description: [
        'ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance. My team works on the core ThousandEyes product, the Enterprise Agent. This agent collects network data, which it sends to a cloud backend, to create insightful views for customers. We make the entire internet as visible to the customer as their local network.',
        'As a member of a team in hyper-growth mode, I have had to take ownership for every aspect of the software. After learning these systems, I quickly became a teacher and mentor for new engineers joining the team.',
        'During my time at ThousandEyes, I have led large projects. In leading these projects, I have to create a solution, get buy in from stakeholders, scope the work to be completed and work on those tasks side-by-side with my teammates. During the execution phase of a project, I am involved in keeping stakeholders updated on progress and continuing to share piecemeal results in an agile way.'
      ],
      color: 4,
    },
    {
      title: 'Senior Software Engineer',
      company: 'Datto',
      date: 'Norwalk, Connecticut (October 2019 - April 2022)',
      description: [
        'I joined Datto, a rapidly growing startup, in 2019. A year later, I watched as CEO Tim Weller rang the NYSE bell as the company went public (NYSE:MSP). I worked on the core software of Datto, the data backup and recovery product (BCDR). Using C++ and PHP, I led OKRs each quarter to enhance this central part of Datto\'s business. I used data to drive my development, reporting my successes in numerical terms using visualizations like Grafana. During my time at Datto, we doubled our customer base while reducing support ticket volume. The product evolved from a fledgling R&D project, into a mature piece of software.',
      ],
      color: 4,
    },
    {
      title: 'Software Development Engineer',
      company: 'PerkinElmer',
      date: 'Shelton, Connecticut (October 2018 - October 2019)',
      description: [
        'As a software engineer at PerkinElmer I worked on a desktop app for Windows, called Syngistix. Development was done in C# and C++. We followed agile and TDD practices. Lots of work involved updating a legacy software product into something more modern. ',
        'Creator of the first PoC for PerkinElmer instrument cloud platform. I worked with minimal requirements and help, creating a first of its kind instrument cloud within the company. I learned many new technologies for cloud development, such as: kubernetes, docker, python flask, and node.js. I also taught my team how to use these technologies as I was learning them. '
      ],
      color: 4,
    },
    {
      title: 'Staff Software Engineer',
      company: 'Capgemini Engineering',
      date: 'Burlington, Massachusetts (June 2018 - October 2018)',
      description: [
        'I worked on projects for ASML in Wilton, CT, focusing on embedded programming. The primary product that I worked on was EUV (extreme ultraviolet) lithography. Languages used: C++ and Python.',
        'Wrote software to improve the function of the "top" of ASML lithography devices. The top is responsible for the handling of the reticle, a piece of glass that light is passed through to etch the design of a semiconductor chip into a silicon wafer. These reticles must be moved in a clean environment within the device through complex robotics in order to prevent contamination from dust (which would ruin the pattern being etched).',
      ],
      color: 4,
    },
    {
      title: 'Software Engineer II',
      company: 'Thermo Fisher Scientific',
      date: 'Guilford, Connecticut (May 2017 - June 2018)',
      description: [
        'Full time member of the team maintaining genetic sequencing devices at the Ion Torrent division of Thermo Fisher.',
        'Used Java to create robust user experiences and provide localization for use of our devices around the globe.',
        'Maintained a C++ backend and consistently cut away at bottlenecks in the system since DNA sequencing is typically a very slow operation. Our next generation product is capable to running an entire sequence during a single work shift (8 hours), which is previously unheard of.',
      ],
      color: 4,
    },
    {
      title: 'Software Engineering Intern',
      company: 'Thermo Fisher Scientific',
      date: 'Guilford, Connecticut (May 2016 - August 2016)',
      description: [
        'Internship for the summer of 2016 working with a team of about 5 people maintaining the software for genetic sequencing devices by Ion Torrent',
        'My responsibilities involved software development, troubleshooting technical issues with the machines, and the testing of both new hardware and software. During this time, I improved my skills in C++, Java, Python, and Linux. ',
      ],
      color: 4,
    },
  ];
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<boolean[]>(
    new Array(TIMELINE_ENTRIES.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = refs.current.findIndex((el) => el === entry.target);
        if (entry.isIntersecting && index !== -1) {
          setVisibleEntries((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      });
    }, TIMELINE_CONFIG.INTERSECTION_OBSERVER_OPTIONS);

    refs.current.forEach((ref) => ref && observer.observe(ref));
    return () => refs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);return (    <section
      className="font-serif py-24 bg-white dark:bg-gray-900"
      id="timeline"
      data-section="timeline"
      role="region"
      aria-label="timeline"
    >
      <div className="max-w-4xl mx-auto px-6 py-8" data-testid="timeline-content">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
            Career Journey
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
            Timeline
          </h2>
        </div>        {/* Timeline */}
        <div className={`relative ${TIMELINE_CONFIG.TIMELINE_PADDING}`}>
          {/* Timeline line - continuous vertical line centered with dots */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-900 dark:bg-white z-1"></div>
            <div className={TIMELINE_CONFIG.TIMELINE_SPACING} role="list">
            {TIMELINE_ENTRIES.map((entry: TimelineEntry, index: number) => (
              <article
                key={index}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                className={`relative pl-20 transition-all duration-700 ease-out transform ${
                  visibleEntries[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                data-testid="timeline-entry"
              >                {/* Timeline dot */}
                <div className="absolute left-8 top-8 w-4 h-4 bg-gray-900 dark:bg-white rounded-full shadow-lg z-20 -translate-x-2"></div>
                
                <div className="relative" data-testid="timeline-entry-inner">                  <div className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300" data-testid="timeline-label">                    {/* Company and Title - Responsive Layout */}
                    <div className="mb-4">
                      {/* Mobile Layout: Logo on top, text below */}
                      <div className="flex flex-col gap-4 sm:hidden">
                        <div className="flex justify-center">
                          <CompanyLogo company={entry.company} />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {entry.title}
                          </h3>
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {entry.company}
                          </p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400" data-testid="timeline-date">
                            <FaCalendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop Layout: Logo and text side by side */}
                      <div className="hidden sm:flex items-start gap-4">
                        <CompanyLogo company={entry.company} />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {entry.title}
                          </h3>
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {entry.company}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" data-testid="timeline-date">
                            <FaCalendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                      {/* Description */}
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed" data-testid="timeline-description">
                      {entry.description.map((paragraph: string, pIndex: number) => (
                        <p key={pIndex} className="mb-4 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>            ))}          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
