const db = require("../db/connection");
const NotFoundError = require("../errors/NotFoundError");

async function doesArticleExist(article_id) {
  const { rows } = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id],
  );
  return rows.length === 1;
}

module.exports = doesArticleExist;
