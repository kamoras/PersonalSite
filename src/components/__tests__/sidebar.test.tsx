import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Sidebar from '../sidebar';

describe('Sidebar Component', () => {
  it('renders personal information correctly', () => {
    render(<Sidebar />);
    
    // Test name and email
    expect(screen.getByText('mack.ryanm@gmail.com')).toBeInTheDocument();
    // Find name in the logo link
    expect(screen.getByRole('link', { name: 'Ryan Mack' })).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<Sidebar />);
    
    // Test navigation links
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });
  it('renders social media links', () => {
    render(<Sidebar />);
    
    // Test social media links by href
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.includes('github.com') || 
      link.getAttribute('href')?.includes('linkedin.com')
    );
    
    expect(socialLinks).toHaveLength(2);
    expect(socialLinks[0]).toHaveAttribute('href', 'https://www.github.com/ryan-mack');
    expect(socialLinks[1]).toHaveAttribute('href', 'https://www.linkedin.com/in/ryan-mack');
  });  it('has proper navigation structure and accessibility attributes', () => {
    render(<Sidebar />);
    
    // Test toggle navigation using class name since it's the toggle button nav
    const toggleNav = document.querySelector('nav.js-colorlib-nav-toggle');
    expect(toggleNav).toHaveClass('colorlib-nav-toggle');
    expect(toggleNav).toHaveAttribute('data-toggle', 'collapse');
    expect(toggleNav).toHaveAttribute('data-target', '#navbar');
    expect(toggleNav).toHaveAttribute('aria-expanded', 'false');
    expect(toggleNav).toHaveAttribute('aria-controls', 'navbar');
    expect(toggleNav).toHaveAttribute('role', 'navigation');
    
    // Test main navigation menu using ID
    const mainNav = document.getElementById('colorlib-main-menu');
    expect(mainNav).toHaveClass('navbar');
    expect(mainNav).toHaveAttribute('role', 'navigation');
    
    // Test navigation links structure
    const navLinks = screen.getAllByRole('link', { name: /(Introduction|About|Timeline)/ });
    expect(navLinks).toHaveLength(3);
    navLinks.forEach(link => {
      expect(link).toHaveAttribute('data-nav-section');
      expect(link).toHaveAttribute('href');
    });

    // Test image accessibility
    expect(screen.getByRole('img', { name: 'Ryan Mack profile picture' })).toBeInTheDocument();
  });  it('has proper navbar collapse structure', () => {
    render(<Sidebar />);
    
    // Test navbar collapse container
    const collapseContainer = document.getElementById('navbar');
    expect(collapseContainer).toHaveClass('collapse');
    
    // Test main menu
    const mainMenu = document.getElementById('colorlib-main-menu');
    expect(mainMenu).toBeInTheDocument();
    expect(mainMenu).toHaveClass('navbar');
    
    // Test list structure
    const navList = within(collapseContainer!).getByRole('list');
    expect(navList.tagName).toBe('UL');
    
    // Test list items
    const listItems = within(navList).getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    // Test active state
    expect(listItems[0]).toHaveClass('active');
    
    // Test each nav section has proper attributes and href
    const links = within(navList).getAllByRole('link');
    links.forEach(link => {
      const section = link.getAttribute('data-nav-section');
      expect(section).toBeTruthy();
      expect(link).toHaveAttribute('href', `#${section}`);
    });
  });
});
