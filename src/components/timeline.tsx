// src/components/Timeline.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';

interface TimelineEntry {
  title: string;
  company: string;
  date: string;
  description: string[];
  color: number;
  animationEffect?: string;
}

const Timeline: React.FC = () => {
  const timelineEntries: TimelineEntry[] = [
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

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<boolean[]>(
    new Array(timelineEntries.length).fill(false)
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
    }, { threshold: 0.1 });

    refs.current.forEach((ref) => ref && observer.observe(ref));
    return () => refs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  return (
    <section
      className="font-serif py-16 bg-gray-50 dark:bg-gray-800"
      id="timeline"
      data-section="timeline"
      role="region"
      aria-label="timeline"
    >
      <div className="max-w-4xl mx-auto px-4 py-8" data-testid="timeline-content">
        <div className="mb-12">
          <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Highlights</span>
          <h2 className="text-3xl font-bold mt-2 mb-4 dark:text-white">Timeline</h2>
        </div>

        <div className="space-y-8" role="list">
          {timelineEntries.map((entry, index) => (
            <article
              key={index}
              ref={(el) => (refs.current[index] = el as HTMLDivElement | null)}
              className={`relative pl-10 border-l-4 border-black dark:border-white transition-all duration-700 ease-out transform ${
                visibleEntries[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              data-testid="timeline-entry"
            >
              <div className="relative" data-testid="timeline-entry-inner">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md" data-testid="timeline-label">
                  <span className="text-gray-500 dark:text-gray-400 mb-2 block" data-testid="timeline-date">
                    {entry.date}
                  </span>
                  <div className="flex justify-between items-baseline mb-2">
                    <h2 className="text-xl font-bold mb-2 dark:text-white">{entry.title} at {entry.company}</h2>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300" data-testid="timeline-description">
                    {entry.description.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
