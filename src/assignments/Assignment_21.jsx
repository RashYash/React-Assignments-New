import { useRef, useState } from "react";
import "./Assignment_21.css";

function rgbToHex(r, g, b) {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

export default function Assignment_21() {
  const [rgb, setRgb] = useState("");
  const [hex, setHex] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const canvasRef = useRef(null);

  function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);

      setImageLoaded(true);

      URL.revokeObjectURL(imageURL);
    };
  }

  function handleCanvasClick(event) {
    if (!imageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    const pixelData = ctx.getImageData(x, y, 1, 1).data;

    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    const rgbValue = `rgb(${r}, ${g}, ${b})`;
    const hexValue = rgbToHex(r, g, b);

    setRgb(rgbValue);
    setHex(hexValue);
  }

  return (
    <div className="assignment21-container">
      <h2 className="assignment21-title">Color Picker</h2>

      <div className="assignment21-upload">
        <label className="assignment21-upload-btn">
          Upload Image
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>

      <div className="assignment21-canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="assignment21-canvas"
          onClick={handleCanvasClick}
        />
      </div>

      {rgb && (
        <div className="assignment21-result">
          <div
            className="assignment21-color-preview"
            style={{ backgroundColor: rgb }}
          />

          <p>
            <strong>RGB:</strong> {rgb}
          </p>
          <p>
            <strong>HEX:</strong> {hex}
          </p>
        </div>
      )}
    </div>
  );
}
