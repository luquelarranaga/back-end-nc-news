const exportObject = require("../models/articles_model");
const { fetchAllArticles } = exportObject;
const { fetchArticleID } = exportObject;
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

module.exports = { getAllArticlesService, getArticleIDService };
