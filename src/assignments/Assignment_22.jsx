import { useState } from "react";
import "./Assignment_22.css";

export default function Assignment_22() {
  const [imageURL, setImageURL] = useState(null);

  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageURL(url);
  }

  function resetFilters() {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
    setSaturate(100);
    setSepia(0);
  }

  return (
    <div className="assignment22-container">
      <input type="file" onChange={handleUpload} />

      {imageURL && (
        <img
          src={imageURL}
          alt="preview"
          className="image-preview"
          style={{
            filter: `
            blur(${blur}px)
            brightness(${brightness}%)
            contrast(${contrast}%)
            grayscale(${grayscale}%)
            hue-rotate(${hueRotate}deg)
            invert(${invert}%)
            opacity(${opacity}%)
            saturate(${saturate}%)
            sepia(${sepia}%)
          `,
          }}
        />
      )}

      <div className="controls">
        <label>Blur</label>
        <input
          type="range"
          min="0"
          max="10"
          value={blur}
          onChange={(e) => setBlur(e.target.value)}
        />

        <label>Brightness</label>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
        />

        <label>Contrast</label>
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => setContrast(e.target.value)}
        />

        <label>Grayscale</label>
        <input
          type="range"
          min="0"
          max="100"
          value={grayscale}
          onChange={(e) => setGrayscale(e.target.value)}
        />

        <label>Hue Rotate</label>
        <input
          type="range"
          min="0"
          max="360"
          value={hueRotate}
          onChange={(e) => setHueRotate(e.target.value)}
        />

        <label>Invert</label>
        <input
          type="range"
          min="0"
          max="100"
          value={invert}
          onChange={(e) => setInvert(e.target.value)}
        />

        <label>Opacity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => setOpacity(e.target.value)}
        />

        <label>Saturate</label>
        <input
          type="range"
          min="0"
          max="200"
          value={saturate}
          onChange={(e) => setSaturate(e.target.value)}
        />

        <label>Sepia</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sepia}
          onChange={(e) => setSepia(e.target.value)}
        />
      </div>

      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
}
