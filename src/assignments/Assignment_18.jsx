import { useState, useEffect } from "react";
import "./Assignment_18.css";

export default function Assignment_18() {
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => {
        if (gameOver) return prevColors;

        const random = Math.random();
        const newColor = random < 0.5 ? "blue" : "red";

        const newColors = [...prevColors];
        newColors.unshift(newColor);

        if (newColors.length > 6) {
          setGameOver(true);
        }

        return newColors;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  function handleColorClick(clickedColor) {
    if (gameOver) return;

    const lastColor = colors[colors.length - 1];

    if (lastColor === clickedColor) {
      setColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.pop();
        return newColors;
      });

      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  }

  return (
    <div className="assignment18-container">
      <h1 className="assignment18-title">Color Catch Puzzle</h1>
      <h3 className="assignment18-score">Score: {score}</h3>

      {gameOver && <h1 className="assignment18-gameover">GAME OVER</h1>}

      <div className="assignment18-color-row">
        {colors.map((color, index) => (
          <div
            key={index}
            className="assignment18-color-box"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>

      <div className="assignment18-button-row">
        <button
          className="assignment18-button assignment18-blue-btn"
          onClick={() => handleColorClick("blue")}
        >
          BLUE
        </button>

        <button
          className="assignment18-button assignment18-red-btn"
          onClick={() => handleColorClick("red")}
        >
          RED
        </button>
      </div>
    </div>
  );
}
