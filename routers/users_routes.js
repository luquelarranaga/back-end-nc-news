const express = require("express");
const getAllUsers = require("../controllers/users_controller");
const handleInvalidMethods = require("../utils/handleInvalidMethods");
const router = express.Router();

router.route("/").get(getAllUsers).all(handleInvalidMethods);

module.exports = router;
