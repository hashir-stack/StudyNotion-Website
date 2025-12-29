const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Auth Middleware
// exports.auth = async (req, res, next) => {
//   try {
//         const authHeader = req.headers["authorization"];

//         const token =
//         req.body?.token ||
//         req.cookies?.oken ||
//         // req.header("Authorization")?.replace("Bearer ", "");
//         (authHeader && authHeader.split(" ")[1]);




//         if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Token is missing. Please generate a new token.",
//         });
//         }

//         try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decode);
//         req.user = decode;
//         } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token...",
//         });
//         }

//         next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Some Issue in validating token...",
//     });
//   }
// };
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token =
      req.body?.token ||
      req.cookies?.Token ||
      (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing. Please log in again.",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decode);
      req.user = decode;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please log in again.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid Token. Please log in again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while validating token.",
    });
  }
};


// IsStudents Middleware
exports.IsStudent = async ( req,res, next )=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This route is only for Students..."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't be verified, please try again..."
        })
    }
}

// IsAdmin Middleware
exports.IsAdmin = async ( req , res , next )=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This route is only for Admin..."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't be verified, please try again ..."
        })
    }
}

// IsInstructor Middleware
exports.IsInstructor = async ( req , res , next )=>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This route is only for Instructor..."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't be verified , please try again..."
        });
    }
}

