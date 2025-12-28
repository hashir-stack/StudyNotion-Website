const User = require("../models/user");
const OTP = require("../models/otp");
const Profile = require("../models/profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailsender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const {emailTemplate} = require("../mail/templates/emailVerificationTemplates");
require("dotenv").config();

// send otp controller
exports.sendOTP = async (req, res) => {
  try {
    // fetch the email from req body
    const { email } = req.body;
    // check user already exist
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "Can't Send OTP user already register...",
      });
    }
    // generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated :", otp);

    // check for the unique otp and also doesn't exist in db
    let result = await OTP.findOne({otp});
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({otp});
    }
    // save the otp in the db
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    const otpEmail = await mailSender(email,
      emailTemplate(otpBody)
    );
    // console.log(otpEmail);

    // send successfull responce
    res.status(200).json({
      success: true,
      message: "OTP send Successfully...",
      data: otpBody,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Can't send OTP ( Internal Server Error)",
    });
  }
};

// signup Controller
exports.signUp = async (req, res) => {
  try {
    // fetch the data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNo,
      otp,
    } = req.body;

    // Validation for signup
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required feild...",
      });
    }

    // if password does not match
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password doesn't match...",
      });
    }

    // if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist...",
      });
    }

    // find the most recent otp from db
    let recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(recentOTP);
    // validation for otp
    if (recentOTP.length == 0) {
      return res.status(401).json({
        success: false,
        message: "OTP not found...",
      });
    } else if (otp !== recentOTP[0].otp) {
      return res.status(401).json({
        success: false,
        messaage: "Invalid OTP...",
      });
    }
    // bcrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the data into database
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNo: null,
      about: null,
    });

    const responce = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      accountType,
      contactNo,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    // send successfull responce
    res.status(200).json({
      success: true,
      data: responce,
      message: "User sign-up successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can't signup right now...Please try again...",
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    // fetch the data from request body
    const { email, password } = req.body;

    // validations

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required feild...",
      });
    }
    // check the user is register or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not register...Please Signup...",
      });
    }
    // checking the password and generating the jwt token
    if( await bcrypt.compare(password,user.password) ){
        const payLoad = {
            accountType:user.accountType,
            email:user.email,
            id:user._id
        };

        const token = jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        user.token = token;
        user.password = undefined;
        // creating the cookie and send responce
        const options={
            expires: new Date( Date.now() + 3*24*60*60*1000 ),
            httpOnly:true
        }
        res.cookie("Token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:" User logedin successfully..."
        });
    }else{
        return res.status(401).json({
            success:false,
            message:" Incorrect password..."
        })
    }
  } catch (error) {
    res.status(500).json({
        success:false,
        message:" Can't Login right now please try again..."
    })
  }
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
