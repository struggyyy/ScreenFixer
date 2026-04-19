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
import { Taskbar } from './Taskbar';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Taskbar', () => {
  it('renders correctly and shows title', () => {
    renderWithTheme(<Taskbar isVisible={true} title="Test App" onRestore={() => {}} />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('calls onRestore when clicked', () => {
    const handleRestore = jest.fn();
    renderWithTheme(<Taskbar isVisible={true} title="Test App" onRestore={handleRestore} />);
    fireEvent.click(screen.getByTestId('taskbar-chip'));
    expect(handleRestore).toHaveBeenCalledTimes(1);
  });
});
