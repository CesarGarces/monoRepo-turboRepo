import { useRef, useState, useEffect } from "react";

const PopupContainerB: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  // Iniciar la webcam al montar el componente
  useEffect(() => {
    const constraints = {
      audio: false, // No necesitamos audio
      video: {
        width: 200,
        height: 200,
      },
    };

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (e) {
        console.error("Error accediendo a la webcam:", e);
      }
    };

    init();
  }, []);

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 200, 200);

        // Obtener la imagen del canvas como una URL
        const imageData = canvasRef.current.toDataURL("image/png");
        setImage(imageData); // Guardar la imagen en el estado
        setIsCameraVisible(false); // Ocultar la cámara
      }
    }
  };

  return (
    <article>
      <h2>Captura una foto</h2>
      {isCameraVisible && (
        <section>
          <video ref={videoRef} autoPlay playsInline width="200" height="200" />
        </section>
      )}
      {isCameraVisible && (
        <button onClick={handleCapture}>Capturar Foto</button>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} width="200" height="200"></canvas>
      {image && (
        <aside style={{ width: "200px", height: "200px", border: "1px solid black" }}>
          {/* Mostrar la imagen capturada */}
          <img src={image} alt="captured" width="200" height="200" />
        </aside>
      )}
    </article>
  );
};

export default PopupContainerB;