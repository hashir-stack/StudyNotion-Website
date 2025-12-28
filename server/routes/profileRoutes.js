const express = require("express");
const router = express.Router();

// importing the profile controller
const {updateProfile,deleteProfile,getProfile,updateDisplayPicture,getEnrolledCourses,instructorDashboardData} = require("../controllers/profileController");

// importing the middlewares
const { auth, IsInstructor } = require("../middlewares/authMdw")

// defining the routes
router.put("/updateProfile" , auth , updateProfile);
router.delete("/deleteProfile" , auth , deleteProfile);
router.put("/updateDisplayPicture" , auth , updateDisplayPicture);
router.get("/getProfile" , auth , getProfile);
router.get("/getEnrolledCourses" , auth , getEnrolledCourses);
router.get("/instructorDashboardData" , auth , IsInstructor , instructorDashboardData);

module.exports = router ;