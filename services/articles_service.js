const fetchAllArticles = require("../models/articles_model")

const getAllArticlesService = () => {
    return fetchAllArticles();
}

module.exports = getAllArticlesService;