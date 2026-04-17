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

// Window control interfaces and styled components.
interface WindowTitleBarProps {
  title: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
}

const TitleBar = styled.div`
  background: ${({ theme }) => theme.colors.titleBarBg};
  color: ${({ theme }) => theme.colors.titleBarText};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: ${({ theme }) => theme.borders.window} solid
    ${({ theme }) => theme.colors.windowBorder};
  user-select: none;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const ControlDot = styled.div<{ $type?: 'close' | 'default' }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.windowBorder};
  background: ${({ $type, theme }) =>
    $type === 'close' ? theme.colors.closeBtnBg : theme.colors.btnBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.windowBorder};
  cursor: pointer;

  &:hover {
    background: ${({ $type, theme }) =>
      $type === 'close' ? theme.colors.closeBtnHoverBg : theme.colors.btnHoverBg};
  }
`;

// Title bar component with OS-style window controls (macOS/Windows hybrid style).
export function WindowTitleBar({
  title,
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowTitleBarProps) {
  return (
    <TitleBar>
      <div className="window-title-text">{title}</div>
      <ControlsContainer>
        <ControlDot onClick={onMinimize}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1" y="8" width="10" height="2" fill="currentColor" />
          </svg>
        </ControlDot>
        <ControlDot onClick={onToggleMaximize}>
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect
                x="3"
                y="1"
                width="7"
                height="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <rect
                x="1"
                y="3"
                width="7"
                height="7"
                fill="white"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect
                x="2"
                y="2"
                width="8"
                height="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </ControlDot>
        <ControlDot $type="close" onClick={onClose}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2l8 8M2 10l8-8" stroke="white" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </ControlDot>
      </ControlsContainer>
    </TitleBar>
  );
}
