import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_8.css";

export default function Assignment_8() {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function searchColors() {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php?search=" + search)
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="assignment8-container">
      <h2 className="assignment8-title">Colors List</h2>

      <div className="assignment8-search">
        <input
          type="text"
          placeholder="Search color"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="assignment8-input"
        />
        <button onClick={searchColors} className="assignment8-button">
          Search
        </button>
      </div>

      <ul className="assignment8-list">
        {colors.map((color, index) => (
          <li key={index} className="assignment8-item">
            {color.name} - {color.code}
          </li>
        ))}
      </ul>
    </div>
  );
}
