export default function Home() {
  return (
    <>
      <div className="bg-mesh">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: 'rgba(58, 134, 255, 0.15)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" />
        </svg>
      </div>
      
      <main>
        <button className="repair-button" disabled title="System Initializing...">
          Start Screen Repair
        </button>
      </main>
    </>
  );
}
