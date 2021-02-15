const express = require("express");
const AnswersController = require("../controllers/AnswersController");

const router = express.Router();

router.post("/", AnswersController.saveAnswer);
router.get("/:userId", AnswersController.getUserAnswers);

module.exports = router;
