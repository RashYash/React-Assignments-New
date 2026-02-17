import { useState } from "react";
import "./Assignment_1.css";

export default function Assignment_1() {

    const [section, setSection] = useState(1);

    /*function changeToOne() {
        setSection(1);
    }

    function changeToTwo() {
        setSection(2);
    }

    function changeToThree() {
        setSection(3);
    }*/
    return (
        <div className="assignment1-container">

            <div className="assignment1-buttons">
                {/*<button onClick={changeToOne}>Section #1</button>
                <button onClick={changeToTwo}>Section #2</button>
                <button onClick={changeToThree}>Section #3</button>*/}

                <button onClick={() => setSection(1)}>Section #1</button>
                <button onClick={() => setSection(2)}>Section #2</button>
                <button onClick={() => setSection(3)}>Section #3</button>
            </div>

            <div className="assignment1-content">
                {section === 1 && <p>This is paragraph 1.</p>}
                {section === 2 && <p>This is paragraph 2.</p>}
                {section === 3 && <p>This is paragraph 3.</p>}
            </div>

        </div>
    );

}
