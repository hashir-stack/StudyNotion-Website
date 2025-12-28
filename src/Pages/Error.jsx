import ErrorPage from "../assets/Images/ErrorPage.jpg";

const Error = () => {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col bg-richblack-800 mt-16 gap-5 mb-5'>
        <img src={ErrorPage} alt="error page" className="lg:w-[450px] lg:h-[450px] object-contain rounded-full shadow-2xl shadow-blue-500 animate-pulse transition-all duration-200"/>
        <p className='text-white text-4xl py-5 px-10'>Error Page... 4O4 😒</p>
    </div>
  )
}

export default Error;
