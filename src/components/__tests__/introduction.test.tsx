import React from 'react';
import { render, screen } from '@testing-library/react';
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
  });

  it('has proper section structure', () => {
    render(<Introduction />);
    
    const heroSection = document.getElementById('colorlib-hero');
    expect(heroSection).toHaveClass('js-fullheight');
    expect(heroSection).toHaveAttribute('data-section', 'home');
    
    const slides = document.querySelectorAll('.slides li');
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
    
    const slides = document.querySelectorAll('.slides > li');
    expect(slides.length).toBe(2);
  });

  it('has proper background images and overlay', () => {
    render(<Introduction />);
    
    const slides = document.querySelectorAll('.slides > li');
    slides.forEach(slide => {
      expect(slide).toHaveStyle({ backgroundImage: 'url(images/img_bg.jpg)' });
      expect(slide.querySelector('.overlay')).toBeInTheDocument();
    });
  });

  it('has proper flex layout classes', () => {
    render(<Introduction />);
    
    expect(document.querySelector('.js-fullheight')).toBeInTheDocument();
    expect(document.querySelector('.slider-text-inner')).toBeInTheDocument();
    expect(document.querySelector('.slider-text')).toBeInTheDocument();
  });
});
