import { useState } from "react";
import axios from "axios";
import "./Assignment_10.css";

export default function Assignment_10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        console.log("success reponse:");
        console.log(response);
      })

      .catch(function (error) {
        console.log("error response:");
        console.log(error);

        setError("Login Failed. Check email or password");
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

      <p className="assignment10-error">{error}</p>
    </div>
  );
}
