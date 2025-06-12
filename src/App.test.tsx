import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const nameElements = screen.getAllByText(/Ryan Mack/i);
    expect(nameElements.length).toBeGreaterThan(0);
  });

  it('renders all main sections', () => {
    render(<App />);
    
    // Check for main container elements
    expect(document.getElementById('colorlib-page')).toBeInTheDocument();
    expect(document.getElementById('container-wrap')).toBeInTheDocument();
    expect(document.getElementById('colorlib-main')).toBeInTheDocument();
  });

  it('renders all child components', () => {
    render(<App />);
    
    // Check for About section
    expect(screen.getByText('Who Am I?')).toBeInTheDocument();
    
    // Check for Timeline section
    const timelineElements = screen.getAllByText('Timeline');
    expect(timelineElements.length).toBeGreaterThan(0);
    
    // Check for Introduction links
    expect(screen.getByText(/View CV/i)).toBeInTheDocument();
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument();
  });
});
