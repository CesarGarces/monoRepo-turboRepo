import { useState, useRef, RefObject, useEffect } from 'react';
import './PopupStyle.css';

interface PopupProps {
  id: string;
  onClose: (id: string) => void;
  initialPosition: { x: number; y: number };
  zIndex: number;
  isActive: boolean;
  onActivate: (id: string) => void;
  parentRef: RefObject<HTMLDivElement>;
  title: string;
  content: string;
}

const PopupsProvider: React.FC<PopupProps> = ({
  id,
  onClose,
  initialPosition,
  zIndex,
  isActive,
  onActivate,
  parentRef,
  title,
  content
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && popupRef.current && parentRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const { width, height } = popupRef.current.getBoundingClientRect();
        const newX = Math.min(Math.max(e.clientX - parentRect.left - dragStart.x, 0), parentRect.width - width);
        const newY = Math.min(Math.max(e.clientY - parentRect.top - dragStart.y, 0), parentRect.height - height);
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onActivate(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, parentRef]);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (popupRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - parentRect.left - popupRect.left + parentRect.left,
        y: e.clientY - parentRect.top - popupRect.top + parentRect.top
      });
      setIsDragging(true);
      onActivate(id);
    }
  };

  return (
    <div
      ref={popupRef}
      className={`popup-container ${isActive ? 'active' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex: zIndex }}
      onMouseDown={handleMouseDown}
    >
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button className="popup-close-button" onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}>
          X
        </button>
      </div>
      <hr className="popup-divider" />
      <div className="popup-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PopupsProvider;