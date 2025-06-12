import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Timeline from '../timeline';

describe('Timeline Component', () => {
  it('renders section header', () => {
    render(<Timeline />);
    
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('highlights')).toBeInTheDocument();
  });

  it('renders timeline entries in correct order', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByRole('heading', { level: 2 })
      .filter(h2 => !h2.textContent?.includes('Timeline'));
      
    expect(entries[0].textContent).toContain('Senior Software Engineer II at Cisco ThousandEyes');
    expect(entries[1].textContent).toContain('Senior Software Engineer at Datto');
  });

  it('renders timeline entry details correctly', () => {
    render(<Timeline />);
    
    expect(screen.getByText(/ThousandEyes is a key part of Cisco/)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco, California \(Remote\)/)).toBeInTheDocument();
    
    expect(screen.getByText(/April 2022 - November 2022/)).toBeInTheDocument();
    expect(screen.getByText(/October 2019 - April 2022/)).toBeInTheDocument();
  });

  it('applies correct animation classes', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    expect(entries.length).toBeGreaterThan(0);
    entries.forEach(entry => {
      expect(entry).toHaveClass('transform', 'transition-all', 'duration-500', 'ease-out');
    });
  });

  it('renders timeline icons with correct styles', () => {
    render(<Timeline />);
    
    const icons = screen.getAllByTestId('timeline-icon')
      .filter(icon => !icon.closest('[data-testid="timeline-end-marker"]'));
    expect(icons.length).toBeGreaterThan(0);
    
    icons.forEach(icon => {
      expect(icon).toHaveClass(
        'absolute',
        'left-[-2.5rem]',
        'w-12',
        'h-12',
        'rounded-full',
        'border-4',
        'border-white',
        'bg-blue-400'
      );
    });
  });
  it('maintains chronological structure', () => {
    render(<Timeline />);
    
    const timelineContainer = screen.getByTestId('timeline-content');
    expect(timelineContainer).toHaveClass('max-w-4xl', 'mx-auto', 'px-4', 'py-8');
    
    const entries = screen.getAllByTestId('timeline-entry');
    expect(entries.length).toBeGreaterThan(1);
    expect(entries[0]).toHaveClass('relative', 'pl-10', 'border-l-4', 'border-blue-400');
    
    const dates = screen.getAllByText(/\d{4}/);
    expect(dates.length).toBeGreaterThan(1);
    
    // Verify chronological order (newest to oldest)
    const years = dates.map(date => {
      const match = date.textContent?.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    });
    expect([...years]).toEqual([...years].sort((a, b) => b - a));
  });

  it('renders timeline entry content correctly', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    entries.forEach(entry => {
      const date = within(entry).getByTestId('timeline-date');
      expect(date).toHaveClass('text-gray-600', 'mb-2');

      const title = within(entry).getByRole('heading', { level: 2 });
      expect(title).toHaveClass('font-bold', 'text-xl', 'mb-2');

      const description = within(entry).getByTestId('timeline-description');
      expect(description).toHaveClass('text-gray-700');
    });
  });

  it('meets accessibility requirements', () => {
    render(<Timeline />);
    
    const timelineSection = screen.getByRole('region', { name: /timeline/i });
    expect(timelineSection).toBeInTheDocument();

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveClass('text-3xl', 'font-bold', 'mt-2', 'mb-4');
  });

  it('has proper timeline entry structure', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    entries.forEach(entry => {
      const innerElement = within(entry).getByTestId('timeline-entry-inner');
      const icon = within(innerElement).getByTestId('timeline-icon');
      const label = within(innerElement).getByTestId('timeline-label');
      
      expect(innerElement).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      
      expect(label).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow-md');
    });
  });
  it('renders with proper layout classes', () => {
    render(<Timeline />);
    
    const section = screen.getByRole('region', { name: /timeline/i });
    expect(section).toHaveClass('py-16', 'bg-gray-50');
    
    const container = screen.getByTestId('timeline-content');
    expect(container).toHaveClass('max-w-4xl', 'mx-auto', 'px-4', 'py-8');
    
    const timelineList = screen.getByRole('list');
    expect(timelineList).toHaveClass('space-y-8');
  });
});
