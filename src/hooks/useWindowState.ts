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

'use client';

import { useState, useCallback } from 'react';

export interface WindowState {
  isMinimized: boolean;
  isMaximized: boolean;
  isTrashed: boolean;
  isRestoring: boolean;
}

interface UseWindowStateReturn {
  windowState: WindowState;
  minimize: () => void;
  unminimize: () => void;
  toggleMaximize: () => void;
  close: () => void;
  restore: () => void;
}

const RESTORE_ANIMATION_MS = 1200;

// Manages the window's minimize / maximize / close / restore state machine.
export function useWindowState(): UseWindowStateReturn {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTrashed, setIsTrashed] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const minimize = useCallback(() => setIsMinimized(true), []);
  const unminimize = useCallback(() => setIsMinimized(false), []);

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);

  const close = useCallback(() => {
    setIsMaximized(false); // Snap out of maximized first so the crumble starts from centre.
    setIsTrashed(true);
  }, []);

  const restore = useCallback(() => {
    setIsRestoring(true);
    setIsTrashed(false);
    setTimeout(() => setIsRestoring(false), RESTORE_ANIMATION_MS);
  }, []);

  return {
    windowState: { isMinimized, isMaximized, isTrashed, isRestoring },
    minimize,
    unminimize,
    toggleMaximize,
    close,
    restore,
  };
}
