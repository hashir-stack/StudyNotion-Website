import React from "react";
import HighLightText from "./HighLightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_other from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLangSec = () => {
  return (
    <div className="mt-[130px] mb-28">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss knife for
          <HighLightText text={" learing any language "} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base mt-3 font-bold w-[70%]">
          Using spin making learning multiple languages easy with 20+ languages
          realistic voice-over , progress tracking , customschedule and more .
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-5 gap-6 md:gap-0">
          <img
            src={know_your_progress}
            alt="know_your_progress"
            className="object-contain md:-mr-32 w-[250px] md:w-auto"
          />
          <img
            src={compare_with_other}
            alt="know_your_progress"
            className="object-contain w-[250px] md:w-auto"
          />
          <img
            src={plan_your_lessons}
            alt="know_your_progress"
            className="object-contain md:-ml-36 w-[250px] md:w-auto"
          />
        </div>

        <div className="w-fit flex mt-6 ">
          <CTAButton active={true} linkto={"/signUp"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLangSec;
