import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
//import "./FaceImageGlasses.css";

export default function FaceImageGlasses() {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = import.meta.env.BASE_URL + "models";

        console.log("Loading models from:", MODEL_URL);

        await faceapi.nets.mtcnn.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

        setModelsLoaded(true);

        console.log("Models Loaded (MTCNN)");
      } catch (error) {
        console.error("Model loading error:", error);
      }
    };

    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);

      console.log("Image uploaded");
    }
  };

  const detectFace = async () => {
    try {
      if (!modelsLoaded) {
        alert("Models not loaded yet");
        return;
      }

      const img = imageRef.current;
      const canvas = canvasRef.current;

      if (!img) {
        alert("Image not ready");
        return;
      }

      if (!canvas) {
        alert("Canvas not ready");
        return;
      }

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      const result = await faceapi
        .detectSingleFace(
          img,
          new faceapi.MtcnnOptions({
            minFaceSize: 50,
            scaleFactor: 0.8,
          }),
        )
        .withFaceLandmarks();

      if (!result) {
        alert("No face detected");
        return;
      }

      console.log("Face detected");

      const displaySize = {
        width: img.width,
        height: img.height,
      };

      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);

      const landmarks = result.landmarks;

      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();

      const getCenter = (points) => {
        const x = points.reduce((sum, p) => sum + p.x, 0) / points.length;

        const y = points.reduce((sum, p) => sum + p.y, 0) / points.length;

        return { x, y };
      };

      const leftCenter = getCenter(leftEye);
      const rightCenter = getCenter(rightEye);

      console.log("Left Eye:", leftCenter);
      console.log("Right Eye:", rightCenter);

      const eyeDistance = Math.hypot(
        rightCenter.x - leftCenter.x,
        rightCenter.y - leftCenter.y,
      );

      console.log("Eye distance:", eyeDistance);

      const angle = Math.atan2(
        rightCenter.y - leftCenter.y,
        rightCenter.x - leftCenter.x,
      );

      console.log("Face angle:", angle);

      const glasses = new Image();

      glasses.src = import.meta.env.BASE_URL + "glasses.png";

      glasses.onload = () => {
        ctx.save();

        const midX = (leftCenter.x + rightCenter.x) / 2;
        const midY = (leftCenter.y + rightCenter.y) / 2;

        ctx.translate(midX, midY);

        ctx.rotate(angle);

        const glassesWidth = eyeDistance * 2.2;
        const glassesHeight = eyeDistance * 1.2;

        ctx.drawImage(
          glasses,
          -glassesWidth / 2,
          -glassesHeight / 2,
          glassesWidth,
          glassesHeight,
        );

        ctx.restore();
      };
    } catch (error) {
      console.error("Detection error:", error);
    }
  };

  return (
    <div className="fig-container">
      <h2 className="fig-title">Face Image Glasses</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="fig-input"
      />

      <button
        onClick={detectFace}
        disabled={!modelsLoaded}
        className="fig-button"
      >
        Detect & Add Glasses
      </button>

      <div className="fig-image-box">
        {image && (
          <>
            <img
              ref={imageRef}
              src={image}
              alt="uploaded"
              className="fig-image"
            />

            <canvas ref={canvasRef} className="fig-canvas" />
          </>
        )}
      </div>
    </div>
  );
}
