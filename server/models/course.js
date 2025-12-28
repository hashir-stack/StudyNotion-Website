const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    language:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    whatUlearn:{
        type:String,
        required:true,
        trim:true
    },
    courseContent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        required:true
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    thumbnail:{
        type:String,
        required:true
    },
    tag: {
		type: [String],
		required: true,
	},
    category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Course",courseSchema);