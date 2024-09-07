interface PopupProps {
  addPopup: (title: string, content: string) => void;
  styleButton: string;
}
const ComponenteB: React.FC<PopupProps> = ({ addPopup, styleButton }) => {

  return (
    <div>
      <button className={styleButton} onClick={() => addPopup("Popup B", "Component B")}>Add B</button>
    </div>
  );
};

export default ComponenteB;