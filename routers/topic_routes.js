const express = require("express")
const getAllTopics = require("../controllers/topic_controller")
const router = express.Router()

router.get("/", getAllTopics)

module.exports = router;