const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  userFeedback: {
    type: String,
    required: true,
  },
});
var Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
