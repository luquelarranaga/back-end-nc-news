// ROUTES TO CORRECT END POINT 
const express = require("express")
const router = express.Router()
const exportObject = require("../controllers/articles_controller")
const {getAllArticles} = exportObject
const {getArticleID} = exportObject


router.get("/", getAllArticles)

router.get("/:article_id", getArticleID)


module.exports = router;