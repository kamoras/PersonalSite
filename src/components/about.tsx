import React from 'react';

const About: React.FC = () => {
  return (
    <div>      <section className="py-16 px-4 md:px-8" data-section="about">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="transform transition-all duration-500 ease-out" data-animate-effect="fadeInLeft">
              <div className="space-y-6">
                <div>
                  <span className="uppercase tracking-wider text-gray-500 text-sm">About Me</span>
                  <h2 className="text-3xl font-bold mt-2 mb-6">Who Am I?</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>I'm Ryan, a senior software engineer at ThousandEyes (part of Cisco) with a passion for providing equal access to tech.</p>
                    <p>My current work involves the Enterprise Agent at ThousandEyes. This software is designed to be a turn-key solution, which makes it simple for users to understand and react to network issues no matter where they are. This is increasingly important as companies transition away from traditional on-premise servers to the cloud (where visibility would normally be limited).</p>
                    <p>In my previous role, I worked at Datto, where I developed software to backup and secure small and medium businesses. Before that, at PerkinElmer, I created a proof of concept to transition the traditional ICP-OES instrument platform to a cloud-based design. I also worked at Thermo Fisher Scientific where I worked on genetic sequencing instruments. The goal was to take a multiday workflow that involved multiple instruments down to one single 8-hour workflow using a single machine.</p>
                    <p>I believe that simplicity is key when designing software for my customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="transform transition-all duration-500 ease-out" data-animate-effect="fadeInLeft">
              <div className="bg-blue-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block text-3xl text-blue-600 mb-4"><i className="icon-bulb" /></span>
                <h3 className="text-lg font-semibold text-gray-800">Software Design</h3>
              </div>
            </div>
            <div className="transform transition-all duration-500 ease-out" data-animate-effect="fadeInRight">
              <div className="bg-green-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block text-3xl text-green-600 mb-4"><i className="icon-globe-outline" /></span>
                <h3 className="text-lg font-semibold text-gray-800">Cloud Engineering</h3>
              </div>
            </div>
            <div className="transform transition-all duration-500 ease-out" data-animate-effect="fadeInTop">
              <div className="bg-purple-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block text-3xl text-purple-600 mb-4"><i className="icon-data" /></span>
                <h3 className="text-lg font-semibold text-gray-800">Data Systems</h3>
              </div>
            </div>
            <div className="transform transition-all duration-500 ease-out" data-animate-effect="fadeInBottom">
              <div className="bg-orange-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block text-3xl text-orange-600 mb-4"><i className="icon-phone3" /></span>
                <h3 className="text-lg font-semibold text-gray-800">Digital Strategy</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
