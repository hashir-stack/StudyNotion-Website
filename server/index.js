const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const port = process.env.PORT || 4000;

// importing the db config
const dbConnect = require("./config/database");
// importing the cloudinary config
const {cloudinaryConnect} = require("./config/cloudinary");

// importing the routes
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const courseRoutes = require("./routes/courseRoutes");


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp/",
	})
);

//db Connection 
dbConnect();

//cloudinary connection
cloudinaryConnect();

// routes mounting
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

// activate the server
if(process.env.NODE_ENV !== "production"){
  server.listen(port, () => {
  console.log(`Server is successfully running on ${port}...`);
  });
}