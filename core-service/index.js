const express = require("express");
require("dotenv").config();
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();

// Enable CORS before defining routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Protected route
app.get("/welcome", auth, (req, res) => {
  res.json({
    message: `Welcome ${req.user.email}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Core running on ${PORT}`));
