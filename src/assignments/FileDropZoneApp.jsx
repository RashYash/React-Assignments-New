import React, { useRef, useState, useEffect } from "react";
import "./FileDropZoneApp.css";

export default function FileDropZoneApp() {
  const dropZoneRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const processFiles = (files) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  const stopEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    stopEvent(event);
    const files = event.dataTransfer.files;
    processFiles(files);
  };

  const handleClickSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.multiple = true;
    input.click();

    input.addEventListener("input", () => {
      processFiles(input.files);
    });
  };

  useEffect(() => {
    const handlePaste = (event) => {
      const files = event.clipboardData.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="fdz-background">
      <div className="fdz-glass-wrapper">
        <div
          ref={dropZoneRef}
          className="fdz-drop-zone"
          onClick={handleClickSelect}
          onDrop={handleDrop}
          onDragEnter={stopEvent}
          onDragOver={stopEvent}
          onDragLeave={stopEvent}
        >
          <h1 className="fdz-title">Drop Zone</h1>

          <p className="fdz-subtitle">Drag & Click & Paste your files here</p>

          {selectedFiles.length > 0 && (
            <div className="fdz-file-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="fdz-file-item">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
