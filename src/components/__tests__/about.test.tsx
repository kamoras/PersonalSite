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
  });

  it('has proper animations classes', () => {
    render(<About />);

    const animatedElements = document.querySelectorAll('.animate-box');
    expect(animatedElements.length).toBeGreaterThan(0);
    
    const effects = ['fadeInLeft', 'fadeInRight', 'fadeInTop', 'fadeInBottom'];
    effects.forEach(effect => {
      expect(document.querySelector(`[data-animate-effect="${effect}"]`)).toBeInTheDocument();
    });
  });
});
