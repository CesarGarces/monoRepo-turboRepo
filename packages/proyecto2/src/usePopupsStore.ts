import { create } from "zustand";

export interface Popup {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  isActive: boolean;
  title: string;
  content: string;
}

interface PopupsStore {
  popups: Popup[];
  addPopup: (title: string, content: string) => void;
  closePopup: (id: string) => void;
  closeAll: () => void;
  activatePopup: (id: string) => void;
  setPosition: (id: string, position: { x: number; y: number }) => void;
}

const getRandomPosition = (max: number) => Math.floor(Math.random() * max);
const usePopupsStore = create<PopupsStore>(set => ({
  popups: [],
  addPopup: (title, content) =>
    set(state => {
      const newPopup: Popup = {
        id: crypto.randomUUID(),
        position: {
          x: getRandomPosition(300),
          y: getRandomPosition(300),
        },
        zIndex: state.popups.length + 1,
        isActive: false, // Set to false initially
        title,
        content,
      };
      return {
        popups: [...state.popups, newPopup],
      };
    }),
  closePopup: id =>
    set(state => ({
      popups: state.popups.filter(popup => popup.id !== id),
    })),
  closeAll: () =>
    set(() => ({
      popups: [],
    })),
  activatePopup: id =>
    set(state => ({
      popups: state.popups.map(popup =>
        popup.id === id
          ? { ...popup, isActive: true }
          : { ...popup, isActive: false }
      ),
    })),
  setPosition: (id, position) =>
    set(state => ({
      popups: state.popups.map(popup =>
        popup.id === id ? { ...popup, position } : popup
      ),
    })),
}));

export default usePopupsStore;
