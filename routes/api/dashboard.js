const express = require("express");
const router = express.Router();
const Admin = require("../../Dbmodels/Admin");
const profile = require("../../Dbmodels/Profile");
const User = require("../../Dbmodels/Users");
const Profile = require("../../Dbmodels/Profile");
const Report = require("../../Dbmodels/report");
const FeedbacK = require("../../Dbmodels/Feedback");

const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

//@route    post admin Login
//@desc     admin login
//@acces    private

router.post(
  "/",
  [
    [
      check("name", "enter valid admin name").not().isEmpty(),
      check("password", "enter a valid Admin password"),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    try {
      const { name, password } = req.body;
      const admin = await Admin.findOne({ name });
      if (!admin) {
        return res.status(401).send("invalid Admin credential");
      }
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
      }

      var usercount, cofoundercount, reportcount, feedbackcount;
      var user = await User.find();
      usercount = user.map((user) => user.id).length;
      var profile = await Profile.find();
      cofoundercount = profile.map((user) => user.id).length;
      var report = await Report.find();
      reportcount = report.map((user) => user.id).length;
      var feedback = await FeedbacK.find();
      feedbackcount = feedback.map((user) => user.id).length;
      var reports = report.map(
        (report) =>
          `${report.from} reports ${report.to} for reason ${report.report} `
      );
      var feedbacks = feedback.map(
        (feedback) =>
          `the feedback from ${feedback.from} is ${feedback.userFeedback} `
      );
      console.log({
        total_cofounders_count: cofoundercount,
        Total_user_count: usercount,
        Total_Feedback_count: feedbackcount,
        Total_Report_count: reportcount,
        Feedbacks: feedbacks,
        Reports: reports,
      });

      return res.status(200).json({
        total_cofounders_count: cofoundercount,
        Total_user_count: usercount,
        Total_Feedback_count: feedbackcount,
        Total_Report_count: reportcount,
        Feedbacks: feedbacks,
        Reports: reports,
      });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err });
    }
  }
);
module.exports = router;
