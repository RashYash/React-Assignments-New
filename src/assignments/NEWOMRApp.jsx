import React, { useState } from "react";
import Tesseract from "tesseract.js";
import answers from "../data/answers.json";
import students from "../data/students.json";
import "./NEWOMRApp.css";

export default function NEWOMRApp() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const getDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  const findClosestStudent = (ocrId) => {
    if (!ocrId) return null;

    let bestMatch = null;
    let lowestDistance = Infinity;

    students.forEach((student) => {
      const distance = getDistance(ocrId, student.id);

      if (distance < lowestDistance) {
        lowestDistance = distance;
        bestMatch = student;
      }
    });

    return bestMatch;
  };

  const processOMR = async () => {
    if (!image) return;

    setLoading(true);

    const res = await Tesseract.recognize(image, "eng", {
      logger: (info) => console.log(info),
    });

    const text = res.data.text;
    console.log("OCR text:", text);

    // const idMatch = text.match(/ST-\d{3}/);
    // const studentId = idMatch ? idMatch[0] : "Not Found";
    // const student = students.find((s) => s.id === studentId);

    const rawIdMatch = text.match(/ST-[A-Z0-9]{3}/);
    const rawId = rawIdMatch ? rawIdMatch[0] : null;

    const student = findClosestStudent(rawId);
    const studentId = student ? student.id : "Not Found";

    // const extractedAnswers = text.match(/[A-D]/g) || [];

    const cleanedText = text
      .toUpperCase()
      .replace(/8/g, "B")
      .replace(/0/g, "D");

    const extractedAnswers = cleanedText.match(/[A-D]/g) || [];

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
