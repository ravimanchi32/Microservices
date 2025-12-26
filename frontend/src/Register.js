import { useState } from "react";
import axios from "axios";
import "../src/styles/Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_AUTH_BASE_URL}/auth/register`, {
        email,
        password
      });
      setMsg("Registration successful. Please login.");
      setTimeout(() => (window.location = "/"), 1500);
    } catch {
      setMsg("User already exists");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={register}>
          Register
        </button>

        {msg && <p style={{ textAlign: "center" }}>{msg}</p>}

        <div className="auth-footer">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}
