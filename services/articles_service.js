const exportObject = require("../models/articles_model");
const { fetchAllArticles } = exportObject;
const { fetchArticleID } = exportObject;
const { fetchArticleComments } = exportObject;
const { insertComment } = exportObject;
const { updateArticleVotes } = exportObject;

const NotFoundError = require("../errors/NotFoundError");

const getAllArticlesService = () => {
  return fetchAllArticles();
};

const getArticleIDService = async (article_id) => {
  const articleID = await fetchArticleID(article_id);
  if (articleID === undefined) {
    throw new NotFoundError("Category ID not found!");
  } else {
    return articleID;
  }
};

const getArticleCommentsService = async (article_id) => {
  const comments = await fetchArticleComments(article_id);

  if (comments === undefined) {
    throw new NotFoundError("Category ID not found!");
  } else {
    return comments;
  }
};

const addCommentService = async (newComment, article_id) => {
  const comment = await insertComment(newComment, article_id);
  return comment;
};

const updateVotesService = async (votes, article_id) => {
  const updatedArticle = await updateArticleVotes(votes, article_id);
  return updatedArticle;
};

module.exports = {
  getAllArticlesService,
  getArticleIDService,
  getArticleCommentsService,
  addCommentService,
  updateVotesService,
};
