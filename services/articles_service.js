const exportObject = require("../models/articles_model")
const {fetchAllArticles} = exportObject
const {fetchArticleID} = exportObject

const getAllArticlesService = () => {
    return fetchAllArticles();
}

const getArticleIDService = (article_id) => {
    // console.log("service article id: ", article_id)
    // if (typeof article_id === "number") {
        return fetchArticleID(article_id);
    // }
}

module.exports = {getAllArticlesService, getArticleIDService}