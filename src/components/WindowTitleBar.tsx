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

interface WindowTitleBarProps {
  title: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
}

// Title bar with app name and minimize / maximize / close controls.
export function WindowTitleBar({
  title,
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowTitleBarProps) {
  return (
    <div className="window-title">
      <span>{title}</span>
      <div className="window-controls">
        {/* Minimize */}
        <div className="window-dot" onClick={onMinimize}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1" y="7" width="8" height="2" fill="currentColor" />
          </svg>
        </div>

        {/* Maximize / Restore */}
        <div className="window-dot" onClick={onToggleMaximize}>
          {isMaximized ? (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M3 1h6v6H3V1zM1 3h6v6H1V3z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path d="M3 1h6M3 2h6M1 3h6M1 4h6" stroke="currentColor" strokeWidth="1" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect
                x="1"
                y="1"
                width="8"
                height="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>

        {/* Close */}
        <div className="window-dot window-dot-close" onClick={onClose}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1 1l8 8M1 9l8-8" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
