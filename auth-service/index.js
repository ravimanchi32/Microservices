// const express = require("express");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// app.use("/auth", require("./routes/auth"));

// app.listen(process.env.PORT, () =>
//   console.log(`Auth running on ${process.env.PORT}`)
// );


/**
 * Auth Service Entry Point
 */

require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARE
======================= */

// Enable CORS for React frontend
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Parse JSON body
app.use(express.json());

/* =======================
   ROUTES
======================= */

app.use("/auth", require("./routes/auth"));

/* =======================
   SERVER START
======================= */

const PORT = process.env.PORT || 3001;

app.listen(process.env.PORT, "0.0.0.0", () =>
  console.log(`Core running on ${process.env.PORT}`)
);
