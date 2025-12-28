import React from "react";
import HighLightText from "../components/core/Homepage/HighLightText";
import AboutBanner1 from "../assets/Images/aboutus1.webp";
import AboutBanner2 from "../assets/Images/aboutus2.webp";
import AboutBanner3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/aboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Footer from "../components/common/Footer";
import StatsComponent from "../components/core/aboutPage/StatsComponent";
import LearningGrid from "../components/core/aboutPage/LearningGrid";
import ContactFormSection from "../components/core/aboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div>
      {/* section - 1 */}
      <section className="bg-richblack-700">
        <header className="text-white text-center pt-14 text-4xl px-5 py-4 font-bold">
          Driving Innovation in Online Education for a
          <HighLightText text={" Brighter Future "} />
        </header>
        <p className="text-lg text-center text-richblack-200 p-2 font-semibold font-sans">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses , leveraging emerging technologies , and
          nurturing a vibrant learning community
        </p>

        <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
          <img
            src={AboutBanner1}
            alt="AboutBanner1"
            className="shadow-2xl shadow-richblue-300"
          />
          <img
            src={AboutBanner2}
            alt="AboutBanner2"
            className="shadow-2xl shadow-richblue-300"
          />
          <img
            src={AboutBanner3}
            alt="AboutBanner3"
            className="shadow-2xl shadow-richblue-300"
          />
        </div>
      </section>

      {/* section -2 */}
      <section className="w-11/12 max-w-[1260px] mx-auto">
        <div>
          <Quote />
        </div>
      </section>

      {/* section - 3 */}
      <section className="w-11/12 max-w-[1260px] mx-auto">
        <div className="flex flex-col">
          {/* Founding Story Box */}
          <div className="lg:flex w-[100%] justify-between items-center">
            {/* Founding story left box */}
            <div className="text-richblack-500 w-[40%] mx-auto">
              <p className="text-3xl font-bold p-2">Our Founding Story</p>

              <p className="font-semibold">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world
              </p>

              <p className="font-semibold mt-5">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            {/* Founding Story right box */}
            <div className="flex justify-center items-center">
              <img
                src={FoundingStory}
                alt="FoundingStory"
                className="w-[400px] h-[400px] object-contain"
              />
            </div>
          </div>

          {/* Vision and Mission div */}
          <div className="flex w-[100%] justify-between items-center">
            {/* left box */}
            <div className="text-richblack-500 w-[40%] mx-auto">
              <p className="text-3xl font-bold p-2">Our Vision</p>
              <p className="font-semibold">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience
              </p>
            </div>
            {/* right box */}
            <div className=" w-[40%] text-richblack-500">
              <p className="text-3xl font-bold p-2">Our Mission</p>
              <p className="font-semibold">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section - 4 */}
      <StatsComponent />

      {/* section -5 */}
      <section className="w-11/12 max-w-[1260px] mx-auto">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* section -6 */}
      <section className="w-11/12 max-w-[1260px] mx-auto mt-10 mb-10">
        <div>
          <p className="text-white text-center text-4xl py-5 px-4 font-semibold">
            Reveiws from Other Learners
          </p>
          <ReviewSlider />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
