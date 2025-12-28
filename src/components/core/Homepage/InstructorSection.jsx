import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "./CTAButton";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16 mb-16">
      <div className="lg:flex gap-20 items-center">
        <div className="w-[60%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-xl shadow-amber-200 mb-10"
          />
        </div>

        <div className="flex flex-col gap-10 ">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighLightText text={" Instructor "} />
          </div>

          <div className="font-bold text-[16px] text-richblack-300 w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion . We provide the tools and skills to teach what you love
            .
          </div>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signUp"}>
              <div className="flex gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
