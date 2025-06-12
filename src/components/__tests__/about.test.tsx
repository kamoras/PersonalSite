import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../about';

describe('About Component', () => {
  it('renders main headings', () => {
    render(<About />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Who Am I?')).toBeInTheDocument();
  });

  it('renders personal description', () => {
    render(<About />);
    
    expect(screen.getByText(/I'm Ryan, a senior software engineer at ThousandEyes/)).toBeInTheDocument();
    expect(screen.getByText(/My current work involves the Enterprise Agent/)).toBeInTheDocument();
  });

  it('renders all service sections', () => {
    render(<About />);
    
    const services = [
      'Software Design',
      'Cloud Engineering',
      'Data Systems',
      'Digital Strategy'
    ];

    services.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });  it('has proper animation classes', () => {
    render(<About />);

    const animatedElements = document.querySelectorAll('[class*="transform"]');
    expect(animatedElements.length).toBeGreaterThan(0);
    
    animatedElements.forEach(element => {
      expect(element).toHaveClass('transform', 'transition-all', 'duration-500');
    });

    const fadeElements = document.querySelectorAll('[class*="opacity-0"]');
    expect(fadeElements.length).toBeGreaterThan(0);
  });
});
