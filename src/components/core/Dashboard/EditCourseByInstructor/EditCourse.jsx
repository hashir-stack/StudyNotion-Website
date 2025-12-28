import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../addCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/opreations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

const EditCourse = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();

  useEffect(()=>{
    const populateCourseDetail = async () =>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId,token);

        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }
        setLoading(false);
    }
    populateCourseDetail();
  },[])

  if (loading) {
    return (
      <div className="spinner mt-[150px] ml-[50%]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className="text-white px-4 md:px-0">
      <p className="mb-10 md:mb-14 text-2xl md:text-3xl font-medium text-richblack-5 text-center md:text-lef">Edit Course</p>
      <div className="mx-auto w-full max-w-[500px] md:max-w-[600px]">{course ? <RenderSteps /> : <p className="mt-10 md:mt-14 text-center text-xl md:text-3xl font-semibold text-richblack-100">Course Not Found . . . 😒 </p>}</div>
    </div>
  );
};

export default EditCourse;
