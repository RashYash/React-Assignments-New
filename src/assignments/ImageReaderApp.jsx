import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./ImageReaderApp.css";

export default function ImageReaderApp() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const readTextFromImage = async () => {
    if (!image) return;

    setLoading(true);
    setExtractedText("");

    const result = await Tesseract.recognize(image, "eng", {
      logger: (info) => console.log(info),
    });

    setExtractedText(result.data.text);
    setLoading(false);
  };

  return (
    <div className="ocr-wrapper">
      <h1 className="ocr-title">Image To Text Reader App</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="ocr-input"
      />

      {preview && <img src={preview} alt="Preview" className="ocr-preview" />}

      <button onClick={readTextFromImage} className="ocr-button">
        Read Text
      </button>

      {loading && <p>Reading text from image...</p>}

      <textarea
        value={extractedText}
        readOnly
        className="ocr-output"
        placeholder="Extracted text will appear here"
      />
    </div>
  );
}
