import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock IntersectionObserver before tests
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<App />);
    const introSection = screen.getByRole('region', { name: /introduction/i });
    const aboutSection = screen.getByRole('region', { name: /about/i });
    const timelineSection = screen.getByRole('region', { name: /timeline/i });
    
    expect(introSection).toBeInTheDocument();
    expect(aboutSection).toBeInTheDocument();
    expect(timelineSection).toBeInTheDocument();
  });

  it('renders all child components', () => {
    render(<App />);
    const sidebar = screen.getByRole('complementary');
    const mainContent = screen.getByRole('main');
    
    expect(sidebar).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
  });
});
