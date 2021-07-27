const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  report: {
    type: String,
  },
});
const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
