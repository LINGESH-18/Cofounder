const exp = require("express");
const router = exp.Router();
const Auth = require("../../middleware/auth");
const Report = require("../../Dbmodels/report");
const User = require("../../Dbmodels/Users");

//@route    Post api/report
//@desc     get user repos from github
//@acces    private

router.post("/", Auth, async (req, res) => {
  var { to, report } = req.body;
  try {
    var Report_from_user = await User.findOne({ _id: req.user.id });
    console.log(Report_from_user);
    var from = Report_from_user.name;
    const reportdetail = { from, to, report };
    var report = await new Report(reportdetail);
    report.save();
    return res.json(report);
  } catch (error) {
    console.log("error from post /auth/report");
    return res.json({ msg: error.message });
  }
});
module.exports = router;
