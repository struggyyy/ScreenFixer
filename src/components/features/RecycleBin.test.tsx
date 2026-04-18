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
import { RecycleBin } from './RecycleBin';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('RecycleBin', () => {
  it('renders correctly in idle state', () => {
    renderWithTheme(<RecycleBin isRestoring={false} onRestore={() => {}} />);
    expect(screen.getByText('1 Item')).toBeInTheDocument();
  });

  it('renders correctly in restoring state', () => {
    renderWithTheme(<RecycleBin isRestoring={true} onRestore={() => {}} />);
    expect(screen.getByText('Restoring...')).toBeInTheDocument();
  });

  it('calls onRestore when clicked', () => {
    const handleRestore = jest.fn();
    renderWithTheme(<RecycleBin isRestoring={false} onRestore={handleRestore} />);
    fireEvent.click(screen.getByText('1 Item').closest('div')!);
    expect(handleRestore).toHaveBeenCalledTimes(1);
  });
});
