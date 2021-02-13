const express = require("express");
const QuestionsController = require("../controllers/QuestionsController");

const router = express.Router();

router.get("/", QuestionsController.questions);

module.exports = router;
