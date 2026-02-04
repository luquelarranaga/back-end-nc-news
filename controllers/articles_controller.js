const getAllArticlesService = require("../services/articles_service")

const getAllArticles = async(req, res) => {
    const articles = await getAllArticlesService()
    
    return res.status(200).send(articles)
}

module.exports = getAllArticles