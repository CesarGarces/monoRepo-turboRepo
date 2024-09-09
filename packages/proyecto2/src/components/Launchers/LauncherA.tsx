import { ReactNode } from "react";
import PopupContainerA from "../PopupContainers/PopupContainerA";

interface PopupProps {
  // eslint-disable-next-line no-unused-vars
  addPopup: (title: string, content: ReactNode) => void;
  styleButton: string;
}

const LauncherA: React.FC<PopupProps> = ({ addPopup, styleButton }) => {
  const handleAddPopup = () => {
    addPopup("Popup A", <PopupContainerA />);
  };

  return (
    <div>
      <button className={styleButton} onClick={handleAddPopup}>
        Add A
      </button>
    </div>
  );
};

export default LauncherA;