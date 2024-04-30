const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MyVideos",
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
      time: Number, // Time in seconds when the quiz should appear
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
