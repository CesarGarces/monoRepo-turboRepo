import PopupsProvider from '@repo/proyecto2/PopupsProvider';
import { usePopups } from '@repo/proyecto2/usePopups';
import ComponenteA from '@repo/proyecto2/componenteA';
import ComponenteB from '@repo/proyecto2/componenteB';
import './App.css';

const App: React.FC = () => {
  const {
    popups,
    activePopupId,
    containerRef,
    addPopup,
    closePopup,
    closeAll,
    activatePopup,
  } = usePopups();

  return (
    <div className="App">
      <div ref={containerRef} className="popup-wrapper">
        <div className="button-group">
          <ComponenteA styleButton="button" addPopup={addPopup} />
          <ComponenteB styleButton="button" addPopup={addPopup} />
          <button className="button" onClick={closeAll}>Cerrar Todos</button>
        </div>
        {popups.map((popup) => (
          <PopupsProvider
            key={popup.id}
            id={popup.id}
            onClose={closePopup}
            initialPosition={popup.position}
            zIndex={popup.zIndex}
            isActive={activePopupId === popup.id}
            onActivate={activatePopup}
            parentRef={containerRef}
            title={popup.title}
            content={popup.content}
          />
        ))}
      </div>
    </div>
  );
};

export default App;