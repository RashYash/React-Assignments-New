import React, { useState, useEffect } from "react";
import "./TextFileDownloader.css";

export default function TextFileDownloader() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsDownloaded(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsDownloaded(false);
  };

  const handleDownload = () => {
    if (!title && !content) return;

    const textData = `Title: ${title}\n\n${content}`;
    const blob = new Blob([textData], { type: "text/plain" });
    const link = document.createElement("a");

    link.download = `${title || "document"}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setIsDownloaded(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const hasData = title !== "" || content !== "";

      if (hasData && !isDownloaded) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [title, content, isDownloaded]);

  return (
    <div className="tfd-app-container">
      <div className="tfd-box-container">
        <h2 className="tfd-title-text">Text File Downloader</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
          className="tfd-input-field"
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={handleContentChange}
          className="tfd-textarea-field"
        />

        <button onClick={handleDownload} className="tfd-download-button">
          Download as File
        </button>
      </div>
    </div>
  );
}
