// src/components/About.tsx
import React from 'react';
import { FaCode, FaCloud, FaDatabase, FaLightbulb } from 'react-icons/fa';

const About: React.FC = () => {  return (    <section
      className="font-serif py-24 bg-white dark:bg-gray-900"
      data-section="about"
      id="about"
      role="region"
      aria-label="about"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="text-center">
            <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
              About Me
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
              Who Am I?
            </h2>
          </div>

          {/* Bio Section */}
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              I'm Ryan, a senior software engineer at Cisco ThousandEyes, specializing in enterprise software development.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              My current work involves the ThousandEyes Enterprise Agent, which is critical for network monitoring and analysis.
              I have experience with a wide range of technologies and a passion for building scalable solutions. My work has spanned various domains
              and styles, from research projects (multiple patents pending) to maintenance of large-scale production systems. I'm equipped to participate
              in all aspects of the software development lifecycle, from design and architecture to implementation and deployment.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                icon: FaCode, 
                title: 'Software Design', 
                desc: 'Expert in designing scalable software architectures and implementing robust solutions.',
                color: 'text-blue-500'
              },
              { 
                icon: FaCloud, 
                title: 'Cloud Engineering', 
                desc: 'Experienced in cloud infrastructure and distributed systems.',
                color: 'text-green-500'
              },
              { 
                icon: FaDatabase, 
                title: 'Data Systems', 
                desc: 'Proficient in designing and implementing efficient data storage solutions.',
                color: 'text-purple-500'
              },
              { 
                icon: FaLightbulb, 
                title: 'Digital Strategy', 
                desc: 'Strategic thinker with a focus on delivering business value through technology.',
                color: 'text-orange-500'
              },
            ].map((skill, idx) => (              <div
                key={idx}
                className="group p-8 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-600/30 group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;