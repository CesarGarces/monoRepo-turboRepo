interface PopupProps {
  // eslint-disable-next-line no-unused-vars
  addPopup: (title: string, content: string) => void;
  styleButton: string;
}
const ComponenteB: React.FC<PopupProps> = ({ addPopup, styleButton }) => {

  const handleAddPopup = () => {
    addPopup("Popup B", "Component B");
  };

  return (
    <div>
      <button className={styleButton} onClick={handleAddPopup}>Add B</button>
    </div>
  );
};

export default ComponenteB;