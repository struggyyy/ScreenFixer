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

// External libraries
import styled from 'styled-components';

// Internal imports
import { PixelEyes } from './PixelEyes';

interface TaskbarProps {
  isVisible: boolean;
  title: string;
  onRestore: () => void;
}

// Bottom-left taskbar item that appears when the window is minimized.
const TaskbarContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 100;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '20px')});
  transition: all ${({ theme }) => theme.anim.durations.slow} ${({ theme }) =>
  theme.anim.easings.standard};
`;

const AppChip = styled.div`
  background: ${({ theme }) => theme.colors.btnBg};
  border: ${({ theme }) => theme.borders.btn} solid ${({ theme }) =>
  theme.colors.windowBorder};
  box-shadow:
    inset -2px -2px 0px ${({ theme }) => theme.colors.btnShadow},
    ${({ theme }) => theme.shadows.btn};
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.anim.durations.md} ${({ theme }) =>
  theme.anim.easings.bounce},
    background ${({ theme }) => theme.anim.durations.md},
    box-shadow ${({ theme }) => theme.anim.durations.md};
  color: ${({ theme }) => theme.colors.windowBorder};
  overflow: visible;

  &:hover {
    background: ${({ theme }) => theme.colors.btnHoverBg};
    transform: translateY(-4px);
    box-shadow:
      inset -2px -2px 0px ${({ theme }) => theme.colors.btnShadow},
      4px 4px 0px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: inset 2px 2px 0px ${({ theme }) => theme.colors.btnShadow};
  }
`;

// Bottom-left chip shown when minimized, click to restore the window.
export function Taskbar({ isVisible, title, onRestore }: TaskbarProps) {
  return (
    <TaskbarContainer $isVisible={isVisible}>
      <AppChip onClick={onRestore}>
        <PixelEyes width={26} />
        <span>{title}</span>
      </AppChip>
    </TaskbarContainer>
  );
}
