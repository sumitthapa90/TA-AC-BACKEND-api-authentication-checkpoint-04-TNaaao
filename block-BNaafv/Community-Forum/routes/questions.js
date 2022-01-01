var express = require("express");
var router = express.Router();
var Answer = require("../models/Answer");
var Profile = require("../models/Profile");
var Question = require("../models/Question");
var User = require("../models/User");

var auth = require("../middlewere/auth");

//Create Question

router.post("/", auth.verifyToken, (req, res, next) => {
  
});

module.exports = router;
