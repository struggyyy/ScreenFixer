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
import { windowCrumble, windowUncrumble } from '@/theme/GlobalStyles';
import { type Intensity, useScreenRepair } from '@/hooks/useScreenRepair';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useWindowState } from '@/hooks/useWindowState';
import { RepairOverlay } from '@/components/RepairOverlay';
import { WindowTitleBar } from '@/components/WindowTitleBar';
import { PixelEyes } from '@/components/PixelEyes';
import { Taskbar } from '@/components/Taskbar';
import { RecycleBin } from '@/components/RecycleBin';

// Internal constants
const APP_TITLE = 'Screen_Fixer.exe';
const INTENSITY_LEVELS: Intensity[] = ['low', 'medium', 'high'];

// Styled Components

const Window = styled.div<{
  $isHidden: boolean;
  $isMinimized: boolean;
  $isMaximized: boolean;
  $isTrashed: boolean;
  $isRestoring: boolean;
}>`
  background: ${({ theme }) => theme.colors.windowBg};
  border: ${({ theme }) => theme.borders.window} solid ${({ theme }) =>
  theme.colors.windowBorder};
  box-shadow: ${({ theme }) => theme.shadows.window};
  width: 480px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.anim.durations.window} ${({ theme }) =>
  theme.anim.easings.standard};
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

const WindowContent = styled.div`
  padding: 1.4rem 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
`;

const FullscreenHintRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FullscreenHintText = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.fullscreenText};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const FullscreenBtn = styled.button`
  background: ${({ theme }) => theme.colors.fullscreenBtnBg};
  border: ${({ theme }) => theme.borders.btn} solid ${({ theme }) =>
  theme.colors.windowBorder};
  box-shadow:
    inset -3px -3px 0px ${({ theme }) => theme.colors.fullscreenBtnShadow},
    ${({ theme }) => theme.shadows.btn};
  padding: 0.25rem 0.6rem;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.anim.durations.short};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.windowBorder};
  font-weight: 700;
  letter-spacing: 0.04em;

  &:hover {
    background: ${({ theme }) => theme.colors.fullscreenBtnHoverBg};
    box-shadow:
      inset -3px -3px 0px ${({ theme }) => theme.colors.fullscreenBtnShadowHover},
      ${({ theme }) => theme.shadows.btn};
  }

  &:active {
    box-shadow: inset 3px 3px 0px ${({ theme }) => theme.colors.fullscreenBtnShadow};
    transform: translate(1px, 1px);
  }
`;

const RepairButton = styled.button`
  background: ${({ theme }) => theme.colors.btnBg};
  border: ${({ theme }) => theme.borders.btnLarge} solid ${({ theme }) =>
  theme.colors.windowBorder};
  box-shadow:
    inset -4px -4px 0px ${({ theme }) => theme.colors.btnShadow},
    ${({ theme }) => theme.shadows.btnLarge};
  padding: 1rem 2.5rem;
  font-size: 1.7rem;
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.anim.durations.short};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.windowBorder};

  &:hover {
    background: ${({ theme }) => theme.colors.btnHoverBg};
  }

  &:active {
    box-shadow: inset 4px 4px 0px ${({ theme }) => theme.colors.btnShadow};
    transform: translate(2px, 2px);
  }
`;

const IntensitySelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IntensityBtn = styled.button<{ $isActive: boolean }>`
  background: ${({ theme }) => theme.colors.btnHoverBg};
  border: ${({ theme }) => theme.borders.btn} solid ${({ theme }) =>
  theme.colors.windowBorder};
  padding: 6px 16px;
  font-family: inherit;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow:
    inset -2px -2px 0px ${({ theme }) => theme.colors.fullscreenBtnShadow},
    ${({ theme }) => theme.shadows.btn};

  &:hover {
    background: #d5d5d5;
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background: ${theme.colors.intensityActiveBg};
      box-shadow: inset 2px 2px 0px ${theme.colors.intensityActiveShadow};
      color: ${theme.colors.intensityActiveText};
      
      &:hover {
        background: #bbb;
      }
    `}
`;

const Disclaimer = styled.div`
  font-size: 0.85rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.disclaimerText};
  border: ${({ theme }) => theme.borders.btn} solid ${({ theme }) =>
  theme.colors.windowBorder};
  background: ${({ theme }) => theme.colors.disclaimerBg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: 15px;
  line-height: 1.5;
  box-shadow: ${({ theme }) => theme.shadows.btnLarge};
`;

// Main Page Component

export default function Home() {
  // Logic hooks
  const { isRepairing, intensity, setIntensity, startRepair, bgRef } = useScreenRepair();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { windowState, minimize, unminimize, toggleMaximize, close, restore } = useWindowState();

  const { isMinimized, isMaximized, isTrashed, isRestoring } = windowState;

  // Render
  return (
    <>
      <RepairOverlay ref={bgRef} isRepairing={isRepairing} />

      <main>
        <Window
          key={isRestoring ? 'restoring' : isTrashed ? 'trashed' : 'active'}
          $isHidden={isRepairing}
          $isMinimized={isMinimized}
          $isMaximized={isMaximized}
          $isTrashed={isTrashed}
          $isRestoring={isRestoring}
        >
          <WindowTitleBar
            title={APP_TITLE}
            isMaximized={isMaximized}
            onMinimize={minimize}
            onToggleMaximize={toggleMaximize}
            onClose={close}
          />

          <WindowContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PixelEyes />
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '0' }}>Let&apos;s clean!</h1>

            <FullscreenHintRow>
              <FullscreenBtn
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <kbd>F11</kbd>
              </FullscreenBtn>
              <FullscreenHintText>
                {isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen for best results'}
              </FullscreenHintText>
            </FullscreenHintRow>

            <RepairButton
              onClick={(e) => {
                e.stopPropagation();
                startRepair();
              }}
            >
              Start Screen Repair
            </RepairButton>

            <IntensitySelector>
              {INTENSITY_LEVELS.map((level) => (
                <IntensityBtn
                  key={level}
                  $isActive={intensity === level}
                  onClick={() => setIntensity(level)}
                >
                  {level}
                </IntensityBtn>
              ))}
            </IntensitySelector>

            <Disclaimer>
              <strong>SAFETY WARNING:</strong> This tool causes rapid flickering. Do not look
              directly at the screen to avoid eye strain. For best results, leave running in the
              background for 2-4 hours.
            </Disclaimer>
          </WindowContent>
        </Window>

        <Taskbar isVisible={isMinimized} title={APP_TITLE} onRestore={unminimize} />

        {(isTrashed || isRestoring) && <RecycleBin isRestoring={isRestoring} onRestore={restore} />}
      </main>
    </>
  );
}
