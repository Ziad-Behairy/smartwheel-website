import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component to use the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toMatch(/light|dark/);
  });

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
