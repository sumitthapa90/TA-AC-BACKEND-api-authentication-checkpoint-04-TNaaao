var express = require("express");
var auth = require("../middlewere/auth");
var router = express.Router();
var Profile = require("../models/Profile");

//get profile information

router.get("/:username", auth.verifyToken, async function (req, res, next) {
  var givenUsername = req.params.username;

  try {
    var profile = await Profile.findOne({ usename: givenUsername });

    if (!profile) {
      res.status(200).json({ error: "Invalid Username" });
    }

    res.json({ profile: await profile.profileJSON() });
  } catch (error) {
    next(error);
  }
});

// update

router.put("/:username", auth.verifyToken, async function (req, res, next) {
  var givenUsername = req.params.username;

  try {
    var updatedProfile = await Profile.findByIdAndUpdate(
      { usename: givenUsername },
      req.body
    );

    var updatedUser = await User.findByIdAndUpdate(
      { usename: givenUsername },
      req.body
    );

    res.json({ profile: await updatedProfile.profileJSON() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
