const express = require("express");
const getAllTopics = require("../controllers/topic_controller");
const handleInvalidMethods = require("../utils/handleInvalidMethods");
const router = express.Router();

router.route("/").get(getAllTopics).all(handleInvalidMethods); // GET ALL TOPICS IS THE HTTP FUNCTION ! JUST REPLACES IT

module.exports = router;
