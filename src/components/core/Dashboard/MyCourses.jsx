import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/opreations/courseDetailsAPI';
import IconBtn from "../../common/IconBtn";
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    const[courses,setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async () =>{
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])


  return (
    <div className='text-white'>
        <div  className="mb-14 flex items-center justify-between">
            <p className="text-3xl font-medium text-richblack-5 font-sans">My Courses</p>
            <div onClick={()=>navigate("/dashboard/add-course")}>
                <IconBtn text={"Add Course + "}/>
            </div>
        </div>

        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses;