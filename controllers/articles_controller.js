const InvalidInputError = require("../errors/InvalidInputError");
const exportObject = require("../services/articles_service");
const { getAllArticlesService } = exportObject;
const { getArticleIDService } = exportObject;
const { getArticleCommentsService } = exportObject;
const { addCommentService } = exportObject;
const { updateVotesService } = exportObject;

const getAllArticles = async (req, res, next) => {
  const query = req.query;
  try {
    const articles = await getAllArticlesService(query);
    return res.status(200).send({ articles: articles });
  } catch (err) {
    next(err);
  }
};

const getArticleID = async (req, res, next) => {
  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    throw new InvalidInputError("Invalid article id!");
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
    throw new InvalidInputError("Invalid article id!"); // throw error insteAD!
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
  const commentKeys = Object.keys(newComment);
  if (
    commentKeys.includes("username") === false ||
    commentKeys.includes("body") === false ||
    commentKeys.length !== 2
  ) {
    throw new InvalidInputError("Invalid comment!");
  }

  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    throw new InvalidInputError("Invalid article id!");
  }

  try {
    const comment = await addCommentService(newComment, article_id);
    return res.status(201).send({ comment: comment });
  } catch (err) {
    next(err);
  }
};

const patchArticleVotes = async (req, res, next) => {
  const votes = req.body;
  const { article_id } = req.params;

  const votesKeys = Object.keys(votes);
  if (votesKeys.includes("inc_votes") === false || votesKeys.length !== 1) {
    throw new InvalidInputError("Invalid vote");
  }

  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    throw new InvalidInputError("Invalid article id!");
  }

  try {
    const updatedArticle = await updateVotesService(votes, article_id);
    return res.status(201).send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllArticles,
  getArticleID,
  getArticleComments,
  postArticleComment,
  patchArticleVotes,
};
