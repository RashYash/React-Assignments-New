import React, { useState } from "react";
import "./NotificationApp.css";

const createNotification = (title, description, imageUrl) => {
  const notification = new Notification(title || "New Notification", {
    body: description || "This is the notification description",
    icon:
      imageUrl || "https://cdn-icons-png.flaticon.com/512/12891/12891962.png",
  });

  notification.onclick = () => {
    alert("Notification clicked!");
  };

  notification.onshow = () => {
    console.log("Notification displayed");
  };

  notification.onerror = (error) => {
    console.log("Notification failed:", error);
  };

  notification.onclose = () => {
    console.log("Notification closed");
  };
};

const notifyUser = (title, description, imageUrl) => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications");
    return;
  }

  if (Notification.permission === "granted") {
    createNotification(title, description, imageUrl);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        createNotification(title, description, imageUrl);
      }
    });
  } else {
    alert("Notification permission was denied");
  }
};

export default function NotificationApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="na-card">
      <h1 className="na-title">Desktop Notification App</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="na-input"
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="na-textarea"
      />

      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="na-input"
      />

      <button
        onClick={() => notifyUser(title, description, imageUrl)}
        className="na-button"
      >
        Notify Me
      </button>
    </div>
  );
}
