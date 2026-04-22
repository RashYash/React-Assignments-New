import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./FaceDetectionApp.css";

export default function FaceDetectionApp() {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const detectFace = async () => {
    if (!modelsLoaded) {
      alert("Model still loading...");
      return;
    }

    const img = imageRef.current;

    const detections = await faceapi.detectAllFaces(
      img,
      new faceapi.TinyFaceDetectorOptions(),
    );

    const canvas = canvasRef.current;
    const displaySize = {
      width: img.width,
      height: img.height,
    };

    faceapi.matchDimensions(canvas, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
  };

  return (
    <div className="fd-container">
      <h1 className="fd-title">Face Detection App</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="fd-input"
      />

      <button
        onClick={detectFace}
        disabled={!modelsLoaded}
        className="fd-button"
      >
        Detect Face
      </button>

      <div className="fd-image-box">
        {image && (
          <>
            <img
              ref={imageRef}
              src={image}
              alt="uploaded"
              className="fd-image"
            />
            <canvas ref={canvasRef} className="fd-canvas" />
          </>
        )}
      </div>
    </div>
  );
}
