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
        <div className={`pixel-window ${isRepairing ? 'hidden' : ''}`}>
          <div className="window-title">
            <span>Screen_Fixer.exe</span>
            <div className="window-controls">
              <div className="window-dot">_</div>
              <div className="window-dot">□</div>
              <div className="window-dot">X</div>
            </div>
          </div>
          
          <div className="window-content">
            <div className="pixel-eyes">
              <svg width="84" height="64" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
                {/* Left Eye */}
                <path d="M4 4h10v24H4z" fill="#fff" />
                <path d="M4 4v24M14 4v24M4 4h10M4 28h10" stroke="#000" strokeWidth="2" />
                <path d="M4 12h5v8H4z" fill="#000" />
                
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
      </main>
    </>
  );
}
