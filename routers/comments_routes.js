const express = require("express");
const router = express.Router();
const getComment = require("../controllers/comments_controller");
const handleInvalidMethods = require("../utils/handleInvalidMethods");

router.route("/:comment_id").delete(getComment).all(handleInvalidMethods);

module.exports = router;
