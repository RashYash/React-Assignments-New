import { useState } from "react";
import "./Assignment_3.css";

export default function Assignment_3() {

  const [numbers, setNumbers] = useState([]);
  const [value, setValue] = useState("");

  function addNumber() {

    if (value === "") return;

    setNumbers([...numbers, Number(value)]);
    setValue("");

  }

  const total = numbers.reduce((sum, num) => sum + num, 0);

  const average =
    numbers.length > 0 ? (total / numbers.length).toFixed(2) : 0;

  return (

    <div className="assignment3">

      <h3>Total: {total}</h3>
      <h3>Average: {average}</h3>

      <ol>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ol>

      <input
        type="number"
        placeholder="Enter number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={addNumber}>Add</button>

    </div>

  );

}
