import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_19.css";

export default function Assignment_19() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  function handleAnswer(selectedIndex) {
    const correctIndex = question.correct;

    if (selectedIndex === correctIndex) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
    }
  }

  useEffect(() => {
    axios.get("https://apis.dnjs.lk/objects/quiz.php").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  if (questions.length === 0) {
    return <h2>Loading Quiz...</h2>;
  }

  if (finished) {
    return (
      <div className="assignment19-container">
        <h2>Quiz Finished</h2>
        <h3>
          Your Score: {score} out of {questions.length}
        </h3>
      </div>
    );
  }

  return (
    <div className="assignment19-container">
      <h2 className="assignment19-question">{question.question}</h2>

      <div className="assignment19-options">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className="assignment19-btn"
            onClick={() => handleAnswer(index)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
