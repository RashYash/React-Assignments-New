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
    <div>
      <h2>Colors List</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            {color.name} - {color.code}
          </li>
        ))}
      </ul>
    </div>
  );
}
