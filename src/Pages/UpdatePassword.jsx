import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/opreations/authAPI";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { VscEye , VscEyeClosed  } from "react-icons/vsc";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import toast from "react-hot-toast";


const UpdatePassword = () => {
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const[showPassword,setShowPassword] = useState(false);
    const[confirmShowPassword,setConfirmShowPassword] = useState(false);
    const[formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    });

    const{password,confirmPassword} = formData

    const handleOnChange = (e)=>{
        const{name,value}= e.target;
        setFormData((prevData) => ( {...prevData,
            [name]:value
        } ) );
    };

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        
        if(password !== confirmPassword){
            return toast.error("Password must be same...")
        }

        dispatch( resetPassword(password,confirmPassword,token,navigate) )
    }

  return (
    <div>
        {
            loading ? (
            <div className="spinner mt-[150px] ml-[50%]">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        ) 
            : 
            (
                <div className="text-white w-full h-full flex flex-col  justify-center items-center gap-5 mt-[150px]">

                    <h1 className="text-4xl font-bold text-center">Choose New Password</h1>
                    <p className="text-richblack-200 text-lg py-5 px-4 text-center font-semibold w-[50%]">Almost done . Enter new password and you are all set to Login 😉</p>

                    <form onSubmit={handleOnSubmit}  className="flex flex-col gap-5 justify-center items-center">

                        <label>
                            <p className="text-md font-bold mb-2">New Password <sup className="text-red-600 font-bold">*</sup></p>
                            <input
                            required 
                            autoComplete="on" 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your New Password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            className="lg:w-xl md:w-xl w-[350px] h-10 p-5 font-bold text-xl sm:px-0 border placeholder:p-2 rounded-md font-sans"
                            />
                            <span onClick={()=>setShowPassword((prev)=> !prev)} className="inline-flex m-2">
                                {
                                    showPassword ? <VscEye fontSize={24} /> : <VscEyeClosed fontSize={24} /> 
                                }
                            </span>
                        </label>

                        <label>
                            <p className="text-md font-bold mb-2">Confirm New Password <sup className="text-red-600 font-bold">*</sup></p>
                            <input
                            required
                            autoComplete="on" 
                            type={confirmShowPassword ? "text" : "password"}
                            placeholder="Enter Your New Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className="lg:w-xl md:w-xl w-[350px] h-10 p-5 font-bold text-xl sm:px-0 border placeholder:p-2 rounded-md font-sans"
                            />
                            <span onClick={()=>setConfirmShowPassword((prev)=> !prev)} className="inline-flex m-2">
                                {
                                    confirmShowPassword ?<VscEye fontSize={24} /> : <VscEyeClosed fontSize={24} />
                                }
                            </span>
                        </label>

                        <button type="submit" className="bg-yellow-200 w-fit text-xl h-fit text-richblack-900 py-2 px-3 font-bold rounded-lg cursor-pointer font-sans">
                            Reset Password
                        </button>
                    </form>

                    <div>
                        <NavLink to={"/login"} className="flex items-center font-sans gap-2">
                                <LiaLongArrowAltLeftSolid fontSize={24}/>
                                <p>Back to login</p>
                        </NavLink>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword
