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
import { RepairOverlay } from './RepairOverlay';
import { theme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('RepairOverlay', () => {
  it('renders correctly', () => {
    const { container } = renderWithTheme(<RepairOverlay isRepairing={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies styles based on isRepairing', () => {
    const { container, rerender } = renderWithTheme(<RepairOverlay isRepairing={false} />);
    let overlay = container.firstChild as HTMLElement;
    // pointer-events: none, opacity: 0
    expect(overlay).toHaveStyle('pointer-events: none');
    expect(overlay).toHaveStyle('opacity: 0');

    rerender(
      <ThemeProvider theme={theme}>
        <RepairOverlay isRepairing={true} />
      </ThemeProvider>,
    );
    overlay = container.firstChild as HTMLElement;
    // pointer-events: auto, opacity: 1
    expect(overlay).toHaveStyle('pointer-events: auto');
    expect(overlay).toHaveStyle('opacity: 1');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<RepairOverlay isRepairing={false} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
