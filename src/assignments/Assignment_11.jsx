import { useState } from "react";
import axios from "axios";
import "./Assignment_10.css";
import "./Assignment_11.css";

export default function Assignment_11() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [accessToken, setAccessToken] = useState("");
  const [userDetails, setUserDetails] = useState(null);

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
        setAccessToken(response.data.access_token);
        getUserDetails(response.data.access_token);
        //console.log("success reponse:");
        //console.log(response);
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

  return (
    <div className="assignment10-container">
      <h2>Assignment 10 Login</h2>

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

      <button onClick={login} className="assignment10-button">
        Login
      </button>

      <p className="assignment11-token">Token: {accessToken}</p>
      {userDetails && (
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
