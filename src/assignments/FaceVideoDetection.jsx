import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./FaceVideoDetection.css";

export default function FaceVideoDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const latestDetections = useRef([]);

  const [video, setVideo] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        import.meta.env.BASE_URL + "models",
      );
      setModelsLoaded(true);
      console.log("Models Loaded");
    };

    loadModels();
  }, []);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const drawFrame = () => {
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;

    if (!videoEl || videoEl.readyState !== 4) {
      requestAnimationFrame(drawFrame);
      return;
    }

    const ctx = canvas.getContext("2d");

    const width = videoEl.clientWidth;
    const height = videoEl.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(videoEl, 0, 0, width, height);

    const scaleX = width / videoEl.videoWidth;
    const scaleY = height / videoEl.videoHeight;

    latestDetections.current.forEach((det) => {
      const box = det.box;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;

      ctx.strokeRect(
        box.x * scaleX,
        box.y * scaleY,
        box.width * scaleX,
        box.height * scaleY,
      );
    });

    requestAnimationFrame(drawFrame);
  };

  const runDetection = async () => {
    const videoEl = videoRef.current;

    if (!videoEl || !modelsLoaded) return;

    const detections = await faceapi.detectAllFaces(
      videoEl,
      new faceapi.TinyFaceDetectorOptions(),
    );

    console.log("detections:", detections);

    latestDetections.current = detections;

    setTimeout(runDetection, 100);
  };

  const handlePlay = () => {
    if (!modelsLoaded) {
      alert("Model still loading...");
      return;
    }

    drawFrame();
    runDetection();
  };

  return (
    <div className="fdv-container">
      <h1 className="fdv-title">Face Video Detection</h1>

      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="fdv-input"
      />

      <div className="fdv-video-box">
        {video && (
          <>
            <video
              ref={videoRef}
              src={video}
              autoPlay
              muted
              onPlay={handlePlay}
              className="fdv-video"
            />

            <canvas ref={canvasRef} className="fdv-canvas" />
          </>
        )}
      </div>
    </div>
  );
}
