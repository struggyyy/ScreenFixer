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

// Internal imports
import RootLayout, { metadata } from './layout';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  VT323: () => ({
    className: 'mock-vt323-font',
  }),
}));

// Mock the registry and providers to avoid complex rendering inside layout
jest.mock('@/lib/StyledComponentsRegistry', () => ({
  StyledComponentsRegistry: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="registry">{children}</div>
  ),
}));

jest.mock('@/lib/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe('RootLayout', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation((...args) => {
      const msg = args[0];
      if (typeof msg === 'string' && msg.includes('In HTML, <html> cannot be a child of <div>')) {
        return;
      }
      // Log other errors to the actual console during tests if needed,
      // but usually we just want to suppress the known one.
    });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('renders children wrapped in registry and providers', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Child Content</div>
      </RootLayout>,
    );

    expect(screen.getByTestId('registry')).toBeInTheDocument();
    expect(screen.getByTestId('providers')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    expect(metadata.title).toContain('Screen Fixer');
    expect(metadata.description).toBeDefined();
  });
});
