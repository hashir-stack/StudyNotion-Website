import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLine from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo:logo1,
        Heading:"Leadership",
        Description:"Fully Committed to the success company"
    },
    {
        Logo:logo2,
        Heading:"Leadership",
        Description:"Fully Committed to the success company"
    },
    {
        Logo:logo3,
        Heading:"Leadership",
        Description:"Fully Committed to the success company"
    },
    {
        Logo:logo4,
        Heading:"Leadership",
        Description:"Fully Committed to the success company"
    },
]

const TimelineSection = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-14 items-center'>
            <div className='w-full lg:w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className="flex gap-4 sm:gap-6 items-start" key={index}>
                                <div className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] bg-white flex items-center justify-center">
                                    <img 
                                    className="w-full h-full object-contain"
                                    src={element.Logo}
                                    alt={`Logo ${index}`}
                                    />
                                </div>

                                <div>
                                    <p className="font-semibold text-[18px]">{element.Heading}</p>
                                    <p className="text-base">{element.Description}</p>
                                </div>

                            </div>
                        ) 

                        
                    })
                }
            </div>

            <div className="relative shadow-blue-200 shadow-2xl">
                <img src={TimeLine} alt="TimeLine" className="shadow-white shadow-2xl object-cover h-fit"/>

                <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="text-4xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                    </div>

                    <div className="flex gap-5 items-center px-7">
                        <p className="text-4xl font-bold">250</p>
                        <p className="text-caribbeangreen-300 text-sm"> Types of Courses</p>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection