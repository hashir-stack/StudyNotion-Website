import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/opreations/authAPI";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { IoRefreshCircleSharp } from "react-icons/io5";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!signupData) {
      navigate("/signUp");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div>
      {loading ? (
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
          <h1 className="text-4xl font-bold text-center">Verify Email</h1>
          <p className="text-richblack-200 text-lg py-5 px-4 text-center font-semibold w-[50%]">
            A verification code has been sent to you . Enter the code below .
          </p>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-5 justify-center items-center"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "45px",
                height: "45px",
                margin: "1px 8px",
                fontSize: "25px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                textAlign: "center",
                fontWeight:"bold"
              }}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                padding:"0 7px"
              }}
            />
            <button
              type="submit"
              className="bg-yellow-200 w-fit text-xl h-fit text-richblack-900 py-2 px-3 font-bold rounded-lg cursor-pointer font-sans"
            >
              Verify Email
            </button>
          </form>

          <div className="flex flex-col gap-5 justify-between w-[30%] items-center">
            <div>
              <NavLink
                to={"/login"}
                className="flex items-center font-sans gap-2"
              >
                <LiaLongArrowAltLeftSolid fontSize={30} />
                <p className="text-lg font-semibold">Back to login</p>
              </NavLink>
            </div>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IoRefreshCircleSharp fontSize={35} />
              <p className="text-lg font-semibold ">Resend OTP</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
