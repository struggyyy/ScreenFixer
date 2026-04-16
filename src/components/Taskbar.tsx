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
