import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div>      <section id="hero" className="min-h-screen" data-section="home">
        <div className="relative min-h-screen">
          <ul className="h-screen">
            <li className="h-full bg-cover bg-center relative" style={{backgroundImage: 'url(images/img_bg.jpg)'}}>
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="relative text-center text-white z-10">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold">Ryan Mack</h1>
                        <p>
                          <a 
                            className="inline-block px-8 py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1" 
                            href="https://docs.google.com/document/d/1X-YPeb9ckf2z2EqSZ3n-Gm812Scb5VYEu2f9UYFnihk/edit?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View CV <i className="icon-download4 ml-2" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>            <li className="h-full bg-cover bg-center relative" style={{backgroundImage: 'url(images/img_bg.jpg)'}}>
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="relative text-center text-white z-10">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold">A Software Engineer</h1>
                        <p>
                          <a 
                            className="inline-block px-8 py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1" 
                            href="https://github.com/ryan-mack" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Projects <i className="icon-briefcase3 ml-2" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
