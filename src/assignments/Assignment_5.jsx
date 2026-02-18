import { useState } from "react";
import "./Assignment_5.css";

export default function Assignment_5() {

    const [numbers, setNumbers] = useState([]);
    const [value, setValue] = useState("");

    function addNumber() {

        if (value === "") return;

        setNumbers([...numbers, Number(value)]);
        setValue("");

    }

    function deleteNumber(index) {

        const newArray = numbers.filter((_num, i) => i !== index);
        setNumbers(newArray);

    }

    function sortAscending() {

        const sorted = [...numbers].sort((a, b) => a - b);
        setNumbers(sorted);

    }

    function sortDescending() {

        const sorted = [...numbers].sort((a, b) => b - a);
        setNumbers(sorted);

    }

    function moveUp(index) {

        if (index === 0) return;

        const newArray = [...numbers];

        const temp = newArray[index];
        newArray[index] = newArray[index - 1];
        newArray[index - 1] = temp;

        setNumbers(newArray);

    }

    function moveDown(index) {

        if (index === numbers.length - 1) return;

        const newArray = [...numbers];

        const temp = newArray[index];
        newArray[index] = newArray[index + 1];
        newArray[index + 1] = temp;

        setNumbers(newArray);

    }

    const total = numbers.reduce((sum, num) => sum + num, 0);
    const average = numbers.length > 0 ? (total / numbers.length).toFixed(2) : 0;

    return (

        <div className="assignment5">

            <h2>Assignment 5</h2>

            <h3>Total: {total}</h3>

            <h3>Average: {average}</h3>


            <button onClick={sortAscending}>
                Sort Ascending
            </button>

            <button onClick={sortDescending}>
                Sort Descending
            </button>


            <ol>

                {numbers.map((num, index) => (

                    <li key={index}>

                        {num}

                        <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                        >
                            Move Up
                        </button>


                        <button
                            onClick={() => moveDown(index)}
                            disabled={index === numbers.length - 1}
                        >
                            Move Down
                        </button>


                        <button
                            onClick={() => deleteNumber(index)}
                        >
                            Delete
                        </button>

                    </li>

                ))}

            </ol>

            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button onClick={addNumber}>
                Add
            </button>

        </div>

    );

}
