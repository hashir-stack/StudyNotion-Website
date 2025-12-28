const Section = require ("../models/section");
const Course = require ("../models/course");
const SubSection = require ("../models/subSection")

exports.createSection = async ( req , res ) => {
    try {
        // fetch the data from the request body
        const {sectionName,courseId} = req.body;

        // validation of the data
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required...."
            });
        }
        // create section into the db
        const newSection = await Section.create({sectionName});

        // update course with section id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {$push:{courseContent:newSection._id}},
            {new:true}
        ).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			}).exec();

        // return successfull responce
        res.status(200).json({
            success:true,
            data:updatedCourseDetails,
            message:"New Section is created Successfully..."
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Some issue in creating the section..."
        })
    }
}

exports.updateSection = async ( req , res ) =>{
    try {
        // fetch the section id
        const {sectionName , sectionId,courseId} = req.body;

        // validate the data
        if( !sectionName || !sectionId ){
            return res.status(401).json({
                success:false,
                message:"All fields are required...."
            });
        }

        // upadte the section db
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        );

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        //return successfull resopnce
        res.status(200).json({
            success:true,
            data:course,
            message:"Your section is updated successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Some issue in updating the section..."
        });
    }
}

exports.deleteSection = async ( req , res ) => {
    try {
        // // fetch the id of the section
        const {sectionId , courseId} = req.body;
      
        // delete the section from db
        await Course.findByIdAndUpdate(courseId,{
            $pull:{courseContent:sectionId}
        });

        const section = await Section.findById(sectionId);
        console.log("SectionId and CourseId" ,sectionId, + " and " ,courseId);
        
        if(!section){
            return res.status(400).json({
                success:false,
                message:"Section not found"
            })
        }

        await SubSection.deleteMany({_id:{$in:section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // send successFull responce
        res.status(200).json({
			success:true,
			message:"Section is deleted successfully...",
			data:course
		});
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Some issue in deleting the section...Please try again..."
        });
    }
}