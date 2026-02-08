const express = require("express");
const router = express.Router();
const getComment = require("../controllers/comments_controller");

router.delete("/:comment_id", getComment);

module.exports = router;
