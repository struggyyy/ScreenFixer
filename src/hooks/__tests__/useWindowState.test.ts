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

import { act, renderHook } from '@testing-library/react';
import { useWindowState } from '@/hooks/useWindowState';

describe('useWindowState', () => {
  it('initialises with all states false', () => {
    const { result } = renderHook(() => useWindowState());
    expect(result.current.windowState).toEqual({
      isMinimized: false,
      isMaximized: false,
      isTrashed: false,
      isRestoring: false,
    });
  });

  it('minimize / unminimize toggle isMinimized', () => {
    const { result } = renderHook(() => useWindowState());

    act(() => result.current.minimize());
    expect(result.current.windowState.isMinimized).toBe(true);

    act(() => result.current.unminimize());
    expect(result.current.windowState.isMinimized).toBe(false);
  });

  it('toggleMaximize flips isMaximized', () => {
    const { result } = renderHook(() => useWindowState());

    act(() => result.current.toggleMaximize());
    expect(result.current.windowState.isMaximized).toBe(true);

    act(() => result.current.toggleMaximize());
    expect(result.current.windowState.isMaximized).toBe(false);
  });

  it('close sets isTrashed and clears isMaximized', () => {
    const { result } = renderHook(() => useWindowState());

    act(() => result.current.toggleMaximize()); // maximize first
    act(() => result.current.close());

    expect(result.current.windowState.isTrashed).toBe(true);
    expect(result.current.windowState.isMaximized).toBe(false);
  });

  it('restore sets isRestoring and clears isTrashed immediately', () => {
    const { result } = renderHook(() => useWindowState());

    act(() => result.current.close());
    act(() => result.current.restore());

    expect(result.current.windowState.isTrashed).toBe(false);
    expect(result.current.windowState.isRestoring).toBe(true);
  });

  it('isRestoring clears after animation delay', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useWindowState());

    act(() => result.current.close());
    act(() => result.current.restore());

    expect(result.current.windowState.isRestoring).toBe(true);

    act(() => jest.advanceTimersByTime(1200));

    expect(result.current.windowState.isRestoring).toBe(false);
    jest.useRealTimers();
  });
});
