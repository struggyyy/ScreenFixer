interface RecycleBinProps {
  isRestoring: boolean;
  onRestore: () => void;
}

// Animated trash can — click to restore the window.
export function RecycleBin({ isRestoring, onRestore }: RecycleBinProps) {
  return (
    <div className="recycle-bin full" onClick={onRestore}>
      <div className="trash-icon">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trash body */}
          <g className="trash-body">
            <path d="M45 60h30v40H45V60z" fill="#4a4a4a" />
            <path d="M45 60v40M75 60v40M45 100h30" stroke="#000" strokeWidth="2" />
            <rect x="48" y="60" width="2" height="40" fill="#222" />
            <rect x="54" y="60" width="2" height="40" fill="#222" />
            <rect x="60" y="60" width="2" height="40" fill="#222" />
            <rect x="66" y="60" width="2" height="40" fill="#222" />
            <rect x="72" y="60" width="2" height="40" fill="#222" />
          </g>

          {/* Trash lid — keyed so React remounts it, restarting the CSS animation on state change. */}
          <g
            key={isRestoring ? 'restoring' : 'idle'}
            className={`trash-lid${isRestoring ? ' restoring' : ''}`}
          >
            <path d="M42 55h36v5H42v-5z" fill="#333" />
            <path d="M42 55v5M78 55v5M42 55h36" stroke="#000" strokeWidth="2" />
            <rect x="52" y="50" width="16" height="5" fill="#4a4a4a" />
            <path d="M52 50v5M68 50v5M52 50h16" stroke="#000" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <span className="bin-label">{isRestoring ? 'Restoring...' : '1 Item'}</span>
    </div>
  );
}
