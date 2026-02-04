// ROUTES TO CORRECT END POINT 
const express = require("express")
const router = express.Router()
const getAllArticles = require("../controllers/articles_controller")

router.get("/", getAllArticles)

module.exports = router;