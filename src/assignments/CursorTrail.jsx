import React, { useEffect, useRef } from "react";
import "./cursorTrail.css";

export default function CursorTrail() {
  const trailDotsRef = useRef([]);

  useEffect(() => {
    const dots = trailDotsRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let positions = Array.from({ length: 20 }, () => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animateTrail = () => {
      let x = mouseX;
      let y = mouseY;

      dots.forEach((dot, index) => {
        const next = positions[index + 1] || positions[index];

        positions[index] = { x, y };

        if (dot) {
          dot.style.left = x + "px";
          dot.style.top = y + "px";
        }

        x += (next.x - x) * 0.3;
        y += (next.y - y) * 0.3;
      });

      requestAnimationFrame(animateTrail);
    };

    animateTrail();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="ct-container">
      <h1 className="ct-title">move your cursor and try cursor effect</h1>

      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="ct-dot"
          ref={(el) => (trailDotsRef.current[i] = el)}
        ></div>
      ))}
    </div>
  );
}
