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
import styled from 'styled-components';

// Internal imports
import { type Intensity, useScreenRepair } from '@/hooks/useScreenRepair';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useWindowState } from '@/hooks/useWindowState';
import { RepairOverlay } from '@/components/features/RepairOverlay';
import { WindowTitleBar } from '@/components/features/WindowTitleBar';
import { Taskbar } from '@/components/features/Taskbar';
import { RecycleBin } from '@/components/features/RecycleBin';
import { PixelEyes } from '@/components/common/PixelEyes';
import { Button } from '@/components/common/Button';
import { Disclaimer } from '@/components/common/Disclaimer';
import { AnimatedWindow, WindowContent } from '@/components/common/AnimatedWindow';

// Internal constants
const APP_TITLE = 'Screen_Fixer.exe';
const INTENSITY_LEVELS: Intensity[] = ['low', 'medium', 'high'];

// Local Styled Components for Page Layout
const FullscreenHintRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
  justify-content: center;

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FullscreenHintText = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.fullscreenText};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 0.72rem;
    max-width: 160px;
    line-height: 1.1;
    text-align: left;
  }
`;

const IntensitySelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
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
        <AnimatedWindow
          key={isRestoring ? 'restoring' : isTrashed ? 'trashed' : 'active'}
          isHidden={isRepairing}
          isMinimized={isMinimized}
          isMaximized={isMaximized}
          isTrashed={isTrashed}
          isRestoring={isRestoring}
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
              <FullscreenHintText>
                {isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen for best results'}
              </FullscreenHintText>
              <Button
                variant="fullscreen"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <kbd>F11</kbd>
              </Button>
            </FullscreenHintRow>

            <Disclaimer>
              <strong>SAFETY WARNING:</strong> This tool causes rapid flickering. Do not look
              directly at the screen to avoid eye strain. For best results, leave running in the
              background for 2-4 hours.
            </Disclaimer>

            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                startRepair();
              }}
            >
              Start Screen Repair
            </Button>

            <IntensitySelector>
              {INTENSITY_LEVELS.map((level) => (
                <Button
                  key={level}
                  variant="intensity"
                  $isActive={intensity === level}
                  onClick={() => setIntensity(level)}
                >
                  {level}
                </Button>
              ))}
            </IntensitySelector>
          </WindowContent>
        </AnimatedWindow>

        <Taskbar isVisible={isMinimized} title={APP_TITLE} onRestore={unminimize} />

        {(isTrashed || isRestoring) && <RecycleBin isRestoring={isRestoring} onRestore={restore} />}
      </main>
    </>
  );
}
