import { useState } from "react";
import axios from "axios";
import "../src/styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_AUTH_BASE_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
      setMsg("Invalid email or password");
    }
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

        {msg && <p style={{ textAlign: "center", color: "red" }}>{msg}</p>}

        <div className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

