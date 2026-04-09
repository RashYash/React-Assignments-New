import React, { useRef, useState } from "react";
import "./EasingAnimationApp.css";

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

export default function EasingAnimationApp() {
  const boxRef = useRef(null);

  const [selectedEase, setSelectedEase] = useState("easeInSine");

  const runAnimation = () => {
    const element = boxRef.current;
    if (!element) return;

    let margin = 0;
    let previousTime = performance.now();

    const maxDistance = 400;

    const update = (time) => {
      const delta = time - previousTime;

      const factor = Math.min(margin / maxDistance, 1);

      const easingFactor = easings[selectedEase](factor);

      margin += delta * 0.2 * (1 - factor + 0.1);

      const value = easingFactor * margin;

      element.style.marginLeft = `${value}px`;

      console.log("one round", delta);

      previousTime = time;

      if (margin < maxDistance) {
        requestAnimationFrame(update);
      }
    };

    element.style.marginLeft = "0px";

    requestAnimationFrame(update);
  };

  return (
    <div className="ea-wrapper">
      <h1 className="ea-title">Easing Animation App</h1>

      <select
        className="ea-dropdown"
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

      <button className="ea-button" onClick={runAnimation}>
        Run Animation
      </button>

      <div className="ea-track">
        <div ref={boxRef} className="ea-box"></div>
      </div>
    </div>
  );
}
