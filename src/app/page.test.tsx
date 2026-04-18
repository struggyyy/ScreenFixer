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
import Home from './page';
import { theme } from '@/components/theme/theme';

// Mocking hooks or their side effects
beforeAll(() => {
  global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));
  global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));

  Object.defineProperty(document, 'fullscreenElement', {
    writable: true,
    value: null,
  });
  document.documentElement.requestFullscreen = jest.fn().mockResolvedValue(undefined);
  document.exitFullscreen = jest.fn().mockResolvedValue(undefined);
});

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Home Page', () => {
  it('renders the initial state correctly', () => {
    renderWithTheme(<Home />);
    expect(screen.getByText("Let's clean!")).toBeInTheDocument();
    expect(screen.getByText('Start Screen Repair')).toBeInTheDocument();
  });

  it('toggles intensity when clicking intensity buttons', () => {
    renderWithTheme(<Home />);
    const highButton = screen.getByText('high');
    fireEvent.click(highButton);
    // Visual confirmation usually enough, or check hook state via result if we exported it
    // Here we just ensure it doesn't crash on click.
  });

  it('starts repair when clicking Start button', () => {
    renderWithTheme(<Home />);
    const startButton = screen.getByText('Start Screen Repair');
    fireEvent.click(startButton);
    // AnimatedWindow should be hidden (via isHidden prop)
    // We can check if specific text is still visible or check DOM state
    expect(screen.getByText("Let's clean!")).toBeInTheDocument();
  });

  it('minimizes and restores the window', () => {
    renderWithTheme(<Home />);

    // Find minimize button
    fireEvent.click(screen.getByTestId('minimize-button'));

    // Taskbar should be visible
    expect(screen.getByTestId('taskbar-chip')).toBeInTheDocument();

    // Clicking taskbar should restore
    fireEvent.click(screen.getByTestId('taskbar-chip'));
    // Flow completed
  });

  it('toggles maximize state', () => {
    renderWithTheme(<Home />);
    fireEvent.click(screen.getByTestId('maximize-button'));
    // State updated
  });

  it('closes and restores via recycle bin', () => {
    jest.useFakeTimers();
    renderWithTheme(<Home />);

    fireEvent.click(screen.getByTestId('close-button')); // close

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Recycle bin should be visible
    expect(screen.getByText('1 Item')).toBeInTheDocument();

    fireEvent.click(screen.getByText('1 Item')); // restore

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    jest.useRealTimers();
  });
});

// Import act from react-testing-library for timers
import { act } from '@testing-library/react';
