interface PopupProps {
  addPopup: (title: string, content: string) => void;
  styleButton: string;
}
const ComponenteA: React.FC<PopupProps> = ({ addPopup, styleButton }) => {

  return (
    <div>
      <button className={styleButton} onClick={() => addPopup("Popup A", "Component A")}>Add A</button>
    </div>
  );
};

export default ComponenteA;