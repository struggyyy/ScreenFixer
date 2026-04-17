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
import styled, { css } from 'styled-components';

// Internal imports
import { binBounce, binPopIn, lidPop } from '@/theme/GlobalStyles';

interface RecycleBinProps {
  isRestoring: boolean;
  onRestore: () => void;
}

// Animated trash can — click to restore the window.
const BinContainer = styled.div<{ $isFull?: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  z-index: 100;
  animation: ${binPopIn} ${({ theme }) => theme.anim.durations.long} ${({ theme }) =>
  theme.anim.easings.bounce};

  &:hover {
    transform: translateX(-50%) translateY(-5px);
  }

  ${({ $isFull, theme }) =>
    $isFull &&
    css`
      animation:
        ${binPopIn} ${theme.anim.durations.long} ${theme.anim.easings.bounce},
        ${binBounce} ${theme.anim.durations.slow} ${theme.anim.easings.bounce} ${theme.anim.durations.crumble};
    `}
`;

const TrashLid = styled.g<{ $isRestoring: boolean }>`
  transform-origin: 42px 60px;
  animation: ${lidPop} ${({ theme }) => theme.anim.durations.crumble} ${({ theme }) =>
  theme.anim.easings.standard}
    ${({ $isRestoring }) => ($isRestoring ? '0s' : '0.5s')};
`;

const BinLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.binLabelText};
  background: ${({ theme }) => theme.colors.binLabelBg};
  padding: 2px 6px;
  border-radius: 4px;
`;

// Animated trash can — click to restore the window.
export function RecycleBin({ isRestoring, onRestore }: RecycleBinProps) {
  return (
    <BinContainer $isFull={true} onClick={onRestore}>
      <div className="trash-icon">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trash body */}
          <g>
            <path d="M45 60h30v40H45V60z" fill="#4a4a4a" />
            <path d="M45 60v40M75 60v40M45 100h30" stroke="#000" strokeWidth="2" />
            <rect x="48" y="60" width="2" height="40" fill="#222" />
            <rect x="54" y="60" width="2" height="40" fill="#222" />
            <rect x="60" y="60" width="2" height="40" fill="#222" />
            <rect x="66" y="60" width="2" height="40" fill="#222" />
            <rect x="72" y="60" width="2" height="40" fill="#222" />
          </g>

          {/* Trash lid — keyed so React remounts it, restarting the animation on state change. */}
          <TrashLid key={isRestoring ? 'restoring' : 'idle'} $isRestoring={isRestoring}>
            <path d="M42 55h36v5H42v-5z" fill="#333" />
            <path d="M42 55v5M78 55v5M42 55h36" stroke="#000" strokeWidth="2" />
            <rect x="52" y="50" width="16" height="5" fill="#4a4a4a" />
            <path d="M52 50v5M68 50v5M52 50h16" stroke="#000" strokeWidth="2" />
          </TrashLid>
        </svg>
      </div>
      <BinLabel>{isRestoring ? 'Restoring...' : '1 Item'}</BinLabel>
    </BinContainer>
  );
}
