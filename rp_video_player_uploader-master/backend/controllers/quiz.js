// quizController.js
const Quiz = require("../models/Quiz");

exports.addQuizQuestion = async (req, res) => {
  try {
    const quiz = new Quiz({
      videoId: req.body.videoId,
      questions: req.body.questions,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Failed to add question:", error);
    res.status(400).json({
      message: "Error adding question",
      error: error.message, // Providing error message detail
    });
  }
};

exports.updateQuizQuestion = async (req, res) => {
  const { id } = req.params;
  const { time, question, options, correctAnswer } = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        time,
        question,
        options,
        correctAnswer,
      },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.status(200).json({
      message: "Question updated successfully",
      updatedQuiz,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating question",
      error,
    });
  }
};
