import React, { useEffect, useRef } from "react";
import "./cursorSimple.css";

export default function CursorSimple() {
  const dotRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = x + "px";
        dotRef.current.style.top = y + "px";
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="cs-container">
      <h1 className="cs-title">move your cursor and try cursor effect</h1>

      <div className="cs-dot" ref={dotRef}></div>
    </div>
  );
}
