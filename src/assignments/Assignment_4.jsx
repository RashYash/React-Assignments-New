import { useState } from "react";
import "./Assignment_4.css";

export default function Assignment_4() {

    const [numbers, setNumbers] = useState([]);
    const [value, setValue] = useState("");

    function addNumber() {

        if (value === "") return;

        setNumbers([...numbers, Number(value)]);
        setValue("");

    }
    function deleteNumber(index) {

        const newArray = numbers.filter((num, i) => i !== index);

        setNumbers(newArray);

    }

    return (

        <div className="assignment4">

            <ol>
                {numbers.map((num, index) => (

                    <li key={index}>
                        {num}

                        <button onClick={() => deleteNumber(index)}>
                            Delete
                        </button>

                    </li>

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
