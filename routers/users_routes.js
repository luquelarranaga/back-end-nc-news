const express = require("express");
const handleInvalidMethods = require("../utils/handleInvalidMethods");
const router = express.Router();

const exportObject = require("../controllers/users_controller");
const { getUser } = exportObject;
const { getAllUsers } = exportObject;

router.route("/").get(getAllUsers).all(handleInvalidMethods);

router.route("/:username").get(getUser).all(handleInvalidMethods);

module.exports = router;
