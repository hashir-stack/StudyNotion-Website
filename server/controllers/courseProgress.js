const SubSection = require("../models/subSection");
const CourseProgress = require("../models/courseProgress");

exports.updateCourseProgress = async (req, res) => {
  // fetching the ids from body and user
  const { courseId, subSectionId } = req.body;
  const { userId } = req.user;

  try {
    // check for the valid subsection
    const subSection = await SubSection.findById(subSectionId);
    // validation for subSection
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid SubSection...",
      });
    }

    // check for old entry
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId,
    });
    // validation for courseProgress
    if (!courseProgress) {
      // return res.status(404).json({
      //     success:false,
      //     message:"Course Progress doesn't exist..."
      // })
      courseProgress = new CourseProgress({
        courseID: courseId,
        userID: userId,
        completedVideos: [subSectionId],
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ error: "Video is Already completed..." });
      }

      // puch into course progress array
      courseProgress.completedVideos.push(subSectionId);
    }

    await courseProgress.save();

    // return successfull responce
    res.status(200).json({
      success: true,
      message: "Video Marked as Completed ...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ...",
    });
  }
};
