import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_10.css";
import "./Assignment_11.css";
import "./Assignment_12.css";

export default function Assignment_12() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [accessToken, setAccessToken] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login() {
    //console.log("Login button clicked");
    setError("");

    axios
      .post(
        "https://auth.dnjs.lk/api/login",

        {
          email,
          password,
        },
      )

      .then(function (response) {
        const token = response.data.access_token;
        if (keepLoggedIn) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        setAccessToken(token);
        setIsLoggedIn(true);
        getUserDetails(token);
      })

      .catch(function (error) {
        console.log("error response:");
        console.log(error);

        setError(
          error.response?.data?.message || error.message || "Login Failed",
        );
      });
  }

  function getUserDetails(token) {
    if (!token) {
    token = localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    axios
      .get(
        "https://auth.dnjs.lk/api/user",

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )

      .then(function (response) {
        console.log(response);
        setUserDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const token =localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
      getUserDetails(token);
    }
  }, []);

  return (
    <div className="assignment10-container">
      {!isLoggedIn && (
        <>
          <h2>Assignment 12 Login</h2>

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="assignment10-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
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
        </>
      )}
      <p className="assignment11-token">Token: {accessToken}</p>
      {isLoggedIn && userDetails && (
        <div className="assignment11-user-container">
          <h3>You have logged!</h3>
          <p>Name: {userDetails.name}</p>
          <p>Bio: {userDetails.bio}</p>
          <img
            //src={userDetails.profile_pic}
            src={userDetails.avatar}
            className="assignment11-profile-pic"
          />
        </div>
      )}
      <p className="assignment10-error">{error}</p>
    </div>
  );
}

