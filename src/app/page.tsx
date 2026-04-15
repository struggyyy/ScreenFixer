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
        <div className={`pixel-window ${isRepairing ? 'hidden' : ''} ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}>
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
              <div className="window-dot window-dot-close">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M1 1l8 8M1 9l8-8" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="window-content">
            <div className="pixel-eyes">
              <svg width="84" height="64" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left Eye */}
                <path d="M8 4h10v24H8z" fill="#fff" />
                <path d="M8 4v24M18 4v24M8 4h10M8 28h10" stroke="#000" strokeWidth="2" />
                <path d="M8 12h5v8H8z" fill="#000" />
                
                {/* Right Eye */}
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

        {/* Taskbar */}
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
      </main>
    </>
  );
}
