import { act, renderHook } from '@testing-library/react';
import { useScreenRepair, INTENSITY_MAP } from '@/hooks/useScreenRepair';

// RAF is not available in jsdom — mock it so animation loops don't hang.
let _rafCallback: FrameRequestCallback | null = null;
const mockRaf = jest.fn((cb: FrameRequestCallback) => {
  _rafCallback = cb;
  return 1;
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

  it('pressing Escape stops repair', () => {
    const { result } = renderHook(() => useScreenRepair());

    act(() => result.current.startRepair());
    expect(result.current.isRepairing).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.isRepairing).toBe(false);
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
});
