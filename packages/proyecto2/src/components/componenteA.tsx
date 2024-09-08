interface PopupProps {
  // eslint-disable-next-line no-unused-vars
  addPopup: (title: string, content: string) => void;
  styleButton: string;
}

const ComponenteA: React.FC<PopupProps> = ({ addPopup, styleButton }) => {
  const handleAddPopup = () => {
    addPopup("Popup A", "Component A");
  };

  return (
    <div>
      <button className={styleButton} onClick={handleAddPopup}>
        Add A
      </button>
    </div>
  );
};

export default ComponenteA;