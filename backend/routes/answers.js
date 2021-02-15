const express = require("express");
const AnswersController = require("../controllers/AnswersController");

const router = express.Router();

router.post("/", AnswersController.saveAnswer);

module.exports = router;
