import { Suspense, lazy } from "react";
import { usePopups } from "@repo/proyecto2/usePopups";
import LauncherB from "@repo/proyecto2/LauncherB";
import "./App.css";

const PopupsProvider = lazy(() => import("@repo/proyecto2/PopupsProvider"));
const LauncherA = lazy(() => import("@repo/proyecto2/LauncherA"));

const App: React.FC = () => {
  const {
    popups,
    containerRef,
    addPopup,
    closePopup,
    closeAll,
  } = usePopups();

  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <header className="header">
          <p>Prueba técnica 09/09/2024 - React - Cesar Garcés</p>
          <p>Popups: {popups.length}</p>
        </header>
        <main ref={containerRef} className="popup-wrapper">
          <section className="button-group">
            <LauncherA styleButton="button" addPopup={addPopup} />
            <LauncherB styleButton="button" addPopup={addPopup} />
            <button className="button" onClick={closeAll}>
              Cerrar Todos
            </button>
          </section>
          {popups.map((popup) => (
            <Suspense key={popup.id} fallback={<p>Loading Popup...</p>}>
              <PopupsProvider
                id={popup.id}
                onClose={() => closePopup(popup.id)}
                initialPosition={popup.position}
                zIndex={popup.zIndex}
                parentRef={containerRef}
                title={popup.title}
                content={popup.content}
              />
            </Suspense>
          ))}
        </main>
      </Suspense>
    </div>
  );
};

export default App;