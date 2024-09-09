/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { ReactNode } from "react";

export interface Popup {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  isActive: boolean;
  title: string;
  content: ReactNode;
}

interface PopupsStore {
  popups: Popup[];
  addPopup: (title: string, content: ReactNode) => void;
  closePopup: (id: string) => void;
  closeAll: () => void;
  activatePopup: (id: string | null) => void;
  setPosition: (id: string, position: { x: number; y: number }) => void;
  setZIndex: (id: string, zIndex: number) => void;
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
        isActive: false,
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
    set(state => {
      const updatedPopups = state.popups.map(popup =>
        popup.id === id
          ? { ...popup, isActive: true }
          : { ...popup, isActive: false }
      );
      // Asignar zIndex más alto al popup activo
      const highestZIndex = Math.max(
        ...updatedPopups.map(popup => popup.zIndex)
      );
      return {
        popups: updatedPopups.map(popup =>
          popup.id === id
            ? { ...popup, zIndex: highestZIndex + 1 } // Asignar zIndex más alto al popup activo
            : popup
        ),
      };
    }),

  setPosition: (id, position) =>
    set(state => ({
      popups: state.popups.map(popup =>
        popup.id === id ? { ...popup, position } : popup
      ),
    })),

  setZIndex: (id, zIndex) =>
    set(state => ({
      popups: state.popups.map(popup =>
        popup.id === id ? { ...popup, zIndex } : popup
      ),
    })),
}));

export default usePopupsStore;
