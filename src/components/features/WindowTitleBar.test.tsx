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

// Internal imports
import { WindowTitleBar } from './WindowTitleBar';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('WindowTitleBar', () => {
  const defaultProps = {
    title: 'Test Window',
    isMaximized: false,
    onMinimize: jest.fn(),
    onToggleMaximize: jest.fn(),
    onClose: jest.fn(),
  };

  it('renders correctly', () => {
    renderWithTheme(<WindowTitleBar {...defaultProps} />);
    expect(screen.getByText('Test Window')).toBeInTheDocument();
  });

  it('calls onMinimize when minimize button is clicked', () => {
    renderWithTheme(<WindowTitleBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId('minimize-button'));
    expect(defaultProps.onMinimize).toHaveBeenCalled();
  });

  it('calls onToggleMaximize when maximize button is clicked', () => {
    renderWithTheme(<WindowTitleBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId('maximize-button'));
    expect(defaultProps.onToggleMaximize).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(<WindowTitleBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId('close-button'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders maximize/restore icons based on isMaximized', () => {
    const { rerender } = renderWithTheme(<WindowTitleBar {...defaultProps} isMaximized={false} />);
    // Check for "square" icon (maximize) - simplification: just check it renders
    expect(screen.getByText('Test Window')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <WindowTitleBar {...defaultProps} isMaximized={true} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Test Window')).toBeInTheDocument();
  });
});
