const exportObject = require("../models/articles_model")
const {fetchAllArticles} = exportObject
const {fetchArticleID} = exportObject

const getAllArticlesService = () => {
    return fetchAllArticles();
}

const getArticleIDService = (article_id) => {
    console.log("service article id: ", article_id, 2)
    const regex = /^\d+/
    if (regex.test(article_id)) {
        return fetchArticleID(article_id);
    } 
    // else if (article_id === null) {

    // } else if (article_id === undefined) {

    // }

}

module.exports = {getAllArticlesService, getArticleIDService}