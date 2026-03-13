import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_20.css";

export default function Assignment_20() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  //new
  const [userAnswers, setUserAnswers] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  const question = questions[currentQuestion];

  function handleAnswer(selectedIndex) {
    const correctIndex = question.correct;

    //new
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = selectedIndex;
      return updated;
    });

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

  //new
  if (finished) {
    const reviewQuestion = questions[reviewIndex];
    const userAnswer = userAnswers[reviewIndex];
    const correctAnswer = reviewQuestion.correct;

    return (
      <div className="assignment19-container">
        <h2>Quiz Finished</h2>
        <h3>
          Your Score: {score} out of {questions.length}
        </h3>
        <div className="assignment20-review-box">
          <h2 className="assignment20-review-question">
            {reviewQuestion.question}
          </h2>

          <div className="assignment20-review-answers">
            {reviewQuestion.answers.map((ans, index) => {
              let color = "black";

              if (index === correctAnswer) {
                color = "green";
              }

              if (index === userAnswer && userAnswer !== correctAnswer) {
                color = "red";
              }

              return (
                <div
                  key={index}
                  className="assignment20-answer"
                  style={{ color: color }}
                >
                  {ans}
                </div>
              );
            })}
          </div>

          <div className="assignment20-navigation">
            <button
              className="assignment20-nav-btn"
              onClick={() => setReviewIndex((prev) => Math.max(prev - 1, 0))}
            >
              Last
            </button>

            <button
              className="assignment20-nav-btn"
              onClick={() =>
                setReviewIndex((prev) =>
                  Math.min(prev + 1, questions.length - 1),
                )
              }
            >
              Next
            </button>
          </div>
        </div>
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
