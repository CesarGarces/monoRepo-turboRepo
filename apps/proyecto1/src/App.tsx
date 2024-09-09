import { Suspense, lazy } from "react";
import { usePopups } from "@repo/proyecto2/usePopups";
import LauncherB from "@repo/proyecto2/LauncherB";
import "./App.css";

const PopupsProvider = lazy(() => import("@repo/proyecto2/PopupsProvider"));
const LauncherA = lazy(() => import("@repo/proyecto2/LauncherA"));

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
            <LauncherA styleButton="button" addPopup={addPopup} />
            <LauncherB styleButton="button" addPopup={addPopup} />
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