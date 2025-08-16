import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../utils/userSlice";
import toast from "react-hot-toast";

function YouTubeLogin() {
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser = useSelector((store) => store.user.currentUser);
  const [error, setError] = useState("");

  async function handlelogin() {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const fulldata = await res.json();
      if (!res.ok) {
        toast.error(fulldata.message || "Something went wrong");
      }
      console.log(fulldata);

      if (fulldata.data) {
        dispatch(loginSuccess(fulldata));
        toast.success("LoggedIn successfully");
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
    if (isRegistering) {
      if (!isStrongPassword(password)) {
        return setError(
          "Password must be at least 8 characters, include a number and a special character."
        );
      }
    }

    if (isRegistering) {
      try {
        const res = await fetch("http://localhost:5000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        });
        const fulldata = await res.json();
        if (!res.ok) {
          toast.error(fulldata.message || "something went wrong");
          return;
        }
        console.log(fulldata);
        toast.success(fulldata.message);
        setName("");
        setEmail("");
        setPassword("");
        setIsRegistering(false);
      } catch (err) {
        toast.error(err.message);
        console.log("Error", err.message);
      }
    } else {
      await handlelogin();
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
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
            <Link to="/login">LogOut</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default YouTubeLogin;
