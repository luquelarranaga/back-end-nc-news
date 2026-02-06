// ROUTES TO CORRECT END POINT
const express = require("express");
const router = express.Router();
const exportObject = require("../controllers/articles_controller");
const { getAllArticles } = exportObject;
const { getArticleID } = exportObject;
const { getArticleComments } = exportObject;
const { postArticleComment } = exportObject;

router.get("/", getAllArticles);

router.get("/:article_id", getArticleID);

router.get("/:article_id/comments", getArticleComments);

router.post("/:article_id/comments", postArticleComment);

module.exports = router;
