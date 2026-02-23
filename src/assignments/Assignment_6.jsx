import { useState } from "react";
import "./Assignment_6.css";

export default function Assignment_6() {
  const [style, setStyle] = useState([]);

  const [name, setName] = useState("");

  const [value, setValue] = useState("");

  function addRule() {
    if (name === "" || value === "") return;

    const newRule = {
      name: name,
      value: value,
    };

    setStyle([...style, newRule]);

    setName("");
    setValue("");
  }

  function deleteRule(index) {
    const newList = style.filter((item, i) => i !== index);

    setStyle(newList);
  }

  const cssObject = style.reduce(
    (obj, item) => ({
      ...obj,
      [item.name]: item.value,
    }),
    {},
  );

  return (
    <div className="assignment6-container">
      <h2 className="assignment6-title">CSS Style Editor</h2>
      <div className="assignment6-input-row">
        <input
          className="assignment6-input"
          type="text"
          placeholder="CSS Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="assignment6-input"
          type="text"
          placeholder="CSS Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button className="assignment6-add-btn" onClick={addRule}>
          Add
        </button>
      </div>

      <ul className="assignment6-list">
        {style.map((item, index) => (
          <li className="assignment6-list-item" key={index}>
            <button
              className="assignment6-delete-btn"
              onClick={() => deleteRule(index)}
            >
              Delete
            </button>
            {item.name} : {item.value}
          </li>
        ))}
      </ul>

      <div className="assignment6-sample" style={cssObject}>
        Sample Text
      </div>
    </div>
  );
}
