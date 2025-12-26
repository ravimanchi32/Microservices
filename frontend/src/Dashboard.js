import { useEffect, useState } from "react";
import axios from "axios";
import "../src/styles/Dashboard.css";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location = "/";
      return;
    }

    axios
      .get("http://localhost:3002/welcome", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => (window.location = "/"), 1500);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {message && <h2>{message}</h2>}
        {error && <p className="error">{error}</p>}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
