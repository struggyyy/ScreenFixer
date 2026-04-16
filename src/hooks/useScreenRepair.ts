'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type Intensity = 'low' | 'medium' | 'high';

// Frames to skip between colour changes.
export const INTENSITY_MAP: Record<Intensity, number> = {
  low: 10,
  medium: 4,
  high: 2,
};

const FLASH_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];

interface UseScreenRepairReturn {
  isRepairing: boolean;
  intensity: Intensity;
  setIntensity: (intensity: Intensity) => void;
  startRepair: () => void;
  bgRef: React.RefObject<HTMLDivElement | null>;
}

// Owns the RAF loop — cycles colours at the chosen intensity, exits on Escape/Space/click.
export function useScreenRepair(): UseScreenRepairReturn {
  const [isRepairing, setIsRepairing] = useState(false);
  const [intensity, setIntensity] = useState<Intensity>('medium');

  const bgRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameCount = useRef(0);
  const colorIndex = useRef(0);

  const stopRepair = useCallback(() => setIsRepairing(false), []);

  const animate = useCallback(() => {
    frameCount.current++;

    if (frameCount.current >= INTENSITY_MAP[intensity]) {
      frameCount.current = 0;
      colorIndex.current = (colorIndex.current + 1) % FLASH_COLORS.length;

      if (bgRef.current) {
        bgRef.current.style.backgroundColor = FLASH_COLORS[colorIndex.current];
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [intensity]);

  useEffect(() => {
    if (!isRepairing) {
      if (bgRef.current) bgRef.current.style.backgroundColor = 'transparent';
      return;
    }

    rafRef.current = requestAnimationFrame(animate);

    const handleExit = (e: KeyboardEvent | MouseEvent) => {
      if (
        e.type === 'click' ||
        (e instanceof KeyboardEvent && (e.key === 'Escape' || e.key === ' '))
      ) {
        stopRepair();
      }
    };

    window.addEventListener('keydown', handleExit);
    window.addEventListener('click', handleExit);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', handleExit);
      window.removeEventListener('click', handleExit);
    };
  }, [isRepairing, animate, stopRepair]);

  const startRepair = useCallback(() => setIsRepairing(true), []);

  return { isRepairing, intensity, setIntensity, startRepair, bgRef };
}
