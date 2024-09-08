import { useRef } from "react";
import usePopupsStore from "../usePopupsStore";

export const usePopups = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const popups = usePopupsStore(state => state.popups);
  const addPopup = usePopupsStore(state => state.addPopup);
  const closePopup = usePopupsStore(state => state.closePopup);
  const closeAll = usePopupsStore(state => state.closeAll);
  const activatePopup = usePopupsStore(state => state.activatePopup);
  const activePopupId = popups.find(popup => popup.isActive)?.id || null;

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
