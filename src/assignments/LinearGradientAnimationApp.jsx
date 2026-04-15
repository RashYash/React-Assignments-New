import React, { useRef, useState } from "react";
import "./LinearGradientAnimationApp.css";

const easings = {
  easeInSine: (x) => 1 - Math.cos((x * Math.PI) / 2),
  easeInQuad: (x) => x * x,
  easeInQuint: (x) => x * x * x * x * x,
  easeOutCirc: (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
  easeOutQuint: (x) => 1 - Math.pow(1 - x, 5),
  easeOutBounce: (x) => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      x -= 1.5 / d1;
      return n1 * x * x + 0.75;
    } else if (x < 2.5 / d1) {
      x -= 2.25 / d1;
      return n1 * x * x + 0.9375;
    } else {
      x -= 2.625 / d1;
      return n1 * x * x + 0.984375;
    }
  },
};

const toRGB = (hex) => [
  parseInt(hex.substring(1, 3), 16),
  parseInt(hex.substring(3, 5), 16),
  parseInt(hex.substring(5, 7), 16),
];

const blendChannel = (a, b, ratio) => {
  return Math.round(a * (1 - ratio) + b * ratio);
};

const rgbToColor = (r, g, b) => {
  return `rgb(${r}, ${g}, ${b})`;
};

export default function LinearGradientAnimationApp() {
  const boxRef = useRef(null);

  const [selectedEase, setSelectedEase] = useState("easeInSine");

  const runAnimation = () => {
    const element = boxRef.current;
    if (!element) return;

    const startColor1 = "#ff0000";
    const startColor2 = "#0000ff";

    const endColor1 = "#00ff00";
    const endColor2 = "#ff00ff";

    const start1 = toRGB(startColor1);
    const start2 = toRGB(startColor2);

    const end1 = toRGB(endColor1);
    const end2 = toRGB(endColor2);

    const duration = 4000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const timeSpent = currentTime - startTime;

      const factor = Math.min(timeSpent / duration, 1);

      const easingFactor = easings[selectedEase](factor);

      const color1 = rgbToColor(
        blendChannel(start1[0], end1[0], easingFactor),
        blendChannel(start1[1], end1[1], easingFactor),
        blendChannel(start1[2], end1[2], easingFactor)
      );

      const color2 = rgbToColor(
        blendChannel(start2[0], end2[0], easingFactor),
        blendChannel(start2[1], end2[1], easingFactor),
        blendChannel(start2[2], end2[2], easingFactor)
      );

      element.style.backgroundImage = `linear-gradient(${color1}, ${color2})`;

      if (factor < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div className="lga-wrapper">
      <h1 className="lga-title">Gradient Animation App</h1>

      <select
        className="lga-dropdown"
        value={selectedEase}
        onChange={(e) => setSelectedEase(e.target.value)}
      >
        <option value="easeInSine">Ease In Sine</option>
        <option value="easeInQuad">Ease In Quad</option>
        <option value="easeInQuint">Ease In Quint</option>
        <option value="easeOutCirc">Ease Out Circ</option>
        <option value="easeOutQuint">Ease Out Quint</option>
        <option value="easeOutBounce">Ease Out Bounce</option>
      </select>

      <button className="lga-button" onClick={runAnimation}>
        Start Animation
      </button>

      <div ref={boxRef} className="lga-box"></div>
    </div>
  );
}