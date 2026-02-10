// ROUTES TO CORRECT END POINT
const express = require("express");
const router = express.Router();
const exportObject = require("../controllers/articles_controller");
const handleInvalidMethods = require("../utils/handleInvalidMethods");
const { getAllArticles } = exportObject;
const { getArticleID } = exportObject;
const { getArticleComments } = exportObject;
const { postArticleComment } = exportObject;
const { patchArticleVotes } = exportObject;

router.route("/").get(getAllArticles).all(handleInvalidMethods);

router
  .route("/:article_id")
  .get(getArticleID)
  .patch(patchArticleVotes)
  .all(handleInvalidMethods);

router
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment)
  .all(handleInvalidMethods);

module.exports = router;
