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

interface CopyrightTagProps {
  isHidden?: boolean;
}

// Fixed bottom-right tag displaying copyright attribution in the retro font.
const TagContainer = styled.div<{ $isHidden: boolean }>`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.binLabelText};
  background: ${({ theme }) => theme.colors.binLabelBg};
  padding: 4px 8px;
  border-radius: 4px;
  user-select: none;
  pointer-events: ${({ $isHidden }) => ($isHidden ? 'none' : 'auto')};
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  transition:
    opacity ${({ theme }) => theme.anim.durations.slow}
      ${({ theme }) => theme.anim.easings.standard},
    visibility ${({ theme }) => theme.anim.durations.slow};

  @media (max-width: 480px) {
    bottom: 0.25rem;
    right: 0.25rem;
    font-size: 0.85rem;
    padding: 2px 6px;
  }
`;

// Copyright tag pinned to the bottom-right corner, hidden during screen repair.
export function CopyrightTag({ isHidden = false }: CopyrightTagProps) {
  return (
    <TagContainer $isHidden={isHidden} data-testid="copyright-tag">
      © 2026 STRUGGYYY
    </TagContainer>
  );
}
