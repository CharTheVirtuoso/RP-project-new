// quizRoutes.js
const express = require("express");
const router = express.Router();
const { addQuizQuestion, updateQuizQuestion } = require("../controllers/quiz");

router.post("/quizzes", addQuizQuestion);
router.put("/quizzes/:id", updateQuizQuestion);

module.exports = router;
