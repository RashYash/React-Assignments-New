import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_7.css";

export default function Assignment_7() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  return (
    <div className="assignment7-container">
      <h2 className="assignment7-title">Colors List</h2>
      <ul className="assignment7-list">
        {colors.map((color, index) => (
          <li key={index}>
            {color.name} - {color.code}
          </li>
        ))}
      </ul>
    </div>
  );
}
