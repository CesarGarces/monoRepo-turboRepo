import { useState, useRef, RefObject } from "react";

interface Popup {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
  zIndex: number;
}

export const usePopups = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [activePopupId, setActivePopupId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const addPopup = (title: string, content: string) => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newPopup = {
        id: crypto.randomUUID(),
        title,
        content,
        position: {
          x: Math.random() * (width - 100),
          y: Math.random() * (height - 100),
        },
        zIndex: maxZIndex,
      };
      setPopups([...popups, newPopup]);
      setMaxZIndex(maxZIndex + 1);
    }
  };

  const closePopup = (id: string) => {
    setPopups(popups.filter(popup => popup.id !== id));
  };

  const closeAll = () => {
    setPopups([]);
    setMaxZIndex(1);
  };

  const activatePopup = (id: string) => {
    setActivePopupId(id);
    setPopups(
      popups.map(popup =>
        popup.id === id ? { ...popup, zIndex: maxZIndex } : popup
      )
    );
    setMaxZIndex(maxZIndex + 1);
  };

  return {
    popups,
    activePopupId,
    containerRef,
    addPopup,
    closePopup,
    closeAll,
    activatePopup,
  };
};
