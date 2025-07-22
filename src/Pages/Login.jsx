import React, { useState } from "react";

function YouTubeLogin() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState("");

  // Strong password: 8+ chars, at least 1 number and 1 special character
  const isStrongPassword = (pwd) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(pwd);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegistering && !name)) {
      return setError("Please fill in all required fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address.");
    }

    if (!isStrongPassword(password)) {
      return setError(
        "Password must be at least 8 characters, include a number and a special character."
      );
    }

    // Dummy login success
    setLoggedInUser({
      name: isRegistering ? name : email.split("@")[0],
      email,
    });
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setLoggedInUser(null);
  };

  return (
    <div style={styles.container}>
      {!loggedInUser ? (
        <form onSubmit={handleAuth} style={styles.form}>
          <h2 style={styles.logo}>YouTube</h2>
          <h3>{isRegistering ? "Register" : "Sign In"}</h3>

          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            {isRegistering ? "Register" : "Sign In"}
          </button>

          <p style={styles.info}>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              style={styles.link}
            >
              {isRegistering ? "Sign In" : "Register"}
            </span>
          </p>
        </form>
      ) : (
        <div style={styles.home}>
          <h2>Welcome, {loggedInUser.name}</h2>
          <p>You are now signed in!</p>
          <button onClick={handleLogout} style={styles.button}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9f9f9",
    fontFamily: "Roboto, sans-serif",
  },
  form: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    width: "320px",
    textAlign: "center",
  },
  logo: {
    color: "#ff0000",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#ff0000",
    color: "#fff",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  info: {
    fontSize: "13px",
    color: "#555",
    marginTop: "15px",
  },
  link: {
    color: "#1a73e8",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
  },
  home: {
    textAlign: "center",
  },
};

export default YouTubeLogin;
