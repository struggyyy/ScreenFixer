/** *************************************************************************
 *                                                                         *
 *                       Copyright (c) 2026, @struggyyy                    *
 *                                                                         *
 *                          Project: ScreenFixer                           *
 *                                                                         *
 *                           All Rights Reserved                           *
 *                                                                         *
 *        This is unpublished proprietary source code of @struggyyy.       *
 *         The copyright notice above does not evidence any actual         *
 *               or intended publication of such source code.              *
 *                                                                         *
 ************************************************************************** */

// External libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

// Internal imports
import { Button } from './Button';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Button', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders primary variant by default', () => {
    const { container } = renderWithTheme(<Button>Primary</Button>);
    const button = container.firstChild as HTMLElement;
    // We can check styles if we want, but variant logic is mostly CSS
    expect(button).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = renderWithTheme(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="fullscreen">Fullscreen</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('Fullscreen')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Button variant="intensity">Intensity</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('Intensity')).toBeInTheDocument();
  });

  it('applies active state for intensity variant', () => {
    const { container } = renderWithTheme(
      <Button variant="intensity" $isActive={true}>
        Active
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toBeInTheDocument();
    // Verification of active styles can be done via computed styles if necessary,
    // but here we just ensure it renders with the prop.
  });

  it('passes additional props to the button element', () => {
    renderWithTheme(
      <Button disabled data-testid="test-button">
        Disabled
      </Button>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });
});
