const SubSection = require("../models/subSection");
const Section = require("../models/section");
require("dotenv").config();
const { imageUploadToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async ( req , res ) =>{
    try {
        // fetch the data from request body
        const{sectionId,title,description} = req.body;

        // fetch the video from the files
        const video = req.files.video;

        // validation of the data
        if(!sectionId || !title || !description || !video ){
            return res.status(404).json({
                success:false,
                message:"All the feilds are required..."
            });
        }
        // upload to the cloudinary
        const uploadDetails = await imageUploadToCloudinary(video,process.env.FOLDER_NAME);

        // create subsection in the db
        const newSubSection = await SubSection.create({
            title,timeDuration:uploadDetails.duration,
            description,videoUrl:uploadDetails.secure_url
        });
        // update the section schema
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {$push:{subSection:newSubSection._id}},
            {new:true}
        ).populate("subSection").exec();

        // return successfull responce
        res.status(200).json({
            success:true,
            message:"Your Sub-Section is created successfully ...",
            data:updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Some issue in creating the Sub Section..."
        });
    }
}

exports.updateSubSection = async ( req , res ) =>{
    // try {
    //     // fetch the id of sub-section
    //      const{subSectionId ,sectionId,title,description} = req.body;

    //      // fetch the video from the files
    //     const videoFile = req.files.video; 

    //     // validate the data 
    //     if( !subSectionId || !title || !timeDuration || !description || !videoFile){
    //         return res.status(401).json({
    //             success:false,
    //             message:"All feilds are required..."
    //         });
    //     };

    //     // upload to cloudinary
    //     const uploadDetails = await imageUploadToCloudinary(process.env.FOLDER_NAME,videoFile);

    //     // upadte the db of sub-section
    //     const updatedSubSection = await Section.findByIdAndUpdate(
    //         {subSectionId},
    //         {title,timeDuration,description,videoUrl:uploadDetails.secure_url},
    //         {new : true}
    //     );

    //     // return successfull responce
    //     res.status(200).json({
    //         success:true,
    //         message:"Sub-Section is updated Successfully...",
    //         data:updatedSubSection
    //     });
    // } catch (error) {
    //      return res.status(500).json({
    //         success:false,
    //         message:error.message,
    //         data:"Some issue in updating the Sub-Section..."
    //     });
    // }

    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await imageUploadToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
}

exports.deleteSubSection = async ( req , res ) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete( subSectionId )
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "Sub-Section not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }

}