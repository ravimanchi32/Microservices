const db = require("../db");

exports.findByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email=?", [email], cb);
};

exports.createUser = (email, password, token, cb) => {
  db.query(
    "INSERT INTO users (email, password, verification_token) VALUES (?,?,?)",
    [email, password, token],
    cb
  );
};

exports.updateUser = (payload, where, cb) => {
  const query = `UPDATE users SET is_active = ? WHERE verification_token = ?`;
  db.query(query, [payload, where], cb);
};
