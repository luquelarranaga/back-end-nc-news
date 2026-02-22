const db = require("../db/connection");

const fetchAllUsers = async () => {
  const result = await db.query(`SELECT * FROM users`);
  const { rows } = result;
  return rows;
};

const fetchUser = async (username) => {
  const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  const { rows } = result;
  return rows[0];
};

module.exports = { fetchAllUsers, fetchUser };
