const Course = require("../models/course");
const User = require("../models/user");
const mailSender = require("../utils/mailsender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {instance} = require("../config/razorpay");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/courseProgress");

// capture payment and create order controller


// exports.capturePayment = async( req , res )=>{

//     // fetch ids of course  and user
//     const userId = req.user.id;
//     const {courseId} = req.body;

//     // validation of course id
//     if(!courseId){
//         return res.status(401).json({
//             success:false,
//             message:"Please provide a valid course Id...."
//         });
//     };

//      let course;
//     try {
//        course = await Course.findById(courseId);

//        if(!course){
//         return res.status(401).json({
//             success:false,
//             message:"Course doesn't exists..."
//         });
//        };

//     //convert the userId which is in string form into monsooge objectId
//     const uid = mongoose.Types.ObjectId(userId);
    
//     //    check weather use already purchase the course or not
//     if(course.studentEnrolled.includes(uid)){
//         return res.status(401).json({
//             success:false,
//             message:"User already enrolled in the course..."
//         });
//     };
//     } catch (error) {
//         return res.status(401).json({
//             success:false,
//             message:error.message
//         })
//     }

//     // create the order
//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//         amount: amount*100,
//         currency,
//         recipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId,
//             userId
//         }
//     };
//     // create order
//     try {
//          // initiate the payment using razorpay
//         const paymentResponce = await instance.orders.create(options);
//         console.log(paymentResponce);
//         // send successfull responce
//         res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponce.id,
//             currency:paymentResponce.currency,
//             amount:paymentResponce.amount,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:"Can't initiate order right now...Please try again..."
//         });
//     }

// };

// verify signature schema

// exports.verifySignature = async ( req , res )=>{
//     // create the webhook secret
//     const webhookSecret ="12345678";

//     // fetch the razorpay signature from req.headers
//     const signature = req.headers["x-razorpay-signature"];

//     // securing the webhook secret
//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(digest === signature){
//         console.log("Payment is authorsized....");

//         // fetch the course and user ids from the req body
//         const { courseId , userId } = req.body.payload.payment.entity.notes;

//         try {
//             // find the course and enrolled the user(student) in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {courseId},
//                 {$push:{studentEnrolled:userId}},
//                 {new:true}
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found..."
//                 })
//             };

//             // find the user(student) and enrolled the course in it
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {userId},
//                 {$push:{courses:courseId}},
//                 {new:true}
//             );

//             console.log(enrolledStudent);

//             // send mail for the confirmation of the course
//             const emailResponce = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from StudyNotion",
//                 courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName + enrolledStudent.lastName)
//             );

//             console.log(emailResponce);

//             // send successfull responce
//             res.status(200).json({
//                 success:true,
//                 message:"Signature is verified and new course is added to the user schema..."
//             });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             });
//         }
//     }else{
//         return res.status(404).json({
//             success:false,
//             message:"Authorisation failed...Please try again"
//         });
//     };
// };


// capture payment and create order controller

exports.capturePayment = async (req,res)=>{
    try {
        // fetching the course id
        const {courses}= req.body;

        // fetching the user Id
        const userId = req.user.id;

        if(!courses){
            return res.json({success:false , message:"Please provide course Id..."});
        }

        let totalAmount = 0;

        for(const course_id of courses){
            let course;
            try{
                course = await Course.findById(course_id);
                if(!course){
                    return res.status(200).json({
                        success:false,
                        message:"Could not find the selected course..."
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentEnrolled.includes(uid)){
                    return res.status(200).json({
                        success:false,
                        message:"Student is already Enrolled..."
                    })
                }

                totalAmount +=course.price;
            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }

        const options ={
            amount : totalAmount*100,
            currency:"INR",
            // recepit: Math.random(Date.now()).toString(),
            receipt: `receipt_${Date.now()}`

        }

        try {
            const paymentResponce = await instance.orders.create(options);
            res.json({
                success:true,
                message:paymentResponce
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Couldn't Initiate Order..."
            });
        }

    } catch (error) {
         console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            });
    }

}


// verify signature schema
const enrollStudent = async (courses,userId,res)=>{

    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide data for the Course and userId..."
        })
    }

    for(const courseId of courses){
        try {
             // find the course and enrolled the user(student) in it
        const enrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            {$push:{studentEnrolled:userId}},
            {new:true}
        )

        if (!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Could not  found the course..."
            });
        }

        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userID:userId,
            completedVideos:[]
        });

        // find the user(student) and enrolled the course in it
        const enrollStudent = await User.findByIdAndUpdate(
            userId,
            {$push:{courses:courseId,courseProgress:courseProgress._id}},
            {new:true}
        );

        const emailResponce = await mailSender(
            enrollStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName,enrollStudent.firstName + enrollStudent.lastName)
        );
        console.log("Email sent Successfully",emailResponce);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}


exports.verifySignature = async ( req , res ) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const {courses} = req.body;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(403).json({
            success:false,
            message:"Payment Failed..."
        })
    }

    //As per  Razorpay docs  instructions doint the following steps
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        // enrolled the students
        await enrollStudent(courses,userId,res);
        // return res
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }

    return res.status(200).json({
        success:false,
        message:"Payment Failed..."
    })

}

// send Successfull email controller
exports.sendPaymentSuccessEmail = async (req,res)=>{
    const{orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    if(!orderId || 
        !paymentId ||
        !amount ||
        !userId
    ){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in send successfull payment mail");
        return res.status(500).json({
            success:false,
            message:"Couldn't send email..."
        })
    }
}