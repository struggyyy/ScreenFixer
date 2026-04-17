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

import { type Intensity, useScreenRepair } from '@/hooks/useScreenRepair';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useWindowState } from '@/hooks/useWindowState';

import { RepairOverlay } from '@/components/RepairOverlay';
import { WindowTitleBar } from '@/components/WindowTitleBar';
import { PixelEyes } from '@/components/PixelEyes';
import { Taskbar } from '@/components/Taskbar';
import { RecycleBin } from '@/components/RecycleBin';

const APP_TITLE = 'Screen_Fixer.exe';
const INTENSITY_LEVELS: Intensity[] = ['low', 'medium', 'high'];

export default function Home() {
  const { isRepairing, intensity, setIntensity, startRepair, bgRef } = useScreenRepair();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { windowState, minimize, unminimize, toggleMaximize, close, restore } = useWindowState();

  const { isMinimized, isMaximized, isTrashed, isRestoring } = windowState;

  const windowClasses = [
    'pixel-window',
    isRepairing && 'hidden',
    isMinimized && 'minimized',
    isMaximized && 'maximized',
    isTrashed && 'trashed',
    isRestoring && 'restoring',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <RepairOverlay ref={bgRef} isRepairing={isRepairing} />

      <main>
        <div className={windowClasses}>
          <WindowTitleBar
            title={APP_TITLE}
            isMaximized={isMaximized}
            onMinimize={minimize}
            onToggleMaximize={toggleMaximize}
            onClose={close}
          />

          <div className="window-content">
            <div className="pixel-eyes">
              <PixelEyes />
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '0' }}>Let&apos;s clean!</h1>

            <div className="fullscreen-hint-row">
              <button
                className="fullscreen-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <kbd>F11</kbd>
              </button>
              <span className="fullscreen-hint-text">
                {isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen for best results'}
              </span>
            </div>

            <button
              className="repair-button"
              onClick={(e) => {
                e.stopPropagation();
                startRepair();
              }}
            >
              Start Screen Repair
            </button>

            <div className="intensity-selector">
              {INTENSITY_LEVELS.map((level) => (
                <button
                  key={level}
                  className={`intensity-btn ${intensity === level ? 'active' : ''}`}
                  onClick={() => setIntensity(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="disclaimer">
              <strong>SAFETY WARNING:</strong> This tool causes rapid flickering. Do not look
              directly at the screen to avoid eye strain. For best results, leave running in the
              background for 2-4 hours.
            </div>
          </div>
        </div>

        <Taskbar isVisible={isMinimized} title={APP_TITLE} onRestore={unminimize} />

        {(isTrashed || isRestoring) && <RecycleBin isRestoring={isRestoring} onRestore={restore} />}
      </main>
    </>
  );
}
