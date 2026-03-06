import { useState, useEffect } from "react";
import api from "../api/api";
import "./Assignment_10.css";
import "./Assignment_11.css";
import "./Assignment_12.css";
import "./Assignment_13.css";

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export default function Assignment_15() {
  const [isLoggedIn, setIsLoggedIn] = useState(getToken() !== null);

  return (
    <div className="assignment10-container">
      {!isLoggedIn && <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <ProfileScreen setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

//login
function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  function login() {
    setError("");

    api
      .post("/login", { email, password })
      .then((response) => {
        const token = response.data.access_token;

        if (keepLoggedIn) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        setIsLoggedIn(true);
      })

      .catch((error) => {
        setError(
          error.response?.data?.message || error.message || "Login Failed",
        );
      });
  }

  return (
    <div className="assignment13-login-box">
      <h2 className="assignment13-title">Assignment 15 Login</h2>

      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="assignment10-input"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="assignment10-input"
      />

      <label className="assignment12-keep-logged">
        <input
          type="checkbox"
          checked={keepLoggedIn}
          onChange={(e) => setKeepLoggedIn(e.target.checked)}
        />
        Keep me logged in
      </label>

      <button onClick={login} className="assignment10-button">
        Login
      </button>

      <p className="assignment10-error">{error}</p>
    </div>
  );
}

//profile
function ProfileScreen({ setIsLoggedIn }) {
  const [userDetails, setUserDetails] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/user", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        setUserDetails(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
      });
  }, []);

  function updateProfile() {
    api
      .put(
        "/user",
        {
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      )
      .then(function () {
        alert("Profile Updated Successfully.");
      })
      .catch(function () {
        alert("Update Failed.");
      });
  }

  function handleFileChange(e) {
    setSelectedImage(e.target.files[0]);
  }

  function uploadAvatar() {
    if (!selectedImage) {
      setMessage("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedImage);

    api
      .post("/avatar", formData, {
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage("Avatar uploaded successfully");

        setUserDetails({
          ...userDetails,
          avatar: response.data.avatar,
        });
      })
      .catch((error) => {
        console.log(error.response);

        setMessage(
          error.response?.data?.message || error.message || "Upload Failed",
        );
      });
  }

  function logout() {
    api
      .post(
        "/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      )
      .then(function () {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
      });
  }

  return (
    userDetails && (
      <div className="assignment13-profile-box">
        <h3 className="assignment13-title">Profile Screen</h3>

        <p className="assignment13-profile-text">Name: {userDetails.name}</p>
        <p className="assignment13-profile-text">
          Description: {userDetails.description}
        </p>

        <img
          src={userDetails.avatar}
          className="assignment13-avatar"
          alt="profile"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="assignment10-input"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="assignment10-input"
        />

        <button onClick={updateProfile} className="assignment10-button">
          Save Profile
        </button>

        <br />
        <br />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={uploadAvatar} className="assignment10-button">
          Upload Avatar
        </button>
        <p>{message}</p>

        <br />

        <button onClick={logout} className="assignment13-logout-button">
          Logout
        </button>
      </div>
    )
  );
}
