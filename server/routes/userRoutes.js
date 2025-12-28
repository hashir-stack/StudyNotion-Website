const express = require("express");
const router = express.Router();

// importing the user controller
const {sendOTP,signUp,login,changePassword} = require("../controllers/authController");
const {resetPasswordToken,resetPassword} = require("../controllers/resetPwdController");

// importing the middleware
const {auth} = require("../middlewares/authMdw");

// defining the route
router.post("/sendOTP" , sendOTP);
router.post("/signUp" , signUp);
router.post("/login" , login);
router.post("/changePassword" , auth , changePassword);
router.post("/resetPasswordToken" , resetPasswordToken);
router.post("/resetPassword" , resetPassword);

module.exports = router;