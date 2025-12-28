import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../../components/common/IconBtn";
import { createRating } from "../../../services/opreations/courseDetailsAPI";
import { MdStar } from "react-icons/md";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseRating: 0,
      courseExperience: "",
    },
  });

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  const ratingChnage = (newRating) => {
    setRating(newRating);
    setValue("courseRating", newRating);
  };

  return (
    <div className="text-white">
      <div>
        {/* modal header */}
        <div>
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}>X</button>
        </div>

        {/* modal body */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="User Image"
              className="aspect-square w-[50px] rounded-full object-cover"
            />

            <div>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <div className="border border-red-500">
              <ReactStars
                count={5}
                value={4.2}
                onChange={ratingChnage}
                size={24}
                activeColor="#ffd700"
                emptyIcon={<MdStar />}
                fullIcon={<MdStar />}
              />
            </div>

            <div>
              <label htmlFor="courseExperience">
                Add Your Experience<sup className="text-red-600">*</sup>
              </label>
              <textarea
                placeholder="Add Your Expreience here..."
                id="courseExperience"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="text-pink-600">
                  Please add your Expreience
                </span>
              )}
            </div>

            <div>
              {/* cancle and save button */}

              <button onClick={() => setReviewModal(false)}>Cancle</button>

              <div>
                <IconBtn text={"Save"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
