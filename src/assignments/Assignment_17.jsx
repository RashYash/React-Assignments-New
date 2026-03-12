import { useState } from "react";
import "./Assignment_17.css";

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

function mixColors(c1, c2) {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);

  let r = Math.min(rgb1[0] + rgb2[0], 255);
  let g = Math.min(rgb1[1] + rgb2[1], 255);
  let b = Math.min(rgb1[2] + rgb2[2], 255);

  return rgbToHex(r, g, b);
}

export default function Assignment_17() {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");

  const mixedColor = mixColors(color1, color2);

  return (
    <div className="assignment17-container">
      <h2>Assignment 17 - Color Mixer</h2>

      <div className="color-inputs">
        <div>
          <label>Color 1</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
          />
        </div>

        <div>
          <label>Color 2</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
        </div>
      </div>

      <div className="output-section">
        <h3>Mixed Color</h3>

        <div
          className="mixed-box"
          style={{ backgroundColor: mixedColor }}
        ></div>

        <p>{mixedColor}</p>
      </div>

      <div className="gradient-section">
        <h3>Gradient</h3>

        <div
          className="gradient-box"
          style={{
            background: `linear-gradient(to right, ${color1}, ${mixedColor}, ${color2})`,
          }}
        ></div>
      </div>
    </div>
  );
}
