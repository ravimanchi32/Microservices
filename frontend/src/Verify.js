import { useEffect } from "react";
import axios from "axios";

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

export default function Verify() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    axios
      .get(`${AUTH_BASE_URL}/auth/verify?token=${token}`)
      .then(() => alert("Email verified. You can login now"))
      .catch(() => alert("Verification failed"));
  }, []);

  return <h2>Verifying...</h2>;
}
