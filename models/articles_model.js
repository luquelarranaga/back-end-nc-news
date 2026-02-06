const db = require("../db/connection");

const fetchAllArticles = async () => {
  const result = await db.query(`
        SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments) AS int) AS total_comments 
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id;
        `);
  //returns an object that contains keys such as body and rows. Rows contains the values we want
  const { rows } = result;
  return rows;
};

const fetchArticleID = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id],
  );
  //returns an object that contains keys such as body and rows. Rows contains the values we want
  const { rows } = result;
  console.log("");
  return rows[0];
};

module.exports = { fetchAllArticles, fetchArticleID };
