import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../utils/userSlice";

function YouTubeLogin() {
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser = useSelector((store) => store.user.currentUser);
  const [error, setError] = useState("");
  // const [token, setToken] = useState("");

  async function getusers() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fulldata = await data.json();

      console.log(fulldata);
      localStorage.setItem("token", fulldata.token);
    } catch (err) {
      console.log("Error", err.message);
    }
  }
  async function handlelogin() {
    try {
      const data = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const fulldata = await data.json();

      console.log(fulldata);

      if (fulldata.data) {
        dispatch(loginSuccess(fulldata));
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  // Strong password: 8+ chars, at least 1 number and 1 special character
  const isStrongPassword = (pwd) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(pwd);
  };

  async function handleAuth(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegistering && !name)) {
      return setError("Please fill in all required fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address.");
    }

    // if (!isStrongPassword(password)) {
    //   return setError(
    //     "Password must be at least 8 characters, include a number and a special character."
    //   );
    // }

    if (isRegistering) {
      try {
        const data = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        const fulldata = await data.json();
        console.log(fulldata);
      } catch (err) {
        console.log("Error", err.message);
      }
    } else {
      await handlelogin();
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  return (
    <div className="login-container">
      {!loggedInUser ? (
        <form onSubmit={handleAuth} className="login-form">
          <h2 className="youtube-logo">YouTube</h2>
          <h3>{isRegistering ? "Register" : "Sign In"}</h3>

          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-button">
            {isRegistering ? "Register" : "Sign In"}
          </button>

          <p className="form-info">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="form-link"
            >
              {isRegistering ? "Sign In" : "Register"}
            </span>
          </p>
        </form>
      ) : (
        <div className="login-home">
          <h2>Welcome, {loggedInUser}</h2>
          <p>You are now signed in!</p>
          <button className="form-button">
            <Link to="/">Go to HOME</Link>
          </button>
          <button onClick={handleLogout} className="form-button">
            <Link to="/">LogOut</Link>
          </button>
        </div>
      )}
      <button onClick={getusers}>fetch users</button>
    </div>
  );
}

export default YouTubeLogin;
