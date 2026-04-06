import React, { useState } from "react";
import "./ThreeColorMixerApp.css";

const toRGB = (hex) => [
  parseInt(hex.substring(1, 3), 16),
  parseInt(hex.substring(3, 5), 16),
  parseInt(hex.substring(5, 7), 16),
];

const blendThreeChannels = (a, b, c, ratioA, ratioB, ratioC) => {
  return Math.round(a * ratioA + b * ratioB + c * ratioC);
};

export default function ThreeColorMixerApp() {
  const [colorA, setColorA] = useState("#EBD700");
  const [colorB, setColorB] = useState("#0FA9EB");
  const [colorC, setColorC] = useState("#FF4D6D");

  const [ratioA, setRatioA] = useState(0.33);
  const [ratioB, setRatioB] = useState(0.33);
  const [ratioC, setRatioC] = useState(0.34);

  const rgbA = toRGB(colorA);
  const rgbB = toRGB(colorB);
  const rgbC = toRGB(colorC);

  const outR = blendThreeChannels(
    rgbA[0],
    rgbB[0],
    rgbC[0],
    ratioA,
    ratioB,
    ratioC,
  );

  const outG = blendThreeChannels(
    rgbA[1],
    rgbB[1],
    rgbC[1],
    ratioA,
    ratioB,
    ratioC,
  );

  const outB = blendThreeChannels(
    rgbA[2],
    rgbB[2],
    rgbC[2],
    ratioA,
    ratioB,
    ratioC,
  );

  const mixedColor = `rgb(${outR}, ${outG}, ${outB})`;

  return (
    <div className="tcm-container">
      <h1 className="tcm-title">Three Color Mixer</h1>

      <div className="tcm-input-group">
        <input
          type="color"
          value={colorA}
          onChange={(e) => setColorA(e.target.value)}
        />

        <input
          type="color"
          value={colorB}
          onChange={(e) => setColorB(e.target.value)}
        />

        <input
          type="color"
          value={colorC}
          onChange={(e) => setColorC(e.target.value)}
        />
      </div>

      <div className="tcm-slider-group">
        <label>Color 1 Ratio: {ratioA}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={ratioA}
          onChange={(e) => setRatioA(parseFloat(e.target.value))}
        />

        <label>Color 2 Ratio: {ratioB}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={ratioB}
          onChange={(e) => setRatioB(parseFloat(e.target.value))}
        />

        <label>Color 3 Ratio: {ratioC}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={ratioC}
          onChange={(e) => setRatioC(parseFloat(e.target.value))}
        />
      </div>

      <div className="tcm-output-box" style={{ backgroundColor: mixedColor }}>
        {mixedColor}
      </div>
    </div>
  );
}
