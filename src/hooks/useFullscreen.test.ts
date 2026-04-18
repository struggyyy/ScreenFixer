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
import { act, renderHook } from '@testing-library/react';

// Internal imports
import { useFullscreen } from './useFullscreen';

describe('useFullscreen', () => {
  const originalRequestFullscreen = document.documentElement.requestFullscreen;
  const originalExitFullscreen = document.exitFullscreen;

  beforeEach(() => {
    // Mocking document properties and methods
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: null,
    });
    document.documentElement.requestFullscreen = jest.fn().mockResolvedValue(undefined);
    document.exitFullscreen = jest.fn().mockResolvedValue(undefined);
  });

  afterEach(() => {
    document.documentElement.requestFullscreen = originalRequestFullscreen;
    document.exitFullscreen = originalExitFullscreen;
    jest.clearAllMocks();
  });

  it('initialises with isFullscreen false', () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.isFullscreen).toBe(false);
  });

  it('updates isFullscreen when fullscreenchange event fires', () => {
    const { result } = renderHook(() => useFullscreen());

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', { value: {} });
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(result.current.isFullscreen).toBe(true);

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', { value: null });
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(result.current.isFullscreen).toBe(false);
  });

  it('toggleFullscreen calls requestFullscreen when not in fullscreen', () => {
    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.toggleFullscreen();
    });
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  it('toggleFullscreen calls exitFullscreen when in fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: {} });
    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.toggleFullscreen();
    });
    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  it('calls toggleFullscreen when F11 is pressed', () => {
    const { result } = renderHook(() => useFullscreen());
    const toggleFullscreenSpy = jest.spyOn(result.current, 'toggleFullscreen');

    // Note: We can't spy on the returned function easily because it's stable via useCallback.
    // Instead we check the side effect (requestFullscreen/exitFullscreen)
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F11' }));
    });
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  it('prevents default behavior when F11 is pressed', () => {
    renderHook(() => useFullscreen());
    const event = new KeyboardEvent('keydown', { key: 'F11' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    act(() => {
      window.dispatchEvent(event);
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
