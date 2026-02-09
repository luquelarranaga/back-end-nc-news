// ROUTES TO CORRECT END POINT
const express = require("express");
const router = express.Router();
const exportObject = require("../controllers/articles_controller");
const { getAllArticles } = exportObject;
const { getArticleID } = exportObject;
const { getArticleComments } = exportObject;
const { postArticleComment } = exportObject;
const { patchArticleVotes } = exportObject;

router.route("/").get(getAllArticles);

router.route("/:article_id").get(getArticleID).patch(patchArticleVotes);

router
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

module.exports = router;
