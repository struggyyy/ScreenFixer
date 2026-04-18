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

// Internal imports
import { Providers } from './Providers';

describe('Providers', () => {
  it('renders children correctly and provides theme', () => {
    render(
      <Providers>
        <div data-testid="child">Test Child</div>
      </Providers>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
