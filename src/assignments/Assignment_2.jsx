import { useState } from "react";
import "./Assignment_2.css";

export default function Assignment_2() {

    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [operation, setOperation] = useState("addition");
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let res;

        if (operation === "addition") res = a + b;
        if (operation === "subtraction") res = a - b;
        if (operation === "multiplication") res = a * b;
        /*if (operation === "division") {
            if (b !== 0) {
                res = a / b;
            } else {
                res = "Cannot divide by zero";
            }
        }*/
        if (operation === "division") res = b !== 0 ? a / b : "Cannot divide by zero";

        setResult(res);
    };

    const showCalculate = num1 !== "" && num2 !== "";

    return (
        <div className="assignment2">
            <h2>Simple Calculator</h2>

            <input type="number" placeholder="Number 1" value={num1} onChange={e => setNum1(e.target.value)} />
            <input type="number" placeholder="Number 2" value={num2} onChange={e => setNum2(e.target.value)} />

            <select value={operation} onChange={e => setOperation(e.target.value)}>
                <option value="addition">Addition (+)</option>
                <option value="subtraction">Subtraction (-)</option>
                <option value="multiplication">Multiplication (×)</option>
                <option value="division">Division (÷)</option>
            </select>

            {showCalculate && (
                <>
                    <button onClick={handleCalculate}>Calculate</button>
                    {result !== null && <p>Result: {result}</p>}
                </>
            )}
        </div>
    );
}
