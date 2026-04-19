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

// Internal imports
import { theme } from './theme';

describe('Theme', () => {
  it('has essential color tokens', () => {
    expect(theme.colors.bgDesktop).toBeDefined();
    expect(theme.colors.windowBg).toBeDefined();
    expect(theme.colors.titleBarBg).toBeDefined();
  });

  it('has spacing and border tokens', () => {
    expect(theme.spacing.md).toBeDefined();
    expect(theme.borders.window).toBeDefined();
  });

  it('has animation tokens', () => {
    expect(theme.anim.durations.window).toBeDefined();
    expect(theme.anim.easings.standard).toBeDefined();
  });
});
