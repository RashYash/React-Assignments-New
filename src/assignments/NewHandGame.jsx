import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import questions from "../data/questions.json";
import "./NewHandGame.css";

export default function NewHandGame() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [handLandmarker, setHandLandmarker] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const loadModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            import.meta.env.BASE_URL + "models/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      setHandLandmarker(landmarker);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const startCam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    startCam();
  }, []);

  const countFingers = (landmarks) => {
    let count = 0;

    const tips = [8, 12, 16, 20];
    const bases = [6, 10, 14, 18];

    for (let i = 0; i < 4; i++) {
      if (landmarks[tips[i]].y < landmarks[bases[i]].y) {
        count++;
      }
    }

    return count;
  };

  const detect = async () => {
    if (!handLandmarker || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (video.readyState < 2) {
      requestAnimationFrame(detect);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const results = handLandmarker.detectForVideo(video, performance.now());

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];

      landmarks.forEach((p) => {
        ctx.beginPath();

        ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);

        ctx.fillStyle = "red";
        ctx.fill();
      });

      const fingers = countFingers(landmarks);

      setCurrentAnswer(fingers);
    }

    requestAnimationFrame(detect);
  };

  useEffect(() => {
    if (handLandmarker && questionIndex < questions.length) {
      detect();
    }
  }, [handLandmarker, questionIndex]);

  useEffect(() => {
    if (questionIndex >= questions.length) return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, questionIndex]);

  const nextQuestion = () => {
    const correct = questions[questionIndex].correct;

    if (currentAnswer === correct) {
      setScore((prev) => prev + 1);
    }

    setQuestionIndex((prev) => prev + 1);
    setTimeLeft(5);
  };

  if (questionIndex >= questions.length) {
    return (
      <div className="hg1-gameover">
        <h1>Game Over</h1>

        <h2>
          Your Score: {score} / {questions.length}
        </h2>

        <button
          className="hg1-start-btn"
          onClick={() => {
            setQuestionIndex(0);
            setScore(0);
            setTimeLeft(5);
            setCurrentAnswer(0);

            setTimeout(() => {
              detect();
            }, 200);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="hg1-container">
        <div className="hg1-card">
          <h2 className="hg1-title">Hand Gesture Quiz Game</h2>

          <h3 className="hg1-info">Question {questionIndex + 1}</h3>

          <h1 className="hg1-question">{questions[questionIndex].q}</h1>

          <div className="hg1-options">
            {questions[questionIndex].options.map((opt, index) => (
              <div
                key={index}
                className={`hg1-option ${
                  currentAnswer === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}. {opt}
              </div>
            ))}
          </div>

          <h3 className="hg1-info">Show fingers (1–4) to select answer</h3>

          <div className="hg1-timer">Time Left: {timeLeft}s</div>

          <div className="hg1-score">Score: {score}</div>
        </div>
      </div>

      <div className="hg1-floating-video">
        <video ref={videoRef} className="hg1-video" />

        <canvas ref={canvasRef} className="hg1-canvas" />
      </div>
    </>
  );
}
