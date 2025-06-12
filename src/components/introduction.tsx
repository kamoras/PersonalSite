// src/components/Introduction.tsx
import React, { useEffect, useState } from 'react';

const Introduction: React.FC = () => {
  const slides = [
    {
      title: 'Ryan Mack',
      buttonText: 'View CV',
      buttonHref:
        'https://docs.google.com/document/d/1X-YPeb9ckf2z2EqSZ3n-Gm812Scb5VYEu2f9UYFnihk/edit?usp=sharing',
      iconClass: 'icon-download4',
    },
    {
      title: 'Innovator, Problem Solver, Engineer',
      buttonText: 'View Projects',
      buttonHref: 'https://github.com/ryan-mack',
      iconClass: 'icon-briefcase3',
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
    <section
      className="font-serif relative min-h-screen bg-cover bg-center text-white dark:text-white"
      style={{ backgroundImage: 'url("images/penn.avif")' }}
      data-section="home"
      id="introduction"
      role="region"
      aria-label="introduction"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>
          <a
            href={slide.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-blue-700 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {slide.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Introduction;