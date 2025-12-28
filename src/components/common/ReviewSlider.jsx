import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import ReactStars from "react-rating-stars-component";
import { MdStar } from "react-icons/md";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      console.log("Review Response =>", data);

      if (data?.success) {
        setReviews(data?.data);
      }
      // console.log(" reviews=> " , reviews);
    };
    fetchAllReviews();
  }, []);

  useEffect(() => {
    console.log("Updated reviews =>", reviews);
  }, [reviews]);

  return (
    <div className="text-white">
      <div className="h-auto w-full max-w-screen-lg mx-auto">
        <Swiper
           style={{ height: "200px",width:"1100px" }}  
          slidesPerView={3}
          loop={true}
          spaceBetween={10}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="bg-richblack-800 p-1 rounded-3xl  text-center ">
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                }
                alt="Profile Pic"
                className="h-14 w-14 object-cover rounded-full mx-auto"
              />
              <p className="mb-1">
                {review?.user?.firstName} {review?.user?.lastName}
              </p>
              <p className="text-red-400 bg-gray-800 font-bold"><span className="text-yellow-50 font-sans">Course :</span> {review?.course?.courseName}</p>
              <p className="py-2">{review?.review}</p>
              {/* <p>{review?.rating.toFixed(1)}</p> */}
              {/* <ReactStars
                count={5}
                value={review?.rating}
                edit={false}
                size={20}
                activeColor="#ffd700"
                emptyIcon={<MdStar />}
                fullIcon={<MdStar />}
              /> */}
              <p className=" mb-5">⭐⭐⭐⭐⭐</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
