'use client';

import { useState, useEffect, useRef } from 'react';

type Intensity = 'low' | 'medium' | 'high';

const INTENSITY_MAP: Record<Intensity, number> = {
  low: 10,
  medium: 4,
  high: 2,
};

export default function Home() {
  const [isRepairing, setIsRepairing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTrashed, setIsTrashed] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const bgRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const frameCount = useRef(0);
  const colorIndex = useRef(0);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];

  const animate = () => {
    frameCount.current++;
    
    if (frameCount.current >= INTENSITY_MAP[intensity]) {
      frameCount.current = 0;
      colorIndex.current = (colorIndex.current + 1) % colors.length;
      
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = colors[colorIndex.current];
      }
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRepairing) {
      requestRef.current = requestAnimationFrame(animate);
      
      const handleExit = (e: KeyboardEvent | MouseEvent) => {
        if (e.type === 'click' || (e instanceof KeyboardEvent && (e.key === 'Escape' || e.key === ' '))) {
          setIsRepairing(false);
        }
      };

      window.addEventListener('keydown', handleExit);
      window.addEventListener('click', handleExit);

      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        window.removeEventListener('keydown', handleExit);
        window.removeEventListener('click', handleExit);
      };
    } else {
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = 'transparent';
      }
    }
  }, [isRepairing, intensity]);

  const handleClose = () => {
    setIsMaximized(false); 
    setIsTrashed(true);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    setIsTrashed(false);
    setTimeout(() => setIsRestoring(false), 1200);
  };

  return (
    <>
      <div 
        ref={bgRef}
        className="bg-mesh" 
        style={{ 
          opacity: isRepairing ? 1 : 1,
          transition: isRepairing ? 'none' : 'opacity 1s ease'
        }}
      />
      
      <main>
        <div className={`pixel-window ${isRepairing ? 'hidden' : ''} ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isTrashed ? 'trashed' : ''} ${isRestoring ? 'restoring' : ''}`}>
          <div className="window-title">
            <span>Screen_Fixer.exe</span>
            <div className="window-controls">
              <div className="window-dot" onClick={() => setIsMinimized(true)}>
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <rect x="1" y="7" width="8" height="2" fill="currentColor" />
                </svg>
              </div>
              <div className="window-dot" onClick={() => setIsMaximized(!isMaximized)}>
                {isMaximized ? (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M3 1h6v6H3V1zM1 3h6v6H1V3z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M3 1h6M3 2h6M1 3h6M1 4h6" stroke="currentColor" strokeWidth="1" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <div className="window-dot window-dot-close" onClick={handleClose}>
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M1 1l8 8M1 9l8-8" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="window-content">
            <div className="pixel-eyes">
              <svg width="84" height="64" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4h10v24H8z" fill="#fff" />
                <path d="M8 4v24M18 4v24M8 4h10M8 28h10" stroke="#000" strokeWidth="2" />
                <path d="M8 12h5v8H8z" fill="#000" />
                <path d="M24 4h10v24H24z" fill="#fff" />
                <path d="M24 4v24M34 4v24M24 4h10M24 28h10" stroke="#000" strokeWidth="2" />
                <path d="M24 12h5v8H24z" fill="#000" />
              </svg>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Let&apos;s clean!</h1>
            
            <button 
              className="repair-button"
              onClick={(e) => {
                e.stopPropagation(); 
                setIsRepairing(true);
              }}
            >
              Start Screen Repair
            </button>

            <div className="intensity-selector">
              {(['low', 'medium', 'high'] as Intensity[]).map((level) => (
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
              <strong>SAFETY WARNING:</strong> This tool causes rapid flickering. 
              Do not look directly at the screen to avoid eye strain. 
              For best results, leave running in the background for 2-4 hours.
            </div>
          </div>
        </div>

        {/* Taskbar (Bottom Left) */}
        <div className={`taskbar ${isMinimized ? 'visible' : ''}`}>
          <div className="taskbar-app" onClick={() => setIsMinimized(false)}>
            <svg width="26" height="20" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4h10v24H8z" fill="#fff" />
              <path d="M8 4v24M18 4v24M8 4h10M8 28h10" stroke="#000" strokeWidth="2" />
              <path d="M8 12h5v8H8z" fill="#000" />
              <path d="M24 4h10v24H24z" fill="#fff" />
              <path d="M24 4v24M34 4v24M24 4h10M24 28h10" stroke="#000" strokeWidth="2" />
              <path d="M24 12h5v8H24z" fill="#000" />
            </svg>
            <span>Screen_Fixer.exe</span>
          </div>
        </div>

        {/* Recycle Bin (Bottom Middle) - Visible when trashed or restoring */}
        {(isTrashed || isRestoring) && (
          <div className="recycle-bin full" onClick={handleRestore}>
            <div className="trash-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Trash Body (shifted +30x, +50y) */}
                <g className="trash-body">
                  <path d="M45 60h30v40H45V60z" fill="#4a4a4a" />
                  <path d="M45 60v40M75 60v40M45 100h30" stroke="#000" strokeWidth="2" />
                  <rect x="48" y="60" width="2" height="40" fill="#222" />
                  <rect x="54" y="60" width="2" height="40" fill="#222" />
                  <rect x="60" y="60" width="2" height="40" fill="#222" />
                  <rect x="66" y="60" width="2" height="40" fill="#222" />
                  <rect x="72" y="60" width="2" height="40" fill="#222" />
                </g>
                
                {/* Trash Lid (shifted +30x, +50y, origin at 42 60) */}
                <g key={isRestoring ? 'restoring' : 'idle'} className={`trash-lid${isRestoring ? ' restoring' : ''}`}>
                  <path d="M42 55h36v5H42v-5z" fill="#333" />
                  <path d="M42 55v5M78 55v5M42 55h36" stroke="#000" strokeWidth="2" />
                  <rect x="52" y="50" width="16" height="5" fill="#4a4a4a" />
                  <path d="M52 50v5M68 50v5M52 50h16" stroke="#000" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <span className="bin-label">{isRestoring ? 'Restoring...' : '1 Item'}</span>
          </div>
        )}
      </main>
    </>
  );
}
