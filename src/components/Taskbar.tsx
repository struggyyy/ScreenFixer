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

import { PixelEyes } from './PixelEyes';

interface TaskbarProps {
  isVisible: boolean;
  title: string;
  onRestore: () => void;
}

// Bottom-left chip shown when minimized, click to restore the window.
export function Taskbar({ isVisible, title, onRestore }: TaskbarProps) {
  return (
    <div className={`taskbar ${isVisible ? 'visible' : ''}`}>
      <div className="taskbar-app" onClick={onRestore}>
        <PixelEyes width={26} />
        <span>{title}</span>
      </div>
    </div>
  );
}
