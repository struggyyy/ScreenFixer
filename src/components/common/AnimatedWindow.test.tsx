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
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

// Internal imports
import { AnimatedWindow, WindowContent } from './AnimatedWindow';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('AnimatedWindow', () => {
  const defaultProps = {
    isHidden: false,
    isMinimized: false,
    isMaximized: false,
    isTrashed: false,
    isRestoring: false,
  };

  it('renders children correctly', () => {
    renderWithTheme(
      <AnimatedWindow {...defaultProps}>
        <div data-testid="child">Hello</div>
      </AnimatedWindow>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders with different states without crashing', () => {
    const { rerender } = renderWithTheme(
      <AnimatedWindow {...defaultProps} isMinimized={true}>
        Content
      </AnimatedWindow>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedWindow {...defaultProps} isMaximized={true}>
          Content
        </AnimatedWindow>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedWindow {...defaultProps} isTrashed={true}>
          Content
        </AnimatedWindow>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedWindow {...defaultProps} isRestoring={true}>
          Content
        </AnimatedWindow>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AnimatedWindow {...defaultProps} isHidden={true}>
          Content
        </AnimatedWindow>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  describe('WindowContent', () => {
    it('renders children and applies padding', () => {
      renderWithTheme(
        <WindowContent>
          <span>Inside Content</span>
        </WindowContent>,
      );
      expect(screen.getByText('Inside Content')).toBeInTheDocument();
    });
  });
});
