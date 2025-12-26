import { useState } from "react";
import axios from "axios";
import "../src/styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:3001/auth/login", {
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>

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

        <button className="auth-btn" onClick={login}>
          Login
        </button>

        <div className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
