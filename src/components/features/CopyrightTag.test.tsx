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
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

// Internal imports
import { CopyrightTag } from './CopyrightTag';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('CopyrightTag', () => {
  it('renders copyright text correctly', () => {
    renderWithTheme(<CopyrightTag />);
    expect(screen.getByText('© 2026 STRUGGYYY')).toBeInTheDocument();
  });

  it('is visible when isHidden is false', () => {
    renderWithTheme(<CopyrightTag isHidden={false} />);
    const tag = screen.getByTestId('copyright-tag');
    expect(tag).toHaveStyle('opacity: 1');
    expect(tag).toHaveStyle('visibility: visible');
    expect(tag).toHaveStyle('pointer-events: auto');
  });

  it('applies hidden styles when isHidden is true', () => {
    renderWithTheme(<CopyrightTag isHidden={true} />);
    const tag = screen.getByTestId('copyright-tag');
    expect(tag).toHaveStyle('opacity: 0');
    expect(tag).toHaveStyle('visibility: hidden');
    expect(tag).toHaveStyle('pointer-events: none');
  });
});
