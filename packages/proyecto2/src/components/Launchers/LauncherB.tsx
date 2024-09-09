import { ReactNode } from "react";

interface PopupProps {
  // eslint-disable-next-line no-unused-vars
  addPopup: (title: string, content: ReactNode) => void;
  styleButton: string;
}

const LauncherB: React.FC<PopupProps> = ({ addPopup, styleButton }) => {
  const handleAddPopup = () => {
    addPopup("Popup B", "Este es un texto");
  };

  return (
    <div>
      <button className={styleButton} onClick={handleAddPopup}>
        Add B
      </button>
    </div>
  );
};

export default LauncherB;