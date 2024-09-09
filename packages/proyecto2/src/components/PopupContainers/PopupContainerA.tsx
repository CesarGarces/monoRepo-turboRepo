import { useState } from "react";
import "./PopupContainerA.css";

const PopupContainerA: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className={`popup-container-launcher ${isAnimating ? 'animate-bounce' : ''}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-pressed={isAnimating}
    >
      <p className="popup-text">Click me to ¡Bounce!</p>
    </div>
  );
};

export default PopupContainerA;