const express = require("express");
const router = express.Router();
const getComment = require("../controllers/comments_controller");

router.route("/:comment_id").delete(getComment);

module.exports = router;
