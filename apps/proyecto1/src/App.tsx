import { Suspense, lazy } from "react";
import { usePopups } from "@repo/proyecto2/usePopups"; // Adjust the import path as needed
import ComponenteB from "@repo/proyecto2/componenteB";
import "./App.css";

const PopupsProvider = lazy(() => import("@repo/proyecto2/PopupsProvider"));
const ComponenteA = lazy(() => import("@repo/proyecto2/componenteA"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <div ref={containerRef} className="popup-wrapper">
          <div className="button-group">
            <ComponenteA styleButton="button" addPopup={addPopup} />
            <ComponenteB styleButton="button" addPopup={addPopup} />
            <button className="button" onClick={closeAll}>
              Cerrar Todos
            </button>
          </div>
          {popups.map((popup) => (
            <Suspense key={popup.id} fallback={<div>Loading Popup...</div>}>
              <PopupsProvider
                id={popup.id}
                onClose={() => closePopup(popup.id)}
                initialPosition={popup.position}
                zIndex={popup.zIndex}
                isActive={activePopupId === popup.id}
                onActivate={() => activatePopup(popup.id)}
                parentRef={containerRef}
                title={popup.title}
                content={popup.content}
              />
            </Suspense>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default App;