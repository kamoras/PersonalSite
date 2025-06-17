import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from '../sidebar';

// Mock matchMedia
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  // Reset dark mode between tests
  document.documentElement.classList.remove('dark');
});

describe('Sidebar Component', () => {  it('renders profile information correctly', () => {
    render(<Sidebar />);
    
    // Profile picture div with background image
    const profilePic = screen.getByRole('img', { name: /ryan mack profile picture/i });
    expect(profilePic).toBeInTheDocument();
    expect(profilePic).toHaveClass('w-24', 'h-24', 'rounded-2xl', 'bg-cover', 'bg-center');
    
    // Name and email
    const nameLink = screen.getByRole('link', { name: 'Ryan Mack' });
    expect(nameLink).toHaveAttribute('href', '/');
    expect(nameLink).toHaveClass('hover:text-blue-600', 'dark:hover:text-blue-400', 'transition-colors');
    
    const emailLink = screen.getByRole('link', { name: /mack\.ryanm@gmail\.com/ });
    expect(emailLink).toHaveAttribute('href', 'mailto:mack.ryanm@gmail.com');
    expect(emailLink).toHaveClass('hover:text-blue-600', 'dark:hover:text-blue-400', 'transition-colors');
  });  it('renders navigation items with correct structure', () => {
    render(<Sidebar />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toHaveClass('flex-1', 'px-6');
    
    const links = screen.getAllByRole('link');
    const navLinks = links.filter(link => {
      const section = link.getAttribute('data-nav-section');
      return section === 'introduction' || section === 'about' || section === 'timeline';
    });
    
    expect(navLinks).toHaveLength(3);
    navLinks.forEach(link => {
      const section = link.getAttribute('data-nav-section');
      expect(link).toHaveAttribute('href', `#${section}`);
      expect(link).toHaveClass(
        'group',
        'flex',
        'items-center',
        'px-4',
        'py-3',
        'text-sm',
        'font-medium',
        'rounded-lg',
        'hover:bg-gray-50',
        'dark:hover:bg-gray-900/50',
        'transition-all',
        'border-l-3',
        'border-transparent'
      );
    });
  });

  it('handles mobile menu toggle correctly', async () => {
    render(<Sidebar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle sidebar/i });    const sidebar = screen.getByRole('complementary');
    
    expect(menuButton).toHaveClass('lg:hidden', 'fixed', 'top-6', 'left-6', 'z-50');
    expect(sidebar).toHaveClass('-translate-x-full', 'lg:translate-x-0', 'font-serif', 'overflow-y-auto');
    
    // Toggle menu open
    await act(async () => {
      fireEvent.click(menuButton);
    });
    
    // Check the sidebar's classes after opening
    expect(sidebar).toHaveClass('translate-x-0');
    
    // Check overlay
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass('lg:hidden', 'fixed', 'inset-0', 'bg-black/20', 'backdrop-blur-sm', 'z-40');
    
    // Toggle menu closed
    await act(async () => {
      fireEvent.click(overlay);
    });
    
    // Check the sidebar's classes after closing
    expect(sidebar).toHaveClass('-translate-x-full');
  });

  it('handles dark mode toggle with system preference', async () => {
    render(<Sidebar />);
    
    // Dark mode should be enabled due to system preference
    await act(async () => {
      // Let the component handle initial system preference
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    
    // Toggle to light mode
    await act(async () => {
      fireEvent.click(darkModeButton);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Toggle back to dark mode
    await act(async () => {
      fireEvent.click(darkModeButton);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
  it('renders social links with correct attributes', () => {
    render(<Sidebar />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://www.github.com/kamoras');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveClass('p-2', 'hover:text-gray-900', 'dark:hover:text-white', 'transition-all');
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ryan-mack');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveClass('p-2', 'hover:text-blue-600', 'dark:hover:text-blue-400', 'transition-all');
  });
});
