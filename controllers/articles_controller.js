const exportObject = require("../services/articles_service");
const { getAllArticlesService } = exportObject;
const { getArticleIDService } = exportObject;
const { getArticleCommentsService } = exportObject;

const getAllArticles = async (req, res) => {
  const articles = await getAllArticlesService();

  return res.status(200).send({ articles: articles });
};

const getArticleID = async (req, res, next) => {
  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  try {
    const articleID = await getArticleIDService(article_id);
    return res.status(200).send({ article: articleID });
  } catch (err) {
    next(err);
  }
};

const getArticleComments = async (req, res, next) => {
  const { article_id } = req.params;
  const comments = await getArticleCommentsService(article_id);
  return res.status(200).send({ comments: comments });
};
module.exports = { getAllArticles, getArticleID, getArticleComments };
