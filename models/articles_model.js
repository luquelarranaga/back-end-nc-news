const db = require("../db/connection");
const checkArticleIdExists = require("../utils/doesArticleExist");
const NotFoundError = require("../errors/NotFoundError");
const doesArticleExist = require("../utils/doesArticleExist");
const isSortByValid = require("../utils/isSortByValid");

const fetchAllArticles = async (sort_by, order, topic) => {
  console.log("topic in model>>", topic);
  if (topic) {
    const result = await db.query(`SELECT * FROM articles WHERE topic = $1`, [
      topic,
    ]);
    const { rows } = result;
    return rows;
  }

  let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments) AS int) AS total_comments 
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.`;

  queryStr += sort_by + " " + order.toUpperCase();
  console.log("query string is>>>", queryStr);

  const result = await db.query(queryStr);
  const { rows } = result;
  return rows;

  //returns an object that contains keys such as body and rows. Rows contains the values we want
  // const { rows } = result;
  // return rows;
};

const fetchArticleID = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id],
  );
  //returns an object that contains keys such as body and rows. Rows contains the values we want
  const { rows } = result;
  return rows[0];
};

const fetchArticleComments = async (article_id) => {
  const articleExists = await doesArticleExist(article_id);
  if (articleExists === false) {
    throw new NotFoundError("Article ID not found!");
  }

  const result = await db.query(
    `
    SELECT * FROM comments
    JOIN articles
    ON comments.article_id = articles.article_id
    WHERE comments.article_id = $1`,
    [article_id],
  );
  const { rows } = result;
  return rows;
};

const insertComment = async (newComment, article_id) => {
  const articleExists = await doesArticleExist(article_id);
  if (articleExists === false) {
    throw new NotFoundError("Article ID not found!");
  }

  const result = await db.query(
    `
    INSERT INTO comments (article_id, body, votes, author, created_at)
    VALUES
    ($1, $2, 0, $3, CURRENT_TIMESTAMP)
    RETURNING *
    `,
    [article_id, newComment.body, newComment.username],
  );
  const { rows } = result;
  return rows[0];
};

const updateArticleVotes = async (votes, article_id) => {
  const articleExists = await doesArticleExist(article_id);
  if (articleExists === false) {
    throw new NotFoundError("Article ID not found!");
  }

  try {
    const result = await db.query(
      `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *
    `,
      [votes.inc_votes, article_id],
    );
    const { rows } = result;
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchAllArticles,
  fetchArticleID,
  fetchArticleComments,
  insertComment,
  updateArticleVotes,
};
