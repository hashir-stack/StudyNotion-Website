import { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {createSection, updateSection} from "../../../../../services/opreations/courseDetailsAPI";
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { setCourse , setEditCourse, setStep } from '../../../../../slices/courseSlice';

const CourseBuilderForm = () => {

  const{course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const {register,handleSubmit,setValue,formState:{errors}}= useForm();
  const[loading,setLoading] = useState(false);
  const[editSectionName,setEditSectionName] = useState(null);

  // cancle button function
  const cancleEdit = () =>{
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  // goBack button function
  const goBack =()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // goToNext button function
  const goToNext = () =>{
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section...")
    }

    if(course.courseContent.some((section)=>section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section ...")
    }

    dispatch(setStep(3));
  }

  // Form submit function
  const onSubmit = async (data)=>{
    setLoading(true);
    let result;

    if(editSectionName){
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        },token
      )
    }else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token)
    }
    // update the values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }
    setLoading(false);
    console.log(result)
  }

  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSectionName === sectionId){
      cancleEdit();
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (
    <div cclassName="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-4 md:p-6">
      <p className="text-xl md:text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-col space-y-2'>
          <label className="text-sm text-richblack-5 mt-3 md:mt-5" htmlFor="sectionName">Section Name<sup className='text-red-500'>*</sup></label>
          <input 
          type="text" 
          id='sectionName'
          className='bg-richblack-700 form-style w-full text-white px-3 py-2 rounded-md'
          placeholder='Add a section to build your course . . .'
          {...register("sectionName",{required:true})}
          />
          {errors.sectionName && (<span className="ml-2 text-xs tracking-wide text-pink-200">Section name is required **</span>)}
        </div>

        <div className='flex items-end gap-x-4'>
          <IconBtn
          type="Submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          >
            <IoMdAddCircleOutline fontSize={20} className='inline-flex ml-3 text-center text-yellow-50' />
          </IconBtn>
          
        {editSectionName && (
          <button
          type='button'
          onClick={cancleEdit}
          className='text-sm text-richblack-300 underline'
          >
            Cancle Edit
          </button>
        )}

        </div>
      </form>

      {course.courseContent.length > 0 && (<NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>)}

      <div className='flex justify-end gap-x-3'>
        <button onClick={goBack} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
          Back
        </button>
        <div onClick={goToNext}>
          <IconBtn text={"Next"} disabled={loading}>
          <MdOutlineArrowRight className='inline-flex' fontSize={30} />
        </IconBtn>
        </div>
      </div>

    </div>
  )
}

export default CourseBuilderForm;