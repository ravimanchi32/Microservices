import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

export default function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    axios
      .get(`${AUTH_BASE_URL}/auth/verify?token=${token}`)
      .then(() => {
        alert("Email verified. You can login now");
        navigate("/"); // Redirect to login page
      })
      .catch(() => {
        alert("Verification failed");
        navigate("/"); // Optional
      });
  }, [navigate]);

  return <h2>Verifying your email...</h2>;
}

