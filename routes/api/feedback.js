const exp = require("express");
const router = exp.Router();
const Auth = require("../../middleware/auth");
const User = require("../../Dbmodels/Users");
const Feedback = require("../../Dbmodels/Feedback");

//@route    Post api/report
//@desc     get user repos from github
//@acces    private

router.post("/", Auth, async (req, res) => {
  var { userFeedback } = req.body;
  try {
    var user = await User.findOne({ _id: req.user.id });
    var from = user.name;
    const feedbackdetail = { from, userFeedback };
    var feedback = new Feedback(feedbackdetail);
    feedback.save();
    return res.json(feedback);
  } catch (err) {
    console.log("error from path post api/feedback");
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
