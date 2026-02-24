import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_9.css";

export default function Assignment_9() {
  const [colors, setColors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  function loadColors() {
    axios
      .get("https://apis.dnjs.lk/objects/colors.php", {
        params: {
          search,
          page,
          limit,
        },
      })

      .then((response) => {
        setColors(response.data.data);
        setTotal(response.data.total);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadColors();
  }, [page]);

  function searchColors() {
    setPage(1);
    loadColors();
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="assignment9-container">
      <h2>Color Search with Pagination</h2>

      <input
        type="text"
        className="assignment9-input"
        placeholder="Search color"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="assignment9-button" onClick={searchColors}>
        Search
      </button>

      <ul className="assignment9-list">
        {colors.map((item, index) => (
          <li key={index} className="assignment9-item">
            {item.name}
          </li>
        ))}
      </ul>

      <div className="assignment9-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className="assignment9-page-btn"
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
