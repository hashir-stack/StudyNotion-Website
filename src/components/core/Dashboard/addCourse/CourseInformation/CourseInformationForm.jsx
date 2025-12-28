import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/opreations/courseDetailsAPI";
import RequirementFeild from "./RequirementFeild";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import ChipInput from "../ChipInput";
import Upload from "../Upload";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
     // if form is in edit mode
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits", course.whatUlearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle != course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatUlearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  // handle next button
  const onSubmit = async (data) => {
    // console.log(data);
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if(currentValues.courseTags.toString() !== course.tag.toString()){
            formData.append("tag",JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatUlearn) {
          formData.append("whatUlearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        console.log(result, "result");
        console.log(course, "course");
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        setLoading(true);
        toast.error("No Changes Made to the Form . . .");
        setLoading(false);
      }
    } else {
    }
    // create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatUlearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage",data.courseImage);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
        {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg text-richblack-5" htmlFor="courseTitle">
          {" "}
          Course Title <sup className="text-red-500">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter course title . . ."
          className="form-style w-full bg-richblack-700 p-2 rounded-md placeholder:text-richblack-300 text-white text-lg"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span className="text-pink-200 ml-2 text-xs tracking-wide">
            Course Title is Required**
          </span>
        )}
      </div>

        {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-red-500">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          className="form-style resize-x-none min-h-[130px] w-full bg-richblack-700 p-2 rounded-md placeholder:text-richblack-300 text-white text-lg"
          placeholder="Enter Description . . ."
          {...register("courseShortDesc", { required: true })}
        />
        {errors.courseShortDesc && (
          <span className="text-pink-200 ml-2 text-xs tracking-wide">
            Course Description is Required**
          </span>
        )}
      </div>

        {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg text-richblack-5"  htmlFor="coursePrice">
          Course Price <sup className="text-red-500">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="9 9 9"
            className="form-style w-full !pl-12 p-2 rounded-md bg-richblack-700 placeholder:text-richblack-300 text-white text-lg"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required**</span>
        )}
      </div>

        {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg text-richblack-5" htmlFor="courseCategory">
          Course Category<sup className="text-red-500">*</sup>
        </label>
        <select
          className="form-style w-full p-2 rounded-md bg-richblack-700 placeholder:text-richblack-300 text-white text-lg"
          name="courseCategory"
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is Required **
          </span>
        )}
      </div>

       {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

         {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg text-richblack-5" htmlFor="courseBenefits">
          Benefits Of the Course<sup className="text-red-500">*</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          placeholder="Enter the benefits of the course . . ."
          className="form-style resize-x-none min-h-[130px] w-full  bg-richblack-700 p-2 rounded-md placeholder:text-richblack-300 text-white text-lg"
          {...register("courseBenefits", { required: true })}
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required **
          </span>
        )}
      </div>

      <RequirementFeild
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-richblack-300"
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
};

export default CourseInformationForm;
