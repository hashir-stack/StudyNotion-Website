const express = require("express");
const router = express.Router();

// importing the controllers
const{createCourse,allCourses,getCourseDetail,editCourse,getInstructorCourses,deleteCourse, getFullCourseDetails} = require("../controllers/courseController");
const{createCategory,showAllCategories,categoryPageDetails} = require("../controllers/categoryController");
const{createRatingAndReview,getAverageRating,getAllRatingAndReview} = require("../controllers/ratingAndReviewController");
const{createSection,updateSection,deleteSection} = require("../controllers/sectionController");
const{createSubSection,updateSubSection,deleteSubSection} = require("../controllers/subSectionController");
const{updateCourseProgress} = require("../controllers/courseProgress");

// importing the middlewares
const{auth,IsStudent,IsAdmin,IsInstructor} = require("../middlewares/authMdw");

// Defining the routes methods

// Courses should be create by instructor only
router.post("/createCourse" , auth , IsInstructor , createCourse);
// Edit Course routes
router.post("/editCourse", auth, IsInstructor, editCourse)
// creating the section
router.post("/createSection" , auth , IsInstructor , createSection);
// updating the section
router.post("/updateSection" , auth , IsInstructor , updateSection);
// deleting the section
router.delete("/deleteSection" , auth , IsInstructor , deleteSection);
// creating the sub-section
router.post("/createSubSection" , auth , IsInstructor , createSubSection);
// updating the sub-section
router.post("/updateSubSection" , auth , IsInstructor , updateSubSection);
// deleting the sub-section
router.delete("/deleteSubSection" , auth , IsInstructor , deleteSubSection);
// get all the course
router.get("/allCourses" , allCourses);
// fetch details of the specific course
// router.post("/getCourseDetail" , getCourseDetail);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, IsInstructor, getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

// creating the reviews only by students
router.post("/updateCourseProgress", auth , IsStudent, updateCourseProgress);

// creating the category(only by the admin)
router.post("/createCategory" , auth , IsAdmin , createCategory);
// get all the category
router.get("/showAllCategories" , showAllCategories);
// get the category page details
router.post("/categoryPageDetails" , categoryPageDetails);


// creating rating and review
router.post("/createRatingAndReview" , auth , IsStudent , createRatingAndReview);
// get average rating
router.get("/getAverageRating" , getAverageRating);
// get all the rating
router.get("/getAllRatingAndReview" , getAllRatingAndReview);

// exporting the route
module.exports = router;