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

// React-specific imports
import React from 'react';

// External libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/navigation';

// Internal imports
import NotFound from './not-found';
import { theme } from '@/components/theme/theme';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('NotFound Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders correctly', () => {
    renderWithTheme(<NotFound />);

    expect(screen.getByText('System Error')).toBeInTheDocument();
    expect(screen.getByText(/The requested module or resource could not be found/)).toBeInTheDocument();
    expect(screen.getByText('Return to Desktop')).toBeInTheDocument();
  });

  it('navigates to home when clicking Return to Desktop', () => {
    renderWithTheme(<NotFound />);

    const returnButton = screen.getByText('Return to Desktop');
    fireEvent.click(returnButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('navigates to home when closing the window via TitleBar', () => {
    renderWithTheme(<NotFound />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
