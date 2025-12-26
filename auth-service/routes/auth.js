const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../utils/mailer");

const router = express.Router();

function generateUUID() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* REGISTER */
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const token = generateUUID();

    User.createUser(email, hash, token, (err) => {
        if (err) return res.status(400).json({ message: "User exists" });
    });

    const verifyLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;

    await transporter.sendMail({
        from: "no-reply@example.com",
        to: email,
        subject: "Verify your account",
        html: `
    <h3>Welcome!</h3>
    <p>Please verify your account:</p>
    <a href="${verifyLink}">Verify Email</a>
    `
    });

    res.json({ message: "Registered successfully" });
});

router.get("/verify", async (req, res) => {
  const { token } = req.query;
  User.updateUser(true, token, (err) => {
    if (err) return res.status(400).json({ message: "User exists" });
    res.json({ message: "User Verified Successfully" });
  })
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, users) => {
    if (users.length === 0)
      return res.status(401).json({ message: "Invalid user" });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user.id });
  });
});

module.exports = router;
