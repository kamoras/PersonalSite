// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Sidebar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Burger menu button (mobile only) */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Dark overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          font-serif fixed top-0 left-0 h-screen w-64 z-40
          bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col items-center py-8">
            <div
              className="w-32 h-32 rounded-full bg-cover bg-center mb-4 border-4 border-gray-200"
              style={{ backgroundImage: 'url("images/ryan.jpg")' }}
              role="img"
              aria-label="Ryan Mack profile picture"
            />
            <h1 className="text-2xl font-bold mb-2">
              <a
                href="/"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Ryan Mack
              </a>
            </h1>
            <div className="flex items-center text-sm">
              <HiMail className="mr-2" />
              <a
                href="mailto:mack.ryanm@gmail.com"
                className="hover:text-gray-500 transition-colors duration-300"
              >
                mack.ryanm@gmail.com
              </a>
            </div>
          </div>

          <nav className="mt-8 px-4" aria-label="Main navigation">
            <ul className="space-y-2" role="list">
              {[
                { label: 'Introduction', href: '#introduction', section: 'introduction' },
                { label: 'About', href: '#about', section: 'about' },
                { label: 'Timeline', href: '#timeline', section: 'timeline' },
              ].map((item) => (
                <li key={item.section}>
                  <a
                    href={item.href}
                    data-nav-section={item.section}
                    className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-300 rounded-lg transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto px-4 pb-4 flex items-center justify-between">
            <ul className="flex space-x-4" role="list">
              <li>
                <a
                  href="https://www.github.com/kamoras"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-gray-600 transition-colors duration-300"
                >
                  <FaGithub className="text-xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ryan-mack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </li>
            </ul>
            <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
              {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
