require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.use("/auth", require("./routes/auth"));


app.get("/health", (req, res) => {
  res.status(200).json({ status: "Auth service is running" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});
