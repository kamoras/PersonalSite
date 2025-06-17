import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Timeline from '../timeline';

// Mock IntersectionObserver
const observerMap = new Map();

beforeEach(() => {
  observerMap.clear();
  // @ts-ignore - we don't need to implement all IntersectionObserver properties for testing
  window.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      // Store the callback for later use
      this.callback = callback;
    }
    
    observe(element: Element) {
      observerMap.set(element, this.callback);
    }
    
    unobserve(element: Element) {
      observerMap.delete(element);
    }
    
    disconnect() {
      observerMap.clear();
    }
    
    private callback: IntersectionObserverCallback;
  };
});

describe('Timeline Component', () => {
  it('renders current position first', () => {
    render(<Timeline />);
    
    const timelineContent = screen.getByTestId('timeline-content');
    expect(timelineContent).toBeInTheDocument();
    
    const entries = screen.getAllByTestId('timeline-entry');
    const firstEntry = entries[0];
    
    expect(firstEntry).toHaveTextContent('Senior Software Engineer II');
    expect(firstEntry).toHaveTextContent('Cisco ThousandEyes');
    expect(firstEntry).toHaveTextContent('San Francisco, California (Remote) (November 2024 - Present)');
  });  it('renders timeline entries in chronological order', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    const titles = [
      'Senior Software Engineer II',
      'Senior Software Engineer I', 
      'Senior Software Engineer',
      'Software Development Engineer',
      'Staff Software Engineer',
      'Software Engineer II',
      'Software Engineering Intern'
    ];
    
    titles.forEach((title, index) => {
      expect(entries[index]).toHaveTextContent(title);
    });
  });

  it('renders job descriptions correctly', () => {
    render(<Timeline />);
    
    const descriptions = screen.getAllByTestId('timeline-description');
    
    // Check key descriptions from different roles
    expect(descriptions[0]).toHaveTextContent(/Continuing to work on major projects as a senior member/);
    expect(descriptions[1]).toHaveTextContent(/ThousandEyes is a key part of Cisco/);
    expect(descriptions[2]).toHaveTextContent(/I joined Datto, a rapidly growing startup/);
  });  it('renders with proper structure and data attributes', () => {
    render(<Timeline />);
    
    const timelineSection = screen.getByRole('region', { name: 'timeline' });
    expect(timelineSection).toHaveAttribute('id', 'timeline');
    expect(timelineSection).toHaveClass('font-serif', 'py-24', 'bg-white', 'dark:bg-gray-900');
    
    const entries = screen.getAllByTestId('timeline-entry');
    entries.forEach((entry, index) => {
      const inner = screen.getAllByTestId('timeline-entry-inner')[index];
      const label = screen.getAllByTestId('timeline-label')[index];
      const date = screen.getAllByTestId('timeline-date')[index];
      
      expect(inner).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(date).toBeInTheDocument();
      
      expect(entry).toHaveClass('relative', 'pl-20');
      expect(label).toHaveClass('group', 'bg-white', 'dark:bg-gray-800', 'p-8', 'rounded-2xl');
    });
  });
  it('handles visibility transitions through intersection observer', async () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    
    // Initially entries should be invisible
    entries.forEach(entry => {
      expect(entry.classList.toString()).toContain('opacity-0');
      expect(entry.classList.toString()).toContain('translate-y-8');
    });
    
    // Trigger intersection observer for all entries at once
    await act(async () => {
      const promises = entries.map(entry => {
        const callback = observerMap.get(entry);
        return callback?.([{
          target: entry,
          isIntersecting: true,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 1,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now()
        }]);
      });
      await Promise.all(promises);
    });
    
    // Check that all entries are now visible
    entries.forEach(entry => {
      expect(entry.classList.toString()).toContain('opacity-100');
      expect(entry.classList.toString()).toContain('translate-y-0');
    });
  });
});
