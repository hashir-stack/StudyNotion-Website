import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/opreations/courseDetailsAPI";
import { getInstructorData } from "../../../services/opreations/profileAPI";
import { NavLink } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorApi = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApi.length) {
        setInstructorData(instructorApi);
      }

      if (result) {
        setCourses(result);
      }

      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  useEffect(() => {
    console.log("Courses => ", courses);
    console.log("Instructor Api Data => ", instructorData);
  }, [courses, instructorData]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

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
    <div className="text-white">
      <div className="space-y-2">
        <p className="text-2xl font-bold text-richblack-5">
          Hey , {user.firstName} {user.lastName} 👋
        </p>
        <p className="font-medium text-richblack-200">Let's Start Something New</p>
      </div>

      {courses.length > 0 ? (
        <div className="md:flex md:flex-col">
          <div className="md:flex md:flex-col">
            <div className="flex flex-col lg:flex-row justify-between items-center mt-10 space-y-6 lg:space-y-0 lg:space-x-4 h-auto lg:h-[450px] my-4">
              <InstructorChart courses={instructorData}/>

              <div className="w-full lg:w-[50%] h-[350px] min-w-[250px] flex flex-col bg-richblack-800 p-6 rounded-2xl">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>

                <div className="mt-4 space-y-4">
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">{courses.length}</p>
                </div>

                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                </div>

                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">Rs. {totalAmount}</p>
                </div>

              </div>

            </div>

          </div>

          <div className=" rounded-2xl px-5 py-5 mt-24 bg-richblack-800 p-6">
            {/* render 3 courses */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <NavLink to={"/dashboard/my-courses"}>
              <p className="text-xs font-semibold text-yellow-50">View All</p>
              </NavLink>
            </div>

            <div className="lg:flex gap-x-10 justify-center items-center my-4  space-x-6">
              {courses.slice(0,3).map((course,i)=>(
                <div key={i}
                className="w-full lg:w-1/3 m-3"
                >
                  <img 
                  src={course.thumbnail} 
                  alt="course thumbnail"
                  className="h-[201px] w-full rounded-md object-contain"
                  />
                  <div className="lg:flex lg:flex-col justify-center items-center mt-3 w-full">
                    <p className="text-lg font-semibold text-richblack-50">{course.courseName}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-md font-medium text-richblack-300">{course.studentEnrolled.length} ( Students )</p>
                      <p className="text-xs font-medium text-richblack-300">||</p>
                      <p className="text-xs font-medium text-richblack-300">Rs.{course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You Haven't Created Any Course Yet ....
          </p>
          <NavLink to={"/dashboard/add-course"}>
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">Create a Course</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
