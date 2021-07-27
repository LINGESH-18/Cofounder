const express = require("express");
const router = express.Router();
const Profile = require("../../Dbmodels/Profile");
const Auth = require("../../middleware/auth");
const User = require("../../Dbmodels/Users");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

//@route    GET api/profile/me
//@desc     get my profile
//@acces    private(because using token)

router.get("/me", Auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    POST api/profile
//@desc     create or update profile
//@acces    private(because using token)
router.post(
  "/",
  [
    Auth,
    [
      check("skills", "Skills is required").notEmpty(),
      check("status", "status is required ").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    const {
      status,
      company,
      bio,
      location,
      githubusername,
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      whatsapp,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;

    if (skills) {
      profileFields.skills = skills.split(",").map((skills) => skills.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (whatsapp) profileFields.social.whatsapp = whatsapp;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      var profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate("user", ["name", "avatar"]);
      if (profile) {
        return res.status(200).json(profile);
      }
      // create
      var profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  }
);

//@route    GET api/profiles
//@desc     get All profile
//@acces    public(because using token)
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.status(200).json({ profiles: profiles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    GET api/profile/user/:user_id
//@desc     get specific userid profile
//@acces    public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profiles) {
      res.status(400).json({ msg: "There is no profile for user" });
    }
    return res.status(200).json({ profiles: profiles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    Delete api/profile/user/:user_id
//@desc     Deleting particular user and profile and post
//@acces    public

router.delete("/", Auth, async (req, res) => {
  try {
    //@todo - remove user posts

    //remove profile
    const profiles = await Profile.findOneAndRemove({ user: req.user.id });
    const user = await User.findOneAndRemove({ _id: req.user.id });

    return res.status(200).json({ Msg: "User Removed succesfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    put api/profile/experience
//@desc     updating The user profile experience
//@acces    private

router.put("/expereince", [
  Auth,
  [
    check("company", "Company is required ").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(500).json({ msg: error.array() });
    }
    const { title, company, from, location, to, current, description } =
      req.body;
    const newExp = { title, company, from, location, to, current, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      profile.save();
      res.json(profile);
    } catch (err) {
      console.log(
        "error from delete expereince path route/api/profile.js/expereince "
      );
      res.status(500).json({ msg: err.msg });
    }
  },
]);

//@route    Delete api/profile/experience/exp-id
//@desc     deleting The user profile experience
//@acces    private

router.delete("/expereince/:exp_id", Auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    var removeindex = profile.experience.map((item) => item.id);
    removeindex = removeindex.indexOf(req.params.exp_id);
    profile.experience.splice(removeindex, 1);
    profile.save();
    return res
      .status(200)
      .json({ Msg: "User Expereince profile Removed succesfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    put api/profile/education
//@desc     updating The user profile education
//@acces    private

router.put("/education", [
  Auth,
  async (req, res) => {
    const { school, degree, from, fiedofstudy, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      from,
      fiedofstudy,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();

      res.send(profile);
    } catch (err) {
      console.log(err);
      console.log(
        "error from delete expereince path route/api/profile.js/education"
      );
      res.status(500).json({ msg: err.msg });
    }
  },
]);

//@route    Delete api/profile/education/edu-id
//@desc     deleting The user profile education
//@acces    private

router.delete("/education/:edu_id", Auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    var removeindex = profile.education.map((item) => item.id);
    removeindex = removeindex.indexOf(req.params.edu_id);
    profile.experience.splice(removeindex, 1);
    profile.save();
    return res
      .status(200)
      .json({ Msg: "User education profile Removed succesfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//@route    Get api/profile/github/:username
//@desc     get user repos from github
//@acces    private

router.get("/github/:username", async (req, res) => {
  const username = req.params.username;
  try {
    var options = {
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:dec&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log("error from Path get './api/github ");
    res.status(500).send(err.message);
  }
});

//logout module with 0 condition
module.exports = router;
