import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tab from "../common/Tab";

import { sendOtp } from "../../services/opreations/authAPI";
import { setSignupData } from "../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../utils/constants"


const SignupForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const { firstName, lastName, email, password, confirmPassword } = formData

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    toast.error("Password Not Match ...");
      return;
    }

    const signupData = {
      ...formData,accountType
    }
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
    // console.log(signupData);
    toast.success("Sign Up Sucessfully...");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

   // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <>
      <div>
       {/* Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        <form onSubmit={handleFormSubmit} className="">
          <div className="lg:flex justify-between gap-x-4 mt-[10px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                First Name <sup className="text-pink-600">*</sup>
              </p>
              <input
                className="bg-richblack-800 rounded-[0.5rem] text-gray-50 w-full p-[12px] border-b-2 border-b-white"
                autoComplete="on"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your First name"
              />
            </label>

            <label className="w-full">
              <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                Last Name <sup className="text-pink-600">*</sup>
              </p>
              <input
                className="bg-richblack-800 rounded-[0.5rem] text-gray-50 w-full p-[12px] border-b-2 border-b-white"
                autoComplete="on"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Enter your Last name"
              />
            </label>
          </div>

          <div className="mt-[10px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                E-Mail Address <sup>*</sup>
              </p>
              <input
                className="bg-richblack-800 rounded-[0.5rem] text-gray-50 w-full p-[12px] border-b-2 border-b-white"
                autoComplete="on"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your E-mail address"
              />
            </label>
          </div>

          <div className="lg:flex gap-x-4 mt-[10px]">

            <label className="w-full relative">
              <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                Password <sup>*</sup>
              </p>
              <div className="flex">
                <input
                  className="bg-richblack-800 rounded-[0.5rem] text-gray-50 w-full p-[12px] border-b-2 border-b-white"
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Password"
                />

                <span
                  className="absolute top-10 right-[15px]" 
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>}
                </span>
              </div>
            </label>

            <label className="w-full relative">
              <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                Confirm Password <sup>*</sup>
              </p>
              <div className="flex">
                <input
                  className="bg-richblack-800 rounded-[0.5rem] text-gray-50 w-full p-[12px] border-b-2 border-b-white"
                  type={showConfirmPwd ? "text" : "password"}
                  autoComplete="on"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Password"
                />

                <span 
                className="absolute top-10 right-[15px]"
                onClick={() => setShowConfirmPwd((prev) => !prev)}>
                  {showConfirmPwd ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </label>

          </div>

          <button
            className="w-full bg-yellow-400 mt-5 rounded-[8px] font-medium p-2 cursor-pointer "
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;