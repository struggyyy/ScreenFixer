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

// React-specific imports
import { forwardRef } from 'react';

// External libraries
import styled from 'styled-components';

interface RepairOverlayProps {
  isRepairing: boolean;
}

// Full-screen overlay used to cover the desktop during the repair sequence.
const Overlay = styled.div<{ $isRepairing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 9999;
  pointer-events: ${({ $isRepairing }) => ($isRepairing ? 'auto' : 'none')};
  cursor: ${({ $isRepairing }) => ($isRepairing ? 'none' : 'default')};
  opacity: ${({ $isRepairing }) => ($isRepairing ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.anim.durations.window} ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%);
    background-size: 100% 4px;
    opacity: 0.1;
  }
`;

// Full-viewport overlay, forwardRef lets the RAF loop mutate backgroundColor without re-renders.
export const RepairOverlay = forwardRef<HTMLDivElement, RepairOverlayProps>(
  ({ isRepairing }, ref) => <Overlay ref={ref} $isRepairing={isRepairing} />,
);

RepairOverlay.displayName = 'RepairOverlay';
