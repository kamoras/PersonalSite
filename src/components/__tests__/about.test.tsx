import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../about';

describe('About Component', () => {  it('renders main section with proper structure', () => {
    render(<About />);
    
    const section = screen.getByRole('region', { name: /about/i });
    expect(section).toHaveAttribute('data-section', 'about');
    expect(section).toHaveClass('font-serif', 'py-24', 'bg-white', 'dark:bg-gray-900');
  });

  it('renders who am I section with proper content', () => {
    render(<About />);
    
    expect(screen.getByText('Who Am I?')).toBeInTheDocument();
    expect(screen.getByText(/I'm Ryan, a senior software engineer at Cisco ThousandEyes/)).toBeInTheDocument();
    const description = screen.getByText(/My current work involves the ThousandEyes Enterprise Agent/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-600', 'dark:text-gray-300');
  });

  it('renders all expertise tiles with proper structure', () => {
    render(<About />);
    
    const tiles = [
      { title: 'Software Design', desc: 'Expert in designing scalable software architectures and implementing robust solutions.' },
      { title: 'Cloud Engineering', desc: 'Experienced in cloud infrastructure and distributed systems.' },
      { title: 'Data Systems', desc: 'Proficient in designing and implementing efficient data storage solutions.' },
      { title: 'Digital Strategy', desc: 'Strategic thinker with a focus on delivering business value through technology.' }
    ];

    tiles.forEach((tile) => {
      const tileTitle = screen.getByText(tile.title);
      expect(tileTitle).toBeInTheDocument();
      expect(tileTitle).toHaveClass('text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white');
      
      const tileDesc = screen.getByText(tile.desc);
      expect(tileDesc).toBeInTheDocument();
      expect(tileDesc).toHaveClass('text-gray-600', 'dark:text-gray-300');
    });
  });

  it('has proper modern styling for skill cards', () => {
    render(<About />);

    const skillCards = screen.getAllByText(/^(Software Design|Cloud Engineering|Data Systems|Digital Strategy)$/).map(title => 
      title.closest('div.group')
    );
    
    skillCards.forEach(card => {
      expect(card).toHaveClass('group', 'p-8', 'bg-white', 'dark:bg-gray-800', 'rounded-2xl');
    });
  });
});
