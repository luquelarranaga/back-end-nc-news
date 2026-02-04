const express = require("express")
const router = express.Router()

router.get("/", getAllTopics)

module.exports = router;