const express = require("express");
const UsersController = require("../controllers/UsersController");

const router = express.Router();

router.get("/", UsersController.usersList);

module.exports = router;
