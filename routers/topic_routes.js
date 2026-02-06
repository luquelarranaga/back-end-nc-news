const express = require("express");
const getAllTopics = require("../controllers/topic_controller");
const router = express.Router();

router.get("/", getAllTopics); // GET ALL TOPICS IS THE HTTP FUNCTION ! JUST REPLACES IT

module.exports = router;
