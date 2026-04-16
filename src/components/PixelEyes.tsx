interface PixelEyesProps {
  // Width in px, height auto-scales to maintain the 42×32 viewBox ratio.
  width?: number;
}

// Pixel-art eyes SVG — shared between the main window and taskbar.
export function PixelEyes({ width = 84 }: PixelEyesProps) {
  // Maintain the 42:32 aspect ratio of the viewBox.
  const height = Math.round((width / 42) * 32);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left eye */}
      <path d="M8 4h10v24H8z" fill="#fff" />
      <path d="M8 4v24M18 4v24M8 4h10M8 28h10" stroke="#000" strokeWidth="2" />
      <path d="M8 12h5v8H8z" fill="#000" />

      {/* Right eye */}
      <path d="M24 4h10v24H24z" fill="#fff" />
      <path d="M24 4v24M34 4v24M24 4h10M24 28h10" stroke="#000" strokeWidth="2" />
      <path d="M24 12h5v8H24z" fill="#000" />
    </svg>
  );
}
