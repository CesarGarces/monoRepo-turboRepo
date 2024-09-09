/* eslint-disable no-unused-vars */
import { useState, useRef, RefObject, useEffect, ReactNode } from 'react';
import usePopupsStore from '../../store/usePopupsStore';
import './PopupStyle.css';

interface PopupProps {
  id: string;
  onClose: (id: string) => void;
  initialPosition: { x: number; y: number };
  zIndex: number;
  parentRef: RefObject<HTMLDivElement>;
  title: string;
  content: ReactNode;
}

const PopupsProvider: React.FC<PopupProps> = ({
  id,
  onClose,
  initialPosition,
  zIndex,
  parentRef,
  title,
  content
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const { popups, activatePopup, setZIndex } = usePopupsStore(state => ({
    popups: state.popups,
    activatePopup: state.activatePopup,
    setZIndex: state.setZIndex,
  }));

  useEffect(() => {
    /**
      * Maneja el movimiento del mouse durante el arrastre del popup.
      * 
      * Esta función se ejecuta cuando el usuario mueve el mouse mientras está arrastrando el popup.
      * Calcula la nueva posición del popup en función de la posición del mouse y las restricciones
      * del área contenedora para evitar que el popup se mueva fuera de los límites visibles.
      * 
      * @param e - El evento del mouse que contiene la posición actual del cursor.
      */
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
      if (isDragging) {
        setIsDragging(false);
        activatePopup(null);
        setZIndex(id, zIndex); // Restablece el zIndex original después de arrastrar
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    /**
      * Función de limpieza "cleanup function" que elimina los manejadores de eventos cuando el componente se desmonta
      * o el efecto de arrastre deja de ser necesario.
      * 
      * Esta función se asegura de que los eventos de `mousemove` y `mouseup` sean eliminados del
      * documento para evitar fugas de memoria y evitar que las funciones de manejo de eventos se
      * sigan ejecutando después de que el componente haya sido desmontado o el arrastre haya terminado.
      * 
      * Se llama automáticamente cuando el efecto asociado con `handleMouseMove` y `handleMouseUp`
      * se limpia, por ejemplo, cuando el componente se desmonta o se detiene el arrastre.
      */
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, parentRef, activatePopup, setZIndex, id, zIndex]);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (popupRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - parentRect.left - popupRect.left + parentRect.left,
        y: e.clientY - parentRect.top - popupRect.top + parentRect.top
      });
      setIsDragging(true);
      activatePopup(id); // Usa activatePopup del store
    }
  };

  // Encuentra el popup correspondiente en el estado del store
  const popup = popups.find(popup => popup.id === id);
  const isActive = popup?.isActive ?? false;
  const currentZIndex = popup?.zIndex ?? zIndex;

  return (
    <aside
      ref={popupRef}
      className={`popup-container ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: currentZIndex // Usa el zIndex del popup
      }}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-labelledby={`popup-title-${id}`} // Usa el id del popup
      aria-modal="true" // Indica que el popup es modal
    >
      <header className="popup-header">
        <h3 id={`popup-title-${id}`} className="popup-title">Title: {title}</h3>
        <button
          className="popup-close-button"
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          aria-label="Close popup"
        >
          X
        </button>
      </header>
      <hr className="popup-divider" />
      <main className="popup-content">
        {content}
      </main>
    </aside>
  );
};

export default PopupsProvider;