const Profile = require("../models/profile");
const Course = require("../models/course");
const User = require("../models/user");
const CourseProgress = require("../models/courseProgress");
const { imageUploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    // fetch the data from the request body
    const { gender, dateOfBirth = "", about = "", phoneNo } = req.body;
    console.log(req.body.phoneNo);
    // fetch the user id
    const userId = req.user.id;

    // update the db of profile...finding the profileid with the help of userid which is inscerted in the req.user at the time of authencation
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.phoneNo = phoneNo;
    profileDetails.about = about;

    await profileDetails.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    console.log(updatedUserDetails);

    // return successfull responce
    res.status(200).json({
      success: true,
      message: "Your Profile is updated successfully...",
      data: {
        user: updatedUserDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile can't updated right now ...Please try again...",
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    // fetch the ids
    const userId = req.user.id;

    // validation of the id
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found...",
      });
    }
    // delete the profile from the profile db
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // delete the profile from the user db
    await User.findByIdAndDelete(userId);

    // return successfull responce
    res.status(200).json({
      success: true,
      message: "Successfully delete the profile...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Some issue in deleting the profile right now ....Please try again...",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // fetch the id
    const userId = req.user.id;

    // find the profile in he db of user
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    // send successfull responce
    res.status(200).json({
      success: true,
      message: "Successfully the fetch the user profile...",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some issue can't fetch profile details...",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    // fetch the pic from files
    const displayPicture = req.files?.displayPicture;
    // validation
    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture uploaded",
      });
    }

    // fetch the user id from req.user
    const userId = req.user?.id;
    // validation
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }
    console.log("File object:", req.files?.displayPicture);
    const image = await imageUploadToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // Update the pic in db of the user
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );
    // send successfull responce
    res.json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userDetails = await User.findOne({
//       _id: userId,
//     })
//       .populate({
//         path: "courses",
//         populate: {
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec();
//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: userDetails.courses,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: { path: "subSection" },
        },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const coursesWithProgress = await Promise.all(
      user.courses.map(async (course) => {
        const totalVideos = course.courseContent.reduce(
          (sum, section) => sum + (section.subSection?.length || 0),
          0
        );

        const progress = await CourseProgress.findOne({
          courseID: course._id,
          userID: userId,
        });

        const completed = progress?.completedVideos?.length || 0;
        const ProgressPercentage = totalVideos
          ? Math.round((completed / totalVideos) * 100)
          : 0;

        return {
          ...course._doc,
          ProgressPercentage,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};


exports.instructorDashboardData = async ( req , res)=>{
  try {
    // fetcing the id of the user 
    const userId = req.user.id;

    const courseDetails = await Course.find({ instructor: userId });

    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // create new object with additional feilds
      const courseDataWithStats ={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats;
    })

    res.status(200).json({
      success:true,
      courses:courseData
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error..."
    })
  }
}
