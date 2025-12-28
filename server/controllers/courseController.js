const Course = require("../models/course");
const User = require("../models/user");
const Section = require("../models/section");
const SubSection = require("../models/subSection");
const CourseProgress = require("../models/courseProgress")
// const Tag = require("../models/tag");
const Category = require("../models/category");
const { imageUploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create course controller
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    // fetch the data from request body
    let {
      courseName,
      courseDescription,
      price,
      whatUlearn,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // fetch the thumbnail from files
    const thumbnail = req.files.thumbnailImage;

    // validations of the data
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !whatUlearn ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(401).json({
        success: false,
        message: "All feilds are required...",
      });
    }

    if (!status) {
      status = "Draft";
    }

    // check for the user(instructor)
    // const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found...",
      });
    }

    // check for the category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found....",
      });
    }

    // Upload image to cloudinary
    const thumbnailImage = await imageUploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    // console.log("Thumbnail temp path:", thumbnail?.tempFilePath);

    // create new course into the db
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      instructor: userDetails._id,
      tag,
      thumbnail: thumbnailImage.secure_url,
      whatUlearn,
      category: categoryDetails._id,
      status,
      instructions,
    });

    // add new course in the user schema
    await User.findByIdAndUpdate(
      { _id: userDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // update the category schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // successfull responce
    res.status(200).json({
      success: true,
      message: "New course created successfully...",
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some issue in creating the new course...",
    });
  }
};

// exports.createCourse = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     console.log(userId);
//     console.log(req.body);
//     let {
//       courseName,
//       courseDescription,
//       price,
//       whatUlearn,
//       category,
//       status,
//       instructions,
//     } = req.body;

//     if (!courseName || !courseDescription || !price || !whatUlearn || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required...",
//       });
//     }

//     if (!status) {
//       status = "Draft";
//     }

//     const userDetails = await User.findOne({
//       _id: userId,
//       accountType: "Instructor",
//     });

//     if (!userDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor not found...",
//       });
//     }

//     const categoryDetails = await Category.findById(category);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Details not found...",
//       });
//     }

//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       price,
//       instructor: userDetails._id,
//       whatUlearn,
//       category: categoryDetails._id,
//       status,
//       instructions,
//     });

//     await Promise.all([
//       User.findByIdAndUpdate(userDetails._id, {
//         $push: { courses: newCourse._id },
//       }),
//       Category.findByIdAndUpdate(categoryDetails._id, {
//         $push: { course: newCourse._id },
//       }),
//     ]);

//     res.status(200).json({
//       success: true,
//       message: "New course created successfully...",
//       data: newCourse,
//     });
//   } catch (error) {
//   console.error("Create Course Error:", error);
//   return res.status(500).json({
//     success: false,
//     message: "Some issue in creating the new course...",
//   });
// }
// };

// get course details
exports.allCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReview")
      .exec();
    res.status(200).json({
      message: "Successfully fetch all the Courses...",
      success: true,
      data: allCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Issue in fetch the course data...",
    });
  }
};

// get all details of the course
// exports.getCourseDetail = async (req, res) => {
//   try {
//     // fetch the course id from the request body
//     const { courseId } = req.body;

//     // find the course from the db
//     const courseDetails = await Course.find({ courseId })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .populate("category")
//       .populate("studentEnrolled")
//       .populate("ratingAndReview")
//       .exec();

//     //validation of the course details
//     if (!courseDetails) {
//       return res.status(401).json({
//         success: false,
//         message:
//           "No details found with this course id...Please try again later...",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//       message: "Successfully fetched the course details....",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: message.error,
//     });
//   }
// };

// Get Details for a Specific Courses
function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}


exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// edit course
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const updates = req.body
//     const course = await Course.findById(courseId)

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" })
//     }

//     // If Thumbnail Image is found, update it
//     if (req.files) {
//       console.log("thumbnail update")
//       const thumbnail = req.files.thumbnailImage
//       const thumbnailImage = await imageUploadToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       )
//       course.thumbnail = thumbnailImage.secure_url
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key])
//         } else {
//           course[key] = updates[key]
//         }
//       }
//     }

//     await course.save()

//     const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }
exports.editCourse = async (req, res) => {
  try {
    const { courseId, status, tag, instructions } = req.body;

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Handle thumbnail image update
    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const uploadedImage = await imageUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
      course.thumbnail = uploadedImage.secure_url;
    }

    // Update known fields
    if (status) course.status = status;
    if (tag) {
      try {
        course.tag = JSON.parse(tag);
      } catch (err) {
        console.warn("Invalid tag format:", tag);
      }
    }
    if (instructions) {
      try {
        course.instructions = JSON.parse(instructions);
      } catch (err) {
        console.warn("Invalid instructions format:", instructions);
      }
    }

    // Save the updated course
    await course.save();

    // Populate related fields
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    // Send response
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Edit Course Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
