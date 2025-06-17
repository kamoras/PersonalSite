// src/components/Introduction.tsx
import React, { useEffect, useState } from 'react';

const Introduction: React.FC = () => {
  const slides = [
    {
      title: 'Ryan Mack',
      buttonText: 'View Resume',
      buttonHref: '/documents/Ryan-M-Mack-Resume.pdf',
    },
    {
      title: 'Innovator, Problem Solver, Engineer',
      buttonText: 'View Projects',
      buttonHref: 'https://github.com/kamoras',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      const timeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsFadingOut(false);
      }, 500);
      return () => clearTimeout(timeout);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div
      className="intro-background font-serif relative min-h-screen text-white dark:text-white"
      style={{ 
        minHeight: '100vh',
        width: '100%'
      }}
      data-section="home"
      id="introduction"
      role="region"
      aria-label="introduction"    >
      <div 
        className="absolute inset-0 bg-black z-10" 
        style={{ opacity: 0.5 }}
      />

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>          <a
            href={slide.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              {slide.buttonText}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Introduction;