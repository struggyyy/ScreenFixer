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
import { useScreenRepair, INTENSITY_MAP } from './useScreenRepair';

// RAF is not available in jsdom — mock it so animation loops don't hang.
let _rafCallback: FrameRequestCallback | null = null;
const mockRaf = jest.fn((cb: FrameRequestCallback) => {
  _rafCallback = cb;
  return 123; // dummy id
});
const mockCaf = jest.fn();

beforeAll(() => {
  global.requestAnimationFrame = mockRaf as unknown as typeof requestAnimationFrame;
  global.cancelAnimationFrame = mockCaf;
});

afterEach(() => {
  _rafCallback = null;
  mockRaf.mockClear();
  mockCaf.mockClear();
});

describe('useScreenRepair', () => {
  it('starts with isRepairing false and intensity medium', () => {
    const { result } = renderHook(() => useScreenRepair());
    expect(result.current.isRepairing).toBe(false);
    expect(result.current.intensity).toBe('medium');
  });

  it('startRepair sets isRepairing to true', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.startRepair());

    expect(result.current.isRepairing).toBe(true);
  });

  it('setIntensity changes intensity', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.setIntensity('high'));

    expect(result.current.intensity).toBe('high');
  });

  it('bgRef is provided', () => {
    const { result } = renderHook(() => useScreenRepair());
    // ref object is always present (current may be null before mount)
    expect(result.current.bgRef).toBeDefined();
  });

  it('INTENSITY_MAP exports correct frame-skip values', () => {
    expect(INTENSITY_MAP.low).toBe(10);
    expect(INTENSITY_MAP.medium).toBe(4);
    expect(INTENSITY_MAP.high).toBe(2);
  });

  it('pressing Escape stops repair and prevents default', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.startRepair());
    expect(result.current.isRepairing).toBe(true);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current.isRepairing).toBe(false);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('pressing Space stops repair', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.startRepair());
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    });

    expect(result.current.isRepairing).toBe(false);
  });

  it('a click stops repair', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.startRepair());
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });

    expect(result.current.isRepairing).toBe(false);
  });

  it('cycles colours based on intensity', () => {
    const { result } = renderHook(() => useScreenRepair());
    const div = document.createElement('div');
    result.current.bgRef.current = div;

    act(() => {
      result.current.setIntensity('high'); // 2 frames per switch
      result.current.startRepair();
    });

    expect(mockRaf).toHaveBeenCalled();

    // Trigger frames
    act(() => {
      if (_rafCallback) _rafCallback(performance.now()); // Frame 1: count=1
    });
    expect(div.style.backgroundColor).toBe(''); // Not reached skip yet

    act(() => {
      if (_rafCallback) _rafCallback(performance.now()); // Frame 2: count=2 -> reset -> color switch
    });
    // FLASH_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];
    // Index starts at 0, first switch sets it to (0+1)%5 = 1 -> #00FF00 (Green)
    // Wait, let's check the code: colorIndex.current = (colorIndex.current + 1) % FLASH_COLORS.length;
    // Initial ref value is 0. First switch makes it 1.
    // CSS color names might be normalized by JSDOM (e.g. rgb(0, 255, 0))
    expect(div.style.backgroundColor).toMatch(/rgb\(0, 255, 0\)|#00ff00/i);

    act(() => {
      if (_rafCallback) _rafCallback(performance.now()); // Frame 3: count=1
      if (_rafCallback) _rafCallback(performance.now()); // Frame 4: count=2 -> switch to index 2 (#0000FF)
    });
    expect(div.style.backgroundColor).toMatch(/rgb\(0, 0, 255\)|#0000ff/i);
  });

  it('cleans up on unmount or when stopped', () => {
    const { result, unmount } = renderHook(() => useScreenRepair());
    const div = document.createElement('div');
    result.current.bgRef.current = div;

    act(() => result.current.startRepair());
    expect(mockRaf).toHaveBeenCalled();

    act(() => (result.current.bgRef.current = div)); // ensure ref is there

    unmount();
    expect(mockCaf).toHaveBeenCalledWith(123);

    const { result: result2 } = renderHook(() => useScreenRepair());
    result2.current.bgRef.current = div;
    act(() => result2.current.startRepair());
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(div.style.backgroundColor).toBe('transparent');
  });
});
