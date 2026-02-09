const db = require("../db/connection");
const NotFoundError = require("../errors/NotFoundError");

async function doesCommentExist(comment_id) {
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE comment_id = $1`,
    [comment_id],
  );
  return rows.length === 1;
}

module.exports = doesCommentExist;
