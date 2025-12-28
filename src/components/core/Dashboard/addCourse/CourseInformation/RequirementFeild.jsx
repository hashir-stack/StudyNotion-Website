import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementFeild = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course)

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const updateRequirementList = [...requirementList];
    updateRequirementList.splice(index, 1);
    setRequirementList(updateRequirementList);
  };

  useEffect(()=>{
    if (editCourse) {
      setRequirementList(course?.instructions)
    }
    register(name,{required:true,validate:(value)=>value.length > 0})
  },[]);

  useEffect(()=>{
    setValue(name,requirementList)
  },[requirementList]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg text-richblack-5" htmlFor={name}>
        {label}
        <sup className="text-red-500">*</sup>
      </label>
      <div>
        <input
          name={name}
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full p-2 rounded-md bg-richblack-700 placeholder:text-richblack-300 text-white text-lg"
          placeholder="Add the Requirements of the course . . ."
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-black p-2 bg-yellow-50 rounded-md mt-5 cursor-pointer"
        >
          Add
        </button>
      </div>
      {
        requirementList.length > 0 && (
            <ul className="mt-2 list-inside list-disc">
                {requirementList.map((requirement,index)=>(
                    <li key={index} className="flex justify-between items-center text-richblack-5">
                        <span>{requirement}</span>
                        <button 
                        type="button" 
                        onClick={()=>handleRemoveRequirement(index)}
                        className="ml-2 text-xs text-pure-greys-300 "
                        >Clear</button>
                    </li>
                ))}
            </ul>
        )
      }
      {errors[name] && (<span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required **</span>)}
    </div>
  );
};

export default RequirementFeild;
