import { useRef, useState } from 'react';
import PopupsProvider from '@repo/proyecto2/PopupsProvider';
import './App.css';

function App() {
  const [popups, setPopups] = useState<{ id: string; position: { x: number; y: number }; zIndex: number }[]>([])
  const [maxZIndex, setMaxZIndex] = useState(1)
  const [activePopupId, setActivePopupId] = useState<string | null>(null)
  const recuadroRef = useRef<HTMLDivElement>(null)

  const addPopup = () => {
    if (recuadroRef.current) {
      const { width, height } = recuadroRef.current.getBoundingClientRect()
      const newPopup = {
        id: crypto.randomUUID(),
        position: {
          x: Math.random() * (width - 100),
          y: Math.random() * (height - 100)
        },
        zIndex: maxZIndex
      }
      setPopups([...popups, newPopup])
      setMaxZIndex(maxZIndex + 1)
    }
  }

  const closePopup = (id: string) => {
    setPopups(popups.filter(popup => popup.id !== id))
  }

  const closeAll = () => {
    setPopups([])
    setMaxZIndex(1)
  }

  const activatePopup = (id: string) => {
    setActivePopupId(id)
    setPopups(popups.map(popup =>
      popup.id === id ? { ...popup, zIndex: maxZIndex } : popup
    ))
    setMaxZIndex(maxZIndex + 1)
  }

  return (
    <div className="container">
      <p style={{ color: 'black' }}>Prueba técnica 2024/Abril - React</p>
      <div ref={recuadroRef} className="popup-wrapper">
        <div className="button-group">
          <button className="button" onClick={addPopup}>Crear Popup</button>
          <button className="button" onClick={closeAll}>Cerrar Popups</button>
        </div>
        {popups.map(popup => (
          <PopupsProvider
            key={popup.id}
            id={popup.id}
            onClose={closePopup}
            initialPosition={popup.position}
            zIndex={popup.zIndex}
            isActive={activePopupId === popup.id}
            onActivate={activatePopup}
            parentRef={recuadroRef}
          />
        ))}
      </div>
    </div>
  );
}

export default App;