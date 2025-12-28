import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/opreations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailSidebar from '../components/core/ViewCourse/VideoDetailSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const{courseId} = useParams();
    const{token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async () =>{
            const courseData = await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0 ;
            courseData?.courseDetails?.courseContent?.forEach((sec)=> lectures+= sec.subSection?.length || 0);
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[courseId, token]);


    const[reviewModal,setReviewModal] = useState(false);

  return (
    <>
        <div>
            <VideoDetailSidebar setReviewModal={setReviewModal}/>
            <div>
                <Outlet/>
            </div>
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse;