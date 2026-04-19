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
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

// Internal imports
import { GlobalStyles } from './GlobalStyles';
import { theme } from './theme';

describe('GlobalStyles', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
      </ThemeProvider>,
    );
    // If it didn't throw, it successfully accessed the theme properties
    expect(true).toBe(true);
  });
});
