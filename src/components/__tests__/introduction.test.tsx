import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { act } from '@testing-library/react';
import Introduction from '../introduction';

describe('Introduction Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial slide content', async () => {
    render(<Introduction />);
    
    const heading = screen.getByRole('heading', { name: 'Ryan Mack' });
    expect(heading).toBeInTheDocument();
    
    const resumeLink = screen.getByRole('link', { name: 'View Resume' });
    expect(resumeLink).toHaveAttribute('href', '/documents/Ryan-M-Mack-Resume.pdf');
  });

  it('transitions to second slide after delay', async () => {
    render(<Introduction />);

    // Get initial state
    const initialHeading = screen.getByRole('heading', { name: 'Ryan Mack' });
    expect(initialHeading).toBeInTheDocument();

    // Advance timer and let React update state
    await act(async () => {
      vi.advanceTimersByTime(5500); // 5000ms interval + 500ms fade
    });
    
    // Final state checks
    expect(screen.getByText('Innovator, Problem Solver, Engineer')).toBeInTheDocument();
    const projectsLink = screen.getByRole('link', { name: 'View Projects' });
    expect(projectsLink).toHaveAttribute('href', 'https://github.com/kamoras');
  });

  it('has proper section structure and styling', () => {
    render(<Introduction />);
    
    const section = screen.getByRole('region', { name: /introduction/i });
    expect(section).toHaveAttribute('data-section', 'home');
    expect(section).toHaveClass('min-h-screen', 'relative');
      // Check for background overlay
    const overlay = section.querySelector('.bg-black');
    expect(overlay).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Introduction />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles slide transitions with proper opacity classes', async () => {
    render(<Introduction />);

    const slideContent = screen.getByText('Ryan Mack').closest('div');
    expect(slideContent).toHaveClass('transition-opacity', 'duration-500', 'ease-in-out', 'opacity-100');

    // Start transition and wait for state updates
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    // After first timer, content should be fading out
    const fadingContent = screen.getByText('Ryan Mack').closest('div');
    expect(fadingContent).toHaveClass('opacity-0');

    // Complete transition
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // After second timer, new content should be visible
    const newContent = screen.getByText('Innovator, Problem Solver, Engineer').closest('div');
    expect(newContent).toHaveClass('opacity-100');
  });
});
