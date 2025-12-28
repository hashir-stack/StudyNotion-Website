const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailsender");
const crypto = require("crypto");


// Reset Password Token
exports.resetPasswordToken = async ( req , res )=>{
    try {
        // fetch the email from request
        const {email} = req.body;

        // validation of email
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please fill the required feild..."
            });
        }
        // check email into the db
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User is not register , please signup..."
            });
        }
        // create Token
        const token = crypto.randomUUID();

        // make entry in db for token and expire time
        const updateDetails = await User.findOneAndUpdate(
            {email},
            {
                token,
                resetPasswordExpires:Date.now() + 5*60*1000
            },
            {
                new:true
            }
        );
        // create url for reset password
        const url = `http://localhost:5173/update-password/${token}`;
        // send mail for reset password
        await mailSender(email,"Password Reset Link",`Link for the reseting your password -> ${url}`);
        // send successfull resopnce
        res.status(200).json({
            success:true,
            message:"Reset Password link send successfully to your email..."
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some issue in sending the mail for reset password..."
        })
    }
}

// Reset Password Controller
exports.resetPassword = async(req,res)=>{
    try {
        // fetch the data from request body
        const{password,confirmPassword,token} = req.body;
        
        // validation 
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password must be same...Please check the password in both feilds..."
            });
        };
        // get user detail using token
        const userDetails = await User.findOne({token});

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid..."
            });
        };
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token is expire ,Please generate the token again..."
            });
        };

        // hashed the password
        const hashedPassword = await bcrypt.hash(password,10);
        // update the password in database
        await User.findOneAndUpdate(
            {token},
            {password:hashedPassword},
            {new:true}
        );
        // send successfull responce
        res.status(200).json({
            success:true,
            message:"Your password is reset successfully..."
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Issue in reseting the password..."
        });
    }
}