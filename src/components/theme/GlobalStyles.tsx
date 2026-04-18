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
import { createGlobalStyle, keyframes } from 'styled-components';

// Window crumble animation — simulating a crushing digital effect.
export const windowCrumble = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1) rotate(0);
    opacity: 1;
  }
  20% {
    transform: translate(-52%, -58%) scale(0.6) rotate(10deg) skew(15deg, -5deg);
  }
  40% {
    transform: translate(-48%, -50%) scale(0.3) rotate(-20deg) skew(-20deg, 10deg);
  }
  60% {
    transform: translate(-50%, -10vh) scale(0.1) rotate(45deg) skew(30deg, 20deg);
  }
  78% {
    transform: translate(-50%, 2vh) scale(0.02) rotate(360deg);
    opacity: 1;
  }
  84% {
    transform: translate(-50%, 5vh) scale(0.01) rotate(400deg);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, calc(50vh - 280px)) scale(0) rotate(720deg);
    opacity: 0;
  }
`;

// Reverse crumble for restoring windows from the trash.
export const windowUncrumble = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1) rotate(0);
    opacity: 1;
  }
  20% {
    transform: translate(-52%, -58%) scale(0.6) rotate(10deg) skew(15deg, -5deg);
  }
  40% {
    transform: translate(-48%, -50%) scale(0.3) rotate(-20deg) skew(-20deg, 10deg);
  }
  60% {
    transform: translate(-50%, -10vh) scale(0.1) rotate(45deg) skew(30deg, 20deg);
  }
  78% {
    transform: translate(-50%, 2vh) scale(0.02) rotate(360deg);
    opacity: 1;
  }
  84% {
    transform: translate(-50%, 5vh) scale(0.01) rotate(400deg);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, calc(50vh - 280px)) scale(0) rotate(720deg);
    opacity: 0;
  }
`;

// Bin entrance animation.
export const binPopIn = keyframes`
  from {
    transform: translateX(-50%) translateY(40px) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
`;

// Subtle idle bounce for the active bin icon.
export const binBounce = keyframes`
  0%,
  100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.15);
  }
`;

// Trash lid opening/closing sequence.
export const lidPop = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-90deg) translate(-20px, -20px);
  }
  75% {
    transform: rotate(-90deg) translate(-20px, -20px);
  }
  100% {
    transform: rotate(0);
  }
`;

// Global CSS reset and base layout styles.
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.colors.bgDesktop};
    color: ${({ theme }) => theme.colors.windowBorder};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bg-mesh {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .bg-mesh::after {
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
