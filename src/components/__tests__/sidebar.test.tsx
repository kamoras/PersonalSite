import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Sidebar from '../sidebar';

describe('Sidebar Component', () => {
  it('renders personal information correctly', () => {
    render(<Sidebar />);
    
    const profilePic = screen.getByRole('img', { name: /ryan mack profile picture/i });
    expect(profilePic).toBeInTheDocument();
    expect(profilePic).toHaveClass('w-32', 'h-32', 'rounded-full');
    
    expect(screen.getByText('Ryan Mack')).toBeInTheDocument();
    expect(screen.getByText('mack.ryanm@gmail.com')).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<Sidebar />);
    
    ['Introduction', 'About', 'Timeline'].forEach(item => {
      const link = screen.getByRole('link', { name: item });
      expect(link).toHaveAttribute('href', expect.stringMatching(new RegExp(`#${item.toLowerCase()}`)));
    });
  });

  it('renders social media links', () => {
    render(<Sidebar />);
    
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://www.github.com/ryan-mack');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/ryan-mack');
  });

  it('has proper navigation structure and accessibility attributes', () => {
    render(<Sidebar />);
    
    const navButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(navButton).toHaveClass('fixed', 'z-50', 'top-4', 'right-4');
    expect(navButton).toHaveAttribute('aria-expanded', 'false');
    expect(navButton).toHaveAttribute('aria-controls', 'navbar');
    
    const mainNav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(mainNav).toHaveClass('mt-8');
  });

  it('has proper navbar structure', () => {
    render(<Sidebar />);
    
    const mainNavList = within(screen.getByRole('navigation', { name: /main navigation/i }))
      .getByRole('list');
    expect(mainNavList).toHaveClass('space-y-2');
    
    const socialLinks = screen.getByRole('list', { name: /social links/i });
    expect(socialLinks).toHaveClass('flex', 'justify-center', 'space-x-4');
  });
});
