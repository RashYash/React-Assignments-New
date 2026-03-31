import React, { useState, useEffect } from "react";
import "./TextFileDownloader.css";

export default function TextFileDownloader() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    if (!title && !content) return;

    const textData = `Title: ${title}\n\n${content}`;
    const blob = new Blob([textData], { type: "text/plain" });

    const blobUrl = URL.createObjectURL(blob); 
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = `${title || "document"}.txt`;

    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl); 

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

  useEffect(() => {
    setIsDownloaded(false);
  }, [title, content]);

  return (
    <div className="tfd-app-container">
      <div className="tfd-box-container">
        <h2 className="tfd-title-text">Text File Downloader</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="tfd-input-field"
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="tfd-textarea-field"
        />

        <button onClick={handleDownload} className="tfd-download-button">
          Download as File
        </button>
      </div>
    </div>
  );
}
