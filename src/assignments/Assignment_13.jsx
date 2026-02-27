import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_10.css";
import "./Assignment_11.css";
import "./Assignment_12.css";
import "./Assignment_13.css";

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export default function Assignment_13() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken() !== null) {
      setIsLoggedIn(true);
    }
  }, []);

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

    axios
      .post("https://auth.dnjs.lk/api/login", {
        email,
        password,
      })
      .then(function (response) {
        const token = response.data.access_token;

        if (keepLoggedIn) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        setIsLoggedIn(true);
      })
      .catch(function (error) {
        setError(
          error.response?.data?.message || error.message || "Login Failed",
        );
      });
  }

  return (
    <div className="assignment13-login-box">
      <h2 className="assignment13-title">Assignment 13 Login</h2>

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

  useEffect(() => {
    axios
      .get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then(function (response) {
        setUserDetails(response.data);
      });
  }, []);

  function logout() {
    axios
      .post(
        "https://auth.dnjs.lk/api/logout",
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
        <h3 className="assignment13-title">You have logged!</h3>

        <p className="assignment13-profile-text">Name: {userDetails.name}</p>

        <p className="assignment13-profile-text">Bio: {userDetails.bio}</p>

        <img
          src={userDetails.avatar}
          className="assignment13-avatar"
          alt="profile"
        />

        <button onClick={logout} className="assignment13-logout-button">
          Logout
        </button>
      </div>
    )
  );
}
