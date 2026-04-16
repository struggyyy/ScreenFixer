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
