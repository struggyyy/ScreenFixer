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
import React from 'react';

// External libraries
import styled, { css } from 'styled-components';

// Internal imports
import { windowCrumble, windowUncrumble } from '@/components/theme/GlobalStyles';

interface AnimatedWindowProps {
  isHidden: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isTrashed: boolean;
  isRestoring: boolean;
  children: React.ReactNode;
}

const StyledWindow = styled.div<{
  $isHidden: boolean;
  $isMinimized: boolean;
  $isMaximized: boolean;
  $isTrashed: boolean;
  $isRestoring: boolean;
}>`
  background: ${({ theme }) => theme.colors.windowBg};
  border: ${({ theme }) => theme.borders.window} solid ${({ theme }) => theme.colors.windowBorder};
  box-shadow: ${({ theme }) => theme.shadows.window};
  width: 480px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.anim.durations.window}
    ${({ theme }) => theme.anim.easings.standard};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ $isHidden }) =>
    $isHidden &&
    css`
      opacity: 0;
      transform: translate(-50%, -50%) translateY(40px) scale(0.95);
      pointer-events: none;
      z-index: 10001;
    `}

  ${({ $isMinimized }) =>
    $isMinimized &&
    css`
      transform: translate(calc(-50vw + 120px), calc(50vh - 40px)) scale(0);
      opacity: 0;
      pointer-events: none;
    `}

  ${({ $isMaximized }) =>
    $isMaximized &&
    css`
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      border-width: 0;
      box-shadow: none;
      z-index: 50;
      border-radius: 0;
    `}

  ${({ $isTrashed, theme }) =>
    $isTrashed &&
    css`
      animation: ${windowCrumble} ${theme.anim.durations.crumble} forwards
        ${theme.anim.easings.standard};
      pointer-events: none;
    `}

  ${({ $isRestoring, theme }) =>
    $isRestoring &&
    css`
      animation: ${windowUncrumble} ${theme.anim.durations.crumble} ${theme.anim.easings.standard}
        reverse both;
    `}
`;

const StyledWindowContent = styled.div`
  padding: 1.4rem 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    gap: 0.6rem;
  }
`;

export function AnimatedWindow({
  isHidden,
  isMinimized,
  isMaximized,
  isTrashed,
  isRestoring,
  children,
}: AnimatedWindowProps) {
  return (
    <StyledWindow
      $isHidden={isHidden}
      $isMinimized={isMinimized}
      $isMaximized={isMaximized}
      $isTrashed={isTrashed}
      $isRestoring={isRestoring}
    >
      {children}
    </StyledWindow>
  );
}

// Window content container wrapper
export function WindowContent({ children }: { children: React.ReactNode }) {
  return <StyledWindowContent>{children}</StyledWindowContent>;
}
