import React, { useState, useRef, useEffect } from "react";
import "./CustomContextMenu.css";

const menuItems = [
  { name: "Red", code: "#550404" },
  { name: "Green", code: "#00b934" },
  { name: "Blue", code: "#4da6ff" },
];

export default function CustomContextMenu() {
  const containerRef = useRef(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState("#3c3c3c");

  const handleContextMenu = (event) => {
    event.preventDefault();

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    setMenuPosition({ x, y });
    setMenuVisible(true);
  };

  const handleItemClick = (colorCode) => {
    setBackgroundColor(colorCode);
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setMenuVisible(false);
    };

    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="ccm-page-wrapper">
      <div
        ref={containerRef}
        className="ccm-container"
        style={{ backgroundColor }}
        onContextMenu={handleContextMenu}
      >
        <div className="ccm-hint">
          Right Click and try the Custom Context Menu
        </div>

        {menuVisible && (
          <div
            className="ccm-menu"
            style={{
              left: `${menuPosition.x}px`,
              top: `${menuPosition.y}px`,
            }}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="ccm-menu-item"
                onClick={() => handleItemClick(item.code)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
