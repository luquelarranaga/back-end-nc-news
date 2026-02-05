const exportObject = require("../services/articles_service")
const {getAllArticlesService} = exportObject
const {getArticleIDService} = exportObject

const getAllArticles = async(req, res) => {
    const articles = await getAllArticlesService()
    
    return res.status(200).send({articles: articles})
}


const getArticleID = async(req, res) => {
    const {article_id} = req.params
    console.log("article_id: ", article_id)

    const regex = /^\d+/
    if (regex.test(article_id)) {
        const articleID = await getArticleIDService(article_id)
        return res.status(200).send(articleID)
    } else {
        return res.status(400).send({msg: "400 Bad Request: Invalid ID"})
    }
}


module.exports = {getAllArticles, getArticleID}