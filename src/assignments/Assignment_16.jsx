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
      <h2 className="assignment13-title">Assignment Login</h2>

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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

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
      .catch((error) => {
        console.log(error.response);

        setMessage(
          error.response?.data?.message || error.message || "Upload Failed",
        );
      });
  }

  function handleFileChange(e) {
    setSelectedImage(e.target.files[0]);
  }

  function uploadAvatar() {
    if (!selectedImage) {
      setMessage("Select image first");
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
      .then(() => {
        setMessage("Avatar uploaded successfully");
        //window.location.reload();
      })
      .catch(() => setMessage("Upload Failed"));
  }

  function validatePassword() {
    if (!currentPassword || !newPassword || !rePassword)
      return "All fields are required";

    if (newPassword !== rePassword) return "Passwords do not match";

    if (newPassword.length < 8 || newPassword.length > 40)
      return "Password must be 8-40 characters";

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*/\-@#$]).+$/;

    if (!regex.test(newPassword))
      return "Must contain uppercase, lowercase, number & special character";

    return "";
  }

  function changePassword() {
    setPasswordError("");
    setPasswordSuccess("");

    const error = validatePassword();

    if (error) {
      setPasswordError(error);
      return;
    }

    api
      .put(
        "/password",
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      )
      .then(() => {
        setPasswordSuccess("Password Changed Successfully");

        setCurrentPassword("");
        setNewPassword("");
        setRePassword("");
      })
      .catch((error) => {
        console.log(error.response);
        setPasswordError(
          error.response?.data?.message || "Password Change Failed",
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
        <h3>Profile Screen</h3>

        <img
          src={userDetails.avatar}
          className="assignment13-avatar"
          alt="profile"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="assignment10-input"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

        <hr />

        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="assignment10-input"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="assignment10-input"
        />

        <input
          type="password"
          placeholder="Re-Enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="assignment10-input"
        />

        <button onClick={changePassword} className="assignment10-button">
          Change Password
        </button>

        <p className="assignment10-error">{passwordError}</p>
        <p style={{ color: "green" }}>{passwordSuccess}</p>

        <br />

        <button onClick={logout} className="assignment13-logout-button">
          Logout
        </button>
      </div>
    )
  );
}
