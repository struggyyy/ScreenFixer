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

// Internal imports
import { StyledComponentsRegistry } from './StyledComponentsRegistry';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn((callback) => callback()),
}));

describe('StyledComponentsRegistry', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <StyledComponentsRegistry>
        <div>Registry Child</div>
      </StyledComponentsRegistry>,
    );
    expect(getByText('Registry Child')).toBeInTheDocument();
  });
});
