// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Sidebar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Priority: 1. Saved theme, 2. System preference, 3. Default to light
    let shouldUseDark = false;
    
    if (savedTheme) {
      shouldUseDark = savedTheme === 'dark';
    } else {
      shouldUseDark = prefersDark;
      // Save the system preference as the user's choice
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      setIsDark(false);
    }

    // Listen for manual changes to the dark class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          setIsDark(isDarkMode);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };  const toggleDarkMode = () => {
    // Get current state from DOM (most reliable source)
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    if (isDarkMode) {
      // Currently dark, switch to light
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      // Currently light, switch to dark
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Modern hamburger menu button */}      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        <div className="w-5 h-5 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Overlay with backdrop blur */}
      {isOpen && (
        <div
          data-testid="overlay"
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}      <aside
        className={`
          font-serif fixed top-0 left-0 h-screen w-72 z-40 overflow-y-auto
          bg-white dark:bg-gray-950 
          border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      ><div className="flex flex-col h-full">          {/* Modern profile section */}
          <div className="flex flex-col items-center pt-12 pb-8 px-6">
            <a 
              href="#" 
              className="relative group mb-6 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Go to top of page"
            >
              <div
                className="w-24 h-24 rounded-2xl bg-cover bg-center shadow-lg ring-2 ring-gray-100 dark:ring-gray-800 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                style={{ backgroundImage: 'url("/images/ryan.jpg")' }}
                role="img"
                aria-label="Ryan Mack profile picture"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <div className="text-center space-y-3">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                <a
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Ryan Mack
                </a>
              </h1>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <HiMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <a
                  href="mailto:mack.ryanm@gmail.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  mack.ryanm@gmail.com
                </a>
              </div>
            </div>
          </div>          {/* Modern navigation */}
          <nav className="flex-1 px-6" aria-label="Main navigation">
            <div className="space-y-1" role="list">
              {[
                { label: 'Introduction', href: '#introduction', section: 'introduction' },
                { label: 'About', href: '#about', section: 'about' },
                { label: 'Timeline', href: '#timeline', section: 'timeline' },
              ].map((item) => (
                <div key={item.section}>
                  <a
                    href={item.href}
                    data-nav-section={item.section}
                    className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200 border-l-3 border-transparent hover:border-gray-900 dark:hover:border-white hover:shadow-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const targetElement = document.getElementById(item.section);
                      if (targetElement) {
                        targetElement.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start' 
                        });
                      }
                      // Close mobile menu if open
                      if (isOpen) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </nav>

          {/* Modern footer section */}
          <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.github.com/kamoras"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ryan-mack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode} 
                aria-label="Toggle Dark Mode"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
