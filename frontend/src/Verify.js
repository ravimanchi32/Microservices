import { useEffect } from "react";
import axios from "axios";

export default function Verify() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    axios.get(`http://localhost:3001/auth/verify?token=${token}`)
      .then(() => alert("Email verified. You can login now"));
  }, []);

  return <h2>Verifying...</h2>;
}
