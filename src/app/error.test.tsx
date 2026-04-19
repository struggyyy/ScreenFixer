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
import ErrorPage from './error';
import { theme } from '@/components/theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Error Page', () => {
  const mockReset = jest.fn();
  const mockError = new Error('Test error message') as Error & { digest?: string };
  mockError.digest = 'test-digest';

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders correctly with error details', () => {
    renderWithTheme(<ErrorPage error={mockError} reset={mockReset} />);

    expect(screen.getByText('CRITICAL_PROCESS_DIED')).toBeInTheDocument();
    expect(screen.getByText(/A fatal exception has occurred/)).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Restart Application')).toBeInTheDocument();
  });

  it('logs error to console on mount', () => {
    renderWithTheme(<ErrorPage error={mockError} reset={mockReset} />);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it('calls reset function when clicking Restart Application', () => {
    renderWithTheme(<ErrorPage error={mockError} reset={mockReset} />);

    const restartButton = screen.getByText('Restart Application');
    fireEvent.click(restartButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('calls reset function when closing the window via TitleBar', () => {
    renderWithTheme(<ErrorPage error={mockError} reset={mockReset} />);

    // WindowTitleBar close button usually has an onClose handler.
    // In error.tsx, onClose is passed reset().
    // We can find the close button by its test-id if TitleBar provides it,
    // or by looking for the 'X' or close icon if it's text-based.
    // Based on page.test.tsx, it's 'close-button'.
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
