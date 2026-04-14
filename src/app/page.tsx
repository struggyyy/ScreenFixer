'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isRepairing, setIsRepairing] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const frameCount = useRef(0);
  const colorIndex = useRef(0);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];

  const animate = () => {
    frameCount.current++;
    
    // Change color every 3 frames (approx 50Hz on a 144Hz monitor, 20Hz on a 60Hz monitor)
    // This allows the LCD crystals enough time to actually transition
    if (frameCount.current >= 3) {
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
  }, [isRepairing]);

  return (
    <>
      <div 
        ref={bgRef}
        className="bg-mesh" 
        style={{ 
          opacity: isRepairing ? 1 : 0.4,
          transition: isRepairing ? 'none' : 'opacity 1s ease'
        }}
      >
        {!isRepairing && (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: 'rgba(58, 134, 255, 0.15)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 1 }} />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
          </svg>
        )}
      </div>
      
      <main>
        <button 
          className={`repair-button ${isRepairing ? 'hidden' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent immediate exit
            setIsRepairing(true);
          }}
          title="Click to start optimized pixel restoration"
        >
          Start Screen Repair
        </button>
      </main>
    </>
  );
}
