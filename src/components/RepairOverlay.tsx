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

// React-specific imports
import { forwardRef } from 'react';

interface RepairOverlayProps {
  isRepairing: boolean;
}

// Full-viewport overlay, forwardRef lets the RAF loop mutate backgroundColor without re-renders.
export const RepairOverlay = forwardRef<HTMLDivElement, RepairOverlayProps>(
  ({ isRepairing }, ref) => (
    <div
      ref={ref}
      className="bg-mesh"
      style={{ transition: isRepairing ? 'none' : 'opacity 1s ease' }}
    />
  ),
);

RepairOverlay.displayName = 'RepairOverlay';
