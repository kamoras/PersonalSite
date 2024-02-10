import React, { Component } from 'react'

export default class Timeline extends Component {
  render() {
    return (
      <div>
        <section className="colorlib-experience" data-section="timeline">
          <div className="colorlib-narrow-content">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                <span className="heading-meta">highlights</span>
                <h2 className="colorlib-heading animate-box">Timeline</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="timeline-centered">
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-5">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Senior Software Engineer at ThousandEyes (part of Cisco) <span>San Francisco, California (Remote) (April 2022 - Present)</span></h2>
                        <p>
ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance. My team works on the core ThousandEyes product, the Enterprise Agent. This agent collects network data, which it sends to a cloud backend, to create insightful views for customers. We make the entire internet as visible to the customer as their local network.

As a member of a team in hyper-growth mode, I have had to take ownership for every aspect of the software. After learning these systems, I quickly became a teacher and mentor for new engineers joining the team. After a few months, my team had grown so large that we split into two teams. 

It has been rewarding to be able to work at ThousandEyes, where I can take projects from conception through execution and own the effort end to end.
</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-3">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Senior Software Engineer at Datto <span>Norwalk, Connecticut (October 2019 - April 2022)</span></h2>
                        <p>Datto (NYSE: MSP) is a leader in supporting MSPs (managed service providers) in their mission to support small and medium businesses' IT needs. As a member of the BCDR (Business Continuity and Data Recovery) agents team, I maintain the software which performs backups of protected systems. A key concern for the project is creating fault tolerant, secure, cross-platform software (in modern C++) that will reliably create backups for our customers. Innovation is key as we continue to lead this growing industry.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInTop">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-4">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Software Development Engineer at PerkinElmer <span>Shelton, Connecticut (October 2018 - October 2019)</span></h2>
                        <p>As a software engineer at PerkinElmer I worked on a desktop app for Windows, called Syngistix. Development was done in C# and C++. We followed agile and TDD practices. Lots of work involved updating a legacy software product into something more modern. </p>
                        <p>Creator of the first PoC for PerkinElmer instrument cloud platform. I worked with minimal requirements and help, creating a first of its kind instrument cloud within the company. I learned many new technologies for cloud development, such as: kubernetes, docker, python flask, and node.js. I also taught my team how to use these technologies as I was learning them. </p>
                        <p>While working to modernize our software and tools, I was a leader in migrating to GitHub and TeamCity from Perforce and Jenkins.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-5">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Staff Software Engineer at Capgemini Engineering <span>Burlington, Massachusetts (June 2018 - October 2018)</span></h2>
                        <p>I worked on projects for ASML in Wilton, CT, focusing on embedded programming. The primary product that I worked on was EUV (extreme ultraviolet) lithography. </p>
                        <p>Languages used: C++ and Python. </p>
                        <p>Wrote software to improve the function of the "top" of ASML lithography devices. The top is responsible for the handling of the reticle, a piece of glass that light is passed through to etch the design of a semiconductor chip into a silicon wafer. These reticles must be moved in a clean environment within the device through complex robotics in order to prevent contamination from dust (which would ruin the pattern being etched).</p>
                        <p>Key challenges: process oriented development, involving systems that are NOT allowed to fail. Even the smallest change must undergo intense scrutiny.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-3">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Software Engineer II at Thermo Fisher Scientific <span>Guilford, Connecticut (May 2017 - June 2018)</span></h2>
                        <p>Full time member of the team maintaining genetic sequencing devices at the Ion Torrent division of Thermo Fisher. </p>
                        <p>Used Java to create robust user experiences and provide localization for use of our devices around the globe. </p>
                        <p>Maintained a C++ backend and consistently cut away at bottlenecks in the system since DNA sequencing is typically a very slow operation. Our next generation product is capable to running an entire sequence during a single work shift (8 hours), which is previously unheard of. </p>
                        <p>Selected Projects:</p>
                        <p>Ion Genestudio S5 Series software: Contributed regularly to the maintenance of this product lines including demo software for trade shows and regular bug fixes.</p>
                        <p>Genexus Integrated Sequencer: Worked on the instrument software for the very first Genexus prototype. This included C++ code for RFID tag reader, automated pipette robots, and a complex microfluidics system.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-4">
                        <i className="icon-pen2" />
                      </div>
                      <div className="timeline-label">
                        <h2>Software Engineer Intern at Thermo Fisher Scientific <span>Guilford, Connecticut (May 2016 - August 2016)</span></h2>
                        <p>Internship for the summer of 2016 working with a team of about 5 people maintaining the software for genetic sequencing devices by Ion Torrent</p>
                        <p>My responsibilities involved software development, troubleshooting technical issues with the machines, and the testing of both new hardware and software. During this time, I improved my skills in C++, Java, Python, and Linux. </p>
                        <p>Selected accomplishments: </p>
                        <p> - Researched, developed and delivered an on-screen keyboard in both Chinese and German.</p>
                      </div>
                    </div>
                  </article>
                  <article className="timeline-entry begin animate-box" data-animate-effect="fadeInBottom">
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-none">
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
