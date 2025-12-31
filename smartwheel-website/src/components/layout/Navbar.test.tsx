import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders SmartWheel logo', () => {
    renderNavbar();
    expect(screen.getByText('SmartWheel')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('Diagrams')).toBeInTheDocument();
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderNavbar();
    const themeButtons = screen.getAllByRole('button');
    expect(themeButtons.length).toBeGreaterThan(0);
  });
});
