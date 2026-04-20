import React, { useState } from "react";
import Tesseract from "tesseract.js";
import answers from "../data/answers.json";
import students from "../data/students.json";
import "./OMRApp.css";

export default function OMRApp() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const processOMR = async () => {
    if (!image) return;

    setLoading(true);

    const res = await Tesseract.recognize(image, "eng", {
      logger: (info) => console.log(info),
    });

    const text = res.data.text;
    console.log("OCR text:", text);

    const idMatch = text.match(/ST-\d{3}/);
    const studentId = idMatch ? idMatch[0] : "Not Found";

    const student = students.find((s) => s.id === studentId);

    const extractedAnswers = text.match(/[A-D]/g) || [];

    let score = 0;

    answers.forEach((q, index) => {
      if (extractedAnswers[index] === q.correctAnswer) {
        score++;
      }
    });

    setResult({
      id: studentId,
      name: student ? student.name : "Unknown",
      score,
    });

    setLoading(false);
  };

  return (
    <div className="omr-container">
      <div className="omr-card">
        <h1 className="omr-title">OMR Answer Checker</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="omr-input"
        />

        <button onClick={processOMR} className="omr-button">
          Check Answers
        </button>

        {loading && <p className="omr-loading">Procesing...Please wait</p>}

        {result && (
          <div className="omr-result">
            <p>
              <strong>ID:</strong> {result.id}
            </p>
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Marks:</strong> {result.score} / 6
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
