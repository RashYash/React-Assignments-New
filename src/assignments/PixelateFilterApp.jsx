import React, { useRef, useState } from "react";
import "./PixelateFilterApp.css";

const pixelateImage = (sourceCanvas, outputCanvas, size) => {
  if (!sourceCanvas || !outputCanvas) return;

  const sourceContext = sourceCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  const outputContext = outputCanvas.getContext("2d");

  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  outputContext.clearRect(0, 0, width, height);

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      const aWidth = Math.min(size, width - x);
      const aHeight = Math.min(size, height - y);

      const data = sourceContext.getImageData(x, y, aWidth, aHeight).data;

      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const count = data.length / 4;

      r = r / count;
      g = g / count;
      b = b / count;

      outputContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
      outputContext.fillRect(x, y, size, size);
    }
  }
};

export default function PixelateFilterApp() {
  const sourceCanvasRef = useRef(null);
  const outputCanvasRef = useRef(null);

  const [pixelSize, setPixelSize] = useState(10);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const sourceCanvas = sourceCanvasRef.current;
      const outputCanvas = outputCanvasRef.current;

      const sourceContext = sourceCanvas.getContext("2d");

      sourceCanvas.width = image.width;
      sourceCanvas.height = image.height;

      outputCanvas.width = image.width;
      outputCanvas.height = image.height;

      sourceContext.drawImage(image, 0, 0);

      setImageLoaded(true);

      pixelateImage(sourceCanvas, outputCanvas, pixelSize);
    };
  };

  const handleSliderChange = (event) => {
    const size = parseInt(event.target.value);
    setPixelSize(size);

    if (imageLoaded) {
      pixelateImage(sourceCanvasRef.current, outputCanvasRef.current, size);
    }
  };

  const handleDownload = () => {
    const outputCanvas = outputCanvasRef.current;

    outputCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "pixelated-image.png";
      anchor.style.display = "none";

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setTimeout(() => URL.revokeObjectURL(url), 50);
    });
  };

  return (
    <div className="pixelate-app">
      <h1 className="pixelate-title">Image Pixelate Filter App</h1>

      <div className="pixelate-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="pixelate-upload"
        />

        <div className="pixelate-slider-box">
          <label>Pixel Size: {pixelSize}</label>
          <input
            type="range"
            min="2"
            max="50"
            value={pixelSize}
            onChange={handleSliderChange}
            className="pixelate-slider"
          />
        </div>

        <button
          onClick={handleDownload}
          className="pixelate-download"
          disabled={!imageLoaded}
        >
          Download Image
        </button>
      </div>

      <div className="pixelate-container">
        <div className="pixelate-panel">
          <h3>Original Image</h3>
          <canvas ref={sourceCanvasRef} className="pixelate-canvas" />
        </div>

        <div className="pixelate-panel">
          <h3>Pixelated Image</h3>
          <canvas ref={outputCanvasRef} className="pixelate-canvas" />
        </div>
      </div>
    </div>
  );
}
