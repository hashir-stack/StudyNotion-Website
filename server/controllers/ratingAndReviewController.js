const RatingAndReview = require ("../models/ratingAndReveiw");
const Course = require ("../models/course");
const { default: mongoose } = require("mongoose");

// create rating and review
exports.createRatingAndReview = async (req,res)=>{
    try {
        // fetch the user id
        const userId = req.user.id;

        // fetch the data of rating and review
        const {rating,review,courseId} = req.body;

        // check weather user enrolled in course or not
        const userEnrolled = await Course.findOne({
            _id: courseId,
            studentEnrolled:{$elemMatch:{$eq:userId}}
        });

        if(!userEnrolled){
            return res.status(401).json({
                success:false,
                message:"User is not enrolled in course...Please enrolled in course for create your review..."
            })
        };

        // check weather user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"User Already reviewed  the course...."
            });
        };
        // create rating and review
        const ratingAndReviewed = await RatingAndReview.create({
            rating,review,
            user:userId,
            course:courseId
        });

        // upadte the course with rating and review
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {$push:{ratingAndReview:ratingAndReviewed._id}},
            {new:true}
        );
        console.log(updatedCourse);

        // send successfull responce
        return res.status(200).json({
            success:true,
            data:ratingAndReviewed,
            message:"Successfully created the rating and review..."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//Get  Average Rating and review
exports.getAverageRating = async (req,res)=>{
    try {
        // fetch course id from req.body
        const { courseId } = req.body;

        // calculate average of the rating (can use google & Ai for the syntax)
        const result = await RatingAndReview.aggregate([
            {$match:{course:mongoose.Types.ObjectId(courseId)}},
            {$group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }}
        ]);
        
        // if rating exists
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            });
        };

        // if rating doesn't exists
        return res.status(200).json({
            success:true,
            averageRating:0,
            message:"Average rating is zero , till now no rating is given..."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get Rating and Review
exports.getAllRatingAndReview = async(req,res)=>{
    try {
        // find all the rating and review from the db
        const allRatingAndReview = await RatingAndReview.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName"
                                    })
                                    .exec();
        return res.status(200).json({
            success:true,
            message:" Successfully fetched all the Reviews...",
            data:allRatingAndReview
        });                            
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}