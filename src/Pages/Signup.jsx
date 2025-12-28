import Template from "../components/auth/Template";
import SignUpImg from "../assets/Images/signup.webp";

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={SignUpImg}
      formType="signup"
    />
  )
}

export default Signup;