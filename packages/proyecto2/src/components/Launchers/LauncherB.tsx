import { ReactNode } from "react";
import PopupContainerB from "../PopupContainers/PopupContainerB";
interface PopupProps {
  // eslint-disable-next-line no-unused-vars
  addPopup: (title: string, content: ReactNode) => void;
  styleButton: string;
}

const LauncherB: React.FC<PopupProps> = ({ addPopup, styleButton }) => {
  const handleAddPopup = () => {
    addPopup("Popup B", <PopupContainerB />);
  };

  return (
    <button className={styleButton} onClick={handleAddPopup}>
      Add B
    </button>
  );
};

export default LauncherB;