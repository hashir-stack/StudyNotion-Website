const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");
const {emailTemplate} = require("../mail/templates/emailVerificationTemplates");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default:Date.now,
        expires:300
    },
    otp:{
        type:String,
        required: true,

    }
});

const emailVerify = async (email,otp) =>{
    try {
        const mailResponce = await mailSender(
            email,
            "Email verification",
            emailTemplate(otp)
        );
        console.log(mailResponce);
    } catch (error) {
        console.log("Error in sending otp" , error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    await emailVerify(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",otpSchema);