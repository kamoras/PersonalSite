import React from 'react';

interface TimelineEntry {
  title: string;
  date: string;
  description: string[];
  color: number;
  animationEffect?: string;
}

const Timeline: React.FC = () => {
  const timelineEntries: TimelineEntry[] = [
    {
      title: "Senior Software Engineer II at Cisco ThousandEyes",
      date: "San Francisco, California (Remote) (April 2022 - November 2022)",
      description: [
        "ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance. My team works on the core ThousandEyes product, the Enterprise Agent. This agent collects network data, which it sends to a cloud backend, to create insightful views for customers. We make the entire internet as visible to the customer as their local network.",
        "As a member of a team in hyper-growth mode, I have had to take ownership for every aspect of the software. After learning these systems, I quickly became a teacher and mentor for new engineers joining the team. After a few months, my team had grown so large that we split into two teams.",
        "It has been rewarding to be able to work at ThousandEyes, where I can take projects from conception through execution and own the effort end to end."
      ],
      color: 4
    },
    {
      title: "Senior Software Engineer at Datto",
      date: "Norwalk, Connecticut (October 2019 - April 2022)",
      description: [
        "I joined Datto, a rapidly growing startup, in 2019. A year later, I watched as CEO Tim Weller rang the NYSE bell as the company went public (NYSE:MSP). I worked on the core software of Datto, the data backup and recovery product (BCDR). Using C++ and PHP, I led OKRs each quarter to enhance this central part of Datto's business. I used data to drive my development, reporting my successes in numerical terms using visualizations like Grafana. During my time at Datto, we doubled our customer base while reducing support ticket volume. The product evolved from a fledgling R&D project, into a mature piece of software."
      ],
      color: 4,
      animationEffect: "fadeInTop"
    }
    // Add more entries as needed
  ];

  return (
    <div>      <section className="py-16 px-4 md:px-8" data-section="timeline" role="region" aria-label="timeline">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="text-center md:text-left transform transition-all duration-500 ease-out" data-animate-effect="fadeInLeft">
              <span className="uppercase tracking-wider text-gray-500 text-sm">highlights</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Timeline</h2>
            </div>
          </div>
          <div className="relative">
            <div className="w-full">
              <div className="relative border-l-2 border-gray-200 ml-6 md:ml-0 md:mx-auto" data-testid="timeline-container">
                {timelineEntries.map((entry, index) => (                  <article 
                    key={index} 
                    className="relative pl-8 pb-12 transform transition-all duration-500 ease-out"
                    data-animate-effect={entry.animationEffect || "fadeInLeft"}
                    data-testid="timeline-entry"
                  >
                    <div className="relative" data-testid="timeline-entry-inner">
                      <div 
                        className={`absolute left-[-2.5rem] w-12 h-12 rounded-full border-4 border-white bg-blue-${entry.color}00 flex items-center justify-center shadow-lg`} 
                        data-testid="timeline-icon"
                      >
                        <i className="text-white" />
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6" data-testid="timeline-label">
                        <h2 className="text-xl font-bold mb-2">
                          {entry.title} 
                          <span className="text-gray-600 text-sm font-normal ml-2 block md:inline">{entry.date}</span>
                        </h2>
                        {entry.description.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-700 mb-4 last:mb-0">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
                <article 
                  className="relative pl-8 transform transition-all duration-500 ease-out" 
                  data-testid="timeline-end-marker" 
                  data-animate-effect="fadeInBottom"
                >
                  <div className="relative" data-testid="timeline-entry-inner">
                    <div 
                      className="absolute left-[-2.5rem] w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg" 
                      data-testid="timeline-icon"
                    >
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
