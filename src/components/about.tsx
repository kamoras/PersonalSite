// src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <section
      className="font-serif py-20 bg-gray-50 dark:bg-gray-800"
      data-section="about"
      id="about"
      role="region"
      aria-label="about"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Who Am I?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm Ryan, a senior software engineer at Cisco ThousandEyes, specializing in enterprise software development.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My current work involves the ThousandEyes Enterprise Agent, which is critical for network monitoring and analysis.
              I have experience with a wide range of technologies and a passion for building scalable solutions. My work has spanned various domains
              and styles, from research projects (multiple patents pending) to maintenance of large-scale production systems. I'm equipped to participate
              in all aspects of the software development lifecycle, from design and architecture to implementation and deployment.
            </p>
          </div>

          <div data-aos="fade-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Software Design', desc: 'Expert in designing scalable software architectures and implementing robust solutions.' },
                { title: 'Cloud Engineering', desc: 'Experienced in cloud infrastructure and distributed systems.' },
                { title: 'Data Systems', desc: 'Proficient in designing and implementing efficient data storage solutions.' },
                { title: 'Digital Strategy', desc: 'Strategic thinker with a focus on delivering business value through technology.' },
              ].map((tile, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md transition hover:shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{tile.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{tile.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;