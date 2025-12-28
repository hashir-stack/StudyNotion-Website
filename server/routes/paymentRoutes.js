const express = require("express");
const router = express.Router();

// importing the payment controllers
const {capturePayment,verifySignature,sendPaymentSuccessEmail} = require("../controllers/patmentController");
// importing the middlewares
const {auth,IsStudent} = require("../middlewares/authMdw");

// defining the routes
router.post("/capturePayment" , auth , IsStudent , capturePayment);
router.post("/verifySignature" , auth , IsStudent , verifySignature);
router.post("/sendPaymentSuccessEmail", auth, IsStudent,sendPaymentSuccessEmail);

// exporting the route
module.exports = router;