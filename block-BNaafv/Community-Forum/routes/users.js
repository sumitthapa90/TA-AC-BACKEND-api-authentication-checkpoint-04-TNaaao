var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Profile = require("../models/Profile");

//register

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    console.log(user);
    res.status(400).json({ user });
  } catch (error) {
    next(error);
  }
});

//login

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email & Password is Required" });
  }

  try {
    var user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User is not register" });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      res.status(400).json({ error: "Password is incorrect" });
    }

    var token = await user.createToken();
    user = await user.userJSON(token);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
