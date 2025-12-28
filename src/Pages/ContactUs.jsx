import { TiMessages } from "react-icons/ti";
import { TiWorld } from "react-icons/ti";
import { FaPhoneVolume } from "react-icons/fa6";
import ContactUsForm from "../components/common/ContactUsForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const ContactUs = () => {
  return (
    <div>
      <div className="w-11/12 max-w-[1260px] mx-auto mb-24">
        <div className="lg:flex justify-center items-center gap-32 text-white mt-[120px]">
          {/* left-side */}
          <div className="flex flex-col gap-10 items-center justify-center h-[450px] bg-richblack-600 py-5 px-6 mb-10 rounded-md">
            <div className="flex justify-start items-center gap-6">
              <TiMessages fontSize={32} />
              <div className="text-richblack-100">
                <p className="text-lg font-semibold">Chat on us</p>
                <p>Our friendly team is here to help . @gmail address .</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <TiWorld fontSize={32} />
              <div className="text-richblack-100">
                <p className="text-lg font-semibold">Visit us</p>
                <p>Our friendly team is here to help . @gmail address .</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-5">
              <FaPhoneVolume fontSize={30} />
              <div className="text-richblack-100">
                <p className="text-lg font-semibold">Call us</p>
                <p>Mon - Fri From 8am to 5pm +91-7985737900 .</p>
              </div>
            </div>
          </div>

          {/* right-side */}
          <div>
            <ContactUsForm />
          </div>
        </div>

        <div>
          <p className="text-center text-white text-4xl font-semibold mt-10 mb-5">
            Review From Other Learners
          </p>
          <ReviewSlider />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
