import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div>      <div>
        <button 
          className="fixed z-50 top-4 right-4 p-2 bg-white rounded-md shadow-lg md:hidden" 
          data-toggle="collapse" 
          data-target="#navbar" 
          aria-expanded="false"
          aria-controls="navbar"
          role="navigation"
        >
          <i className="icon-menu text-2xl" />
        </button>
        <aside className="fixed h-full w-64 bg-white border-r shadow-lg z-40">
          <div className="flex flex-col items-center py-8">
            <div 
              className="w-32 h-32 rounded-full bg-cover bg-center mb-4 border-4 border-gray-200" 
              style={{backgroundImage: 'url(images/ryan.jpg)'}} 
              role="img" 
              aria-label="Ryan Mack profile picture"
            />
            <h1 className="text-2xl font-bold mb-2">
              <a href="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Ryan Mack</a>
            </h1>
            <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
              <i className="icon-mail mr-2"></i>
              <a 
                href="mailto:mack.ryanm@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm"
              >
                mack.ryanm@gmail.com
              </a>
            </div>
          </div>
          <nav className="mt-8" role="navigation">
            <div className="px-4">
              <ul className="space-y-2">
                <li>
                  <a href="#home" 
                    data-nav-section="home" 
                    className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300"
                  >
                    Introduction
                  </a>
                </li>
                <li>
                  <a href="#about" 
                    data-nav-section="about"
                    className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a href="#timeline" 
                    data-nav-section="timeline"
                    className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <nav className="colorlib-social">
            <ul>
              <li>
                <a 
                  href="https://www.github.com/ryan-mack" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="icon-github"></i>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/ryan-mack" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="icon-linkedin2"></i>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
