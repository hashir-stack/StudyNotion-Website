import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPasswordResetToken } from "../services/opreations/authAPI";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";


const ForgotPassword = () => {
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state)=> state.auth);

    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
        console.log(email);
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
            ) : (
                <div className="text-white w-full h-full flex flex-col  justify-center items-center gap-5 mt-[150px]">
                    <h1 className="text-5xl font-bold text-center">
                        {
                        !emailSent ? "Reset Your Password" :"Check Your Email" 
                        }
                    </h1>

                    <p className="text-richblack-200 text-lg py-5 px-4 text-center font-semibold w-[50%]">
                        {
                            !emailSent ? "Have no fear . We will email you instructions to reset your password . If you don't have access to your email we can try account recovery ."
                             :
                             `We have sent the reset eamil  to ${email} .`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 justify-center items-center">
                        {
                            !emailSent && (
                                <label>
                                    <p className="text-md font-bold mb-2">Email Address<sup className="text-red-600 font-bold">*</sup></p>
                                    <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address . . ."
                                    className="lg:w-xl md:w-xl w-[350px] h-10 p-5 font-bold text-xl sm:px-0 border placeholder:p-2 rounded-md font-sans"
                                    />
                                </label>
                            )
                        }
                        <button type="submit" className="bg-yellow-200 w-fit text-xl h-fit text-richblack-900 py-2 px-3 font-bold rounded-lg cursor-pointer font-sans">
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div >
                        <NavLink to={"/login"} className="flex items-center font-sans gap-2">
                        <LiaLongArrowAltLeftSolid fontSize={24}/>
                            <p>Back to Login</p>
                        </NavLink>    
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword;