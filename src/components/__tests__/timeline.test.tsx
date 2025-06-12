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
    
    // Get all job titles and skip the Timeline heading
    const entries = screen.getAllByRole('heading', { level: 2 })
      .filter(h2 => !h2.textContent?.includes('Timeline'));
      
    expect(entries[0].textContent).toContain('Senior Software Engineer II at Cisco ThousandEyes');
    expect(entries[1].textContent).toContain('Senior Software Engineer at Datto');
  });

  it('renders timeline entry details correctly', () => {
    render(<Timeline />);
    
    // Test first entry details
    expect(screen.getByText(/ThousandEyes is a key part of Cisco/)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco, California \(Remote\)/)).toBeInTheDocument();
    
    // Test date ranges
    expect(screen.getByText(/April 2022 - November 2022/)).toBeInTheDocument();
    expect(screen.getByText(/October 2019 - April 2022/)).toBeInTheDocument();
  });  it('applies correct animation classes', () => {
    render(<Timeline />);
    
    const entries = screen.getAllByTestId('timeline-entry');
    expect(entries.length).toBeGreaterThan(0);
    entries.forEach(entry => {
      expect(entry).toHaveClass('animate-box');
      expect(entry).toHaveAttribute('data-animate-effect');
    });
    
    // Check specific animation effects
    expect(entries[0]).toHaveAttribute('data-animate-effect', 'fadeInLeft');
    expect(entries[1]).toHaveAttribute('data-animate-effect', 'fadeInTop');
  });  it('renders timeline icons with correct colors', () => {
    render(<Timeline />);
    
    // Get all icons except the end marker
    const icons = screen.getAllByTestId('timeline-icon')
      .filter(icon => !icon.closest('.begin'));
    expect(icons.length).toBeGreaterThan(0);
    
    // Check specific color classes
    icons.forEach(icon => {
      expect(icon).toHaveClass('color-4');
    });
  });
  it('renders the timeline end marker', () => {
    render(<Timeline />);
    
    const endMarker = screen.getByTestId('timeline-end-marker');
    expect(endMarker).toBeInTheDocument();
    expect(endMarker).toHaveClass('timeline-entry', 'begin', 'animate-box');
    const icon = within(endMarker).getByTestId('timeline-icon');
    expect(icon).toHaveClass('color-none');
  });
  it('maintains chronological structure', () => {
    render(<Timeline />);
    
    const timelineContainer = screen.getByTestId('timeline-container');
    expect(timelineContainer).toHaveClass('timeline-centered');
    
    // Verify timeline structure and order
    const entries = screen.getAllByTestId('timeline-entry-inner');
    expect(entries.length).toBeGreaterThan(1);
    
    // Verify dates are in chronological order
    const dates = screen.getAllByText(/\d{4}/);
    const years = dates.map(date => {
      const match = date.textContent?.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    });
    expect([...years]).toEqual([...years].sort((a, b) => b - a)); // Should be in descending order
  });

  it('renders all description paragraphs for each timeline entry', () => {
    render(<Timeline />);
    
    // Check ThousandEyes description paragraphs
    const thousandEyesDescriptions = [
      "ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance.",
      "As a member of a team in hyper-growth mode,",
      "It has been rewarding to be able to work at ThousandEyes,"
    ];
    thousandEyesDescriptions.forEach(desc => {
      expect(screen.getByText(new RegExp(desc))).toBeInTheDocument();
    });

    // Check Datto description
    expect(screen.getByText(/I joined Datto, a rapidly growing startup/)).toBeInTheDocument();
  });  it('meets accessibility requirements', () => {
    render(<Timeline />);
    
    // Check section landmarks
    const timelineSection = screen.getByRole('region', { name: /timeline/i });
    expect(timelineSection).toBeInTheDocument();

    // Verify headings hierarchy - first heading is title, rest are in timeline entries
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveClass('colorlib-heading');
    
    // Timeline entry headings should be within timeline-label divs
    const entryHeadings = headings.slice(1);
    entryHeadings.forEach(heading => {
      expect(heading.closest('.timeline-label')).toBeTruthy();
    });

    // Check for proper ARIA attributes and animation
    const timelineEntries = screen.getAllByTestId('timeline-entry');
    timelineEntries.forEach(entry => {
      expect(entry).toHaveAttribute('data-animate-effect');
      expect(entry).toHaveClass('animate-box');
    });
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
    });
  });
  it('renders with proper layout classes', () => {
    const { container } = render(<Timeline />);
    
    // Check for responsive layout classes
    const narrowContent = container.querySelector('.colorlib-narrow-content');
    expect(narrowContent).toHaveClass('colorlib-narrow-content');
    
    const rows = container.getElementsByClassName('row');
    expect(rows.length).toBeGreaterThan(0);
    
    // Verify column classes for responsive design
    const column = container.querySelector('.col-md-6');
    expect(column).toHaveClass('col-md-offset-3', 'col-md-pull-3');
  });
});
