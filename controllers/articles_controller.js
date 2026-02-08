const exportObject = require("../services/articles_service");
const { getAllArticlesService } = exportObject;
const { getArticleIDService } = exportObject;
const { getArticleCommentsService } = exportObject;
const { addCommentService } = exportObject;

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
  const { article_id } = req.params; // {article_id: '1;}
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  try {
    const comments = await getArticleCommentsService(article_id);
    return res.status(200).send({ comments: comments });
  } catch (err) {
    next(err);
  }
};

const postArticleComment = async (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  const comment = await addCommentService(newComment, article_id);
  return res.status(201).send({ comment: comment });
};

module.exports = {
  getAllArticles,
  getArticleID,
  getArticleComments,
  postArticleComment,
};
