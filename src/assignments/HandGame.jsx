import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "./HandGame.css";

export default function HandGame() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [handLandmarker, setHandLandmarker] = useState(null);
  //const [running, setRunning] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  const questions = [
    { q: "2 + 2", a: 4 },
    { q: "1 + 1", a: 2 },
    { q: "3 + 1", a: 4 },
    { q: "5 - 2", a: 3 },
    { q: "0 + 3", a: 5 },
    { q: "6 - 3", a: 3 },
    { q: "1 + 3", a: 4 },
    { q: "5 - 1", a: 4 },
    { q: "2 + 1", a: 3 },
    { q: "4 - 2", a: 2 },
  ];

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
      videoRef.current.srcObject = stream;
      videoRef.current.play();
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

    console.log("Running detection...");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0);

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
    if (handLandmarker) {
      detect();
    }
  }, [handLandmarker]);

  useEffect(() => {
    if (questionIndex >= questions.length) return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, questionIndex]);

  const nextQuestion = () => {
    const correct = questions[questionIndex].a;

    if (currentAnswer === correct) {
      setScore((prev) => prev + 1);
    }

    setQuestionIndex((prev) => prev + 1);
    setTimeLeft(5);
  };

  if (questionIndex >= questions.length) {
    return (
      <div className="hg-gameover">
        <h1>Game Over</h1>
        <h2>Your Score: {score} / 10</h2>
      </div>
    );
  }
  return (
    <div className="hg-container">
      <div className="hg-card">
        <h2 className="hg-title">Hand Gesture Quiz Game</h2>

        <h3 className="hg-info">Question {questionIndex + 1}</h3>
        <h1 className="hg-question">{questions[questionIndex].q}</h1>

        <h3 className="hg-info">Show fingers (No thumb)</h3>
        <h2 className="hg-info">Your Answer: {currentAnswer}</h2>

        <div className="hg-timer">Time Left: {timeLeft}s</div>

        <div className="hg-video-box">
          <video ref={videoRef} className="hg-video" width="400" height="300" />
          <canvas ref={canvasRef} className="hg-canvas" />
        </div>

        <div className="hg-score">Score: {score}</div>
      </div>
    </div>
  );
}
