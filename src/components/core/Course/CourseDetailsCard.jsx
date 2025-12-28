import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Your can't buy the course , You are an Instructor");
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You Are Not Logged-In",
      text2: "Login to add this course to your cart ... ",
      btn1Text: "Login",
      btn2Text: "Cancle",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
    >
      <img
        src={ThumbnailImage}
        alt="thumbnail"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      <div className="px-4"> 

        <div className="space-x-3 pb-4 text-3xl font-semibold">Rs. {CurrentPrice}</div>

      
        <div className="flex flex-col gap-4">
          <button
            className="bg-yellow-50 text-black w-fit px-3 py-2 rounded-lg"
            onClick={
              user &&
              Array.isArray(course?.studentsEnrolled) &&
              course.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user &&
            Array.isArray(course?.studentsEnrolled) &&
            course.studentsEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>

          {!(
            Array.isArray(course?.studentsEnrolled) &&
            course.studentsEnrolled.includes(user?._id)
          ) && (
            <button
              className="bg-yellow-50 text-black w-fit px-3 py-2 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>

        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>
          <p  className={`my-2 text-xl font-semibold `}>This Course Includes :</p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, index) => (
              <p key={index} className="flex gap-2">
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 p-6 bg-yellow-50 cursor-pointer text-black rounded-2xl font-bold font-sans"
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
