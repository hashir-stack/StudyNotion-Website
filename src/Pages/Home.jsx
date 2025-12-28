import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import HighLightText from "../components/core/Homepage/HighLightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLangSec from "../components/core/Homepage/LearningLangSec";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="w-11/12 relative mx-auto flex flex-col max-w-[1000px] items-center text-white justify-between px-4 sm:px-6 lg:px-0">
        <NavLink to="/signUp">
          <div className="group mt-10 sm:mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full px-6 sm:px-10 py-[5px] group-hover:bg-richblack-900">
              <p className="">Become An Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </NavLink>

        <div className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-5 sm:mt-7">
          Empower Your Future with
          <HighLightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-full sm:w-[90%] text-center text-sm sm:text-base md:text-lg font-bold text-richblack-300 px-2 sm:px-0">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 sm:mt-8">
          <CTAButton active={true} linkto={"/signUp"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="shadow-2xl shadow-blue-500/50 mx-2 sm:mx-3 my-8 sm:my-12">
          <video muted loop autoPlay className="w-full rounded-lg">
            <source src={Banner} />
          </video>
        </div>

        {/*code-section-1  */}
        <div>
          <CodeBlocks
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighLightText text={" Coding Potential "} />
                with our online courses .
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctaBtn1={{
              btnText: "Try it Yourself",
              linkto: "/signUp",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeBlocks={`<!DOCTYPE html>\n<html>\n<head>\n<title> Example </title>\n<link rel="stylesheet" href="styles.css" /> \n</head>\n<body>\n<h1>\n<a href="/" > Header </a>\n</h1>\n<nav>\n<a href="one/"> One </a>\n<a href="two/"> Two </a>\n<a href="three/"> Three </a>\n</nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/*code-section-2 */}
        <div>
          <CodeBlocks
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighLightText text={" Coding in a seconds"} /> .
              </div>
            }
            subHeading={
              " Go ahead , give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson . Go ahead and enroll your seats today for the amazing coding journey . "
            }
            ctaBtn1={{
              btnText: "Continue Lesson",
              linkto: "/signUp",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeBlocks={`<!DOCTYPE html>\n<html>\n<head>\n<title> Example </title>\n<link rel="stylesheet" href="styles.css" /> \n</head>\n<body>\n<h1>\n<a href="/" > Header </a>\n</h1>\n<nav>\n<a href="one/"> One </a>\n<a href="two/"> Two </a>\n<a href="three/"> Three </a>\n</nav>`}
            codeColor={"text-blue-50"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 mt-24">
        <div className="homepageBg h-[333px]">
          <div className="w-11/12 max-w-max flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="text-white flex gap-7">
              <CTAButton active={true} linkto={"/signUp"}>
                <div className="flex gap-3 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signUp"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-[1260px] mx-auto gap-7 flex flex-col     items-center">
          <div className="flex gap-10 mb-10 mt-[95px]">
            <div className="text-4xl font-bold w-[45%]">
              Get the skill you need for a
              <HighLightText text={" job that in demand ."} />
            </div>

            <div className="flex flex-col items-start gap-10 w-[40%]">
              <div className="text-[18px] font-bold font-edu-sa">
                The modern StudyNotion is the dictates its own terms . Today ,
                to be a competitive specialist requires more than professional
                skills .
              </div>

              <CTAButton active={true} linkto={"/signUp"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLangSec />
        </div>
      </div>
      {/* section 3 */}

      <div className="w-11/12 mx-auto max-w-[1260px] flex flex-col items-center justify-between gap-6 sm:gap-8 bg-richblack-900 text-white mb-5 px-4">
        <InstructorSection />
        <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mt-6 sm:mt-10">Review From Other Learners</p>
        <ReviewSlider/>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
