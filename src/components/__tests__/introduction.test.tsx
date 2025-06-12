import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Introduction from '../introduction';

describe('Introduction Component', () => {
  it('renders name and title', () => {
    render(<Introduction />);
    
    // Name should be in the first slide heading
    const heading = screen.getByRole('heading', { name: 'Ryan Mack' });
    expect(heading).toBeInTheDocument();
    
    expect(screen.getByText('A Software Engineer')).toBeInTheDocument();
  });

  it('renders action buttons with correct links', () => {
    render(<Introduction />);
    
    const cvLink = screen.getByRole('link', { name: /View CV/i });
    expect(cvLink).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/1X-YPeb9ckf2z2EqSZ3n-Gm812Scb5VYEu2f9UYFnihk/edit?usp=sharing'
    );
    
    const projectsLink = screen.getByRole('link', { name: /View Projects/i });
    expect(projectsLink).toHaveAttribute('href', 'https://github.com/ryan-mack');
  });  it('has proper section structure', () => {
    render(<Introduction />);
    
    const heroSection = screen.getByRole('region', { name: /introduction/i });
    expect(heroSection).toHaveClass('min-h-screen');
    expect(heroSection).toHaveAttribute('data-section', 'home');
    
    const slides = screen.getAllByRole('listitem');
    expect(slides).toHaveLength(2);
  });

  it('has proper accessibility attributes', () => {
    render(<Introduction />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});

describe('Introduction Component', () => {
  it('renders name and title', () => {
    render(<Introduction />);
    
    expect(screen.getByText('Ryan Mack')).toBeInTheDocument();
    expect(screen.getByText('A Software Engineer')).toBeInTheDocument();
  });

  it('renders action buttons with correct links', () => {
    render(<Introduction />);
    
    const cvButton = screen.getByRole('link', { name: /View CV/i });
    const projectsButton = screen.getByRole('link', { name: /View Projects/i });
    
    expect(cvButton).toHaveAttribute('href', expect.stringContaining('docs.google.com'));
    expect(projectsButton).toHaveAttribute('href', 'https://github.com/ryan-mack');
  });
  it('renders all slider sections', () => {
    render(<Introduction />);
    
    const slides = screen.getAllByRole('listitem');
    expect(slides).toHaveLength(2);
    
    slides.forEach(slide => {
      expect(slide).toHaveClass('relative', 'min-h-screen', 'bg-cover', 'bg-center');
    });
  });

  it('has proper background images and overlay', () => {
    render(<Introduction />);
    
    const slides = screen.getAllByRole('listitem');
    slides.forEach(slide => {
      const overlay = within(slide).getByTestId('slide-overlay');
      expect(overlay).toHaveClass('absolute', 'inset-0', 'bg-black', 'bg-opacity-50');
    });
  });  it('has proper flex layout classes', () => {
    render(<Introduction />);

    const container = screen.getByRole('region', { name: /introduction/i });
    expect(container).toHaveClass('min-h-screen', 'relative');
    
    const contentContainers = screen.getAllByTestId('slide-content');
    contentContainers.forEach(content => {
      expect(content).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-screen', 'relative', 'text-center', 'text-white', 'z-10');
    });

    const buttonContainer = screen.getAllByTestId('action-buttons');
    buttonContainer.forEach(container => {
      expect(container).toHaveClass('flex', 'gap-4', 'mt-8');
    });
  });
});
