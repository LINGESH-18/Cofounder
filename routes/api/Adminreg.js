const express = require("express");
const router = express.Router();
const Admin = require("../../Dbmodels/Admin");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const adminAuth = require("../../middleware/adminAuth");

//@route    post admin registration
//@desc     admin registration
//@acces    public

router.post(
  "/",
  [
    [
      check("name", "Enter Admin name").not().isEmpty(),
      check("password", "Enter admin password").isLength({ min: 4 }),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({ msg: error.array() });
    }
    try {
      const { name, password } = req.body;
      var useradmin = await Admin.findOne({ name });
      if (useradmin) {
        return res.status(400).send("Admin exist");
      }
      var admindetail = { name, password };
      var admin = new Admin(admindetail);
      const saltround = await bcryptjs.genSalt(10);
      admin.password = await bcryptjs.hash(password, saltround);
      admin.save();
      return res.send("Admin registered successfully");
    } catch (error) {
      console.log("Error from post path /api/registration");
      return res.send(error.message);
    }
  }
);

module.exports = router;
