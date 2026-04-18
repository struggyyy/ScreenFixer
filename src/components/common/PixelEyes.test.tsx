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
import { render } from '@testing-library/react';

// Internal imports
import { PixelEyes } from './PixelEyes';

describe('PixelEyes', () => {
  it('renders correctly with default width', () => {
    const { container } = render(<PixelEyes />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '84');
    expect(svg).toHaveAttribute('height', '64'); // (84/42)*32
  });

  it('renders with custom width', () => {
    const { container } = render(<PixelEyes width={42} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '42');
    expect(svg).toHaveAttribute('height', '32');
  });
});
