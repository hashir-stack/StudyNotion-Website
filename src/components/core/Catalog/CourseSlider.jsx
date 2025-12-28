import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

import Course_Card from './Course_Card';


const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:1,}
                    }}
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )

        }
    </>
  )
}

export default CourseSlider;

// CourseSlider.jsx
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import Course_Card from './Course_Card';

// const CourseSlider = ({ Courses }) => {
//   return (
//     <div className="h-[300px] px-5">
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           loop={true}
//           spaceBetween={20}
//           pagination={{ clickable: true }}
//           navigation={true}
//           autoplay={{
//             delay: 2000,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper w-full h-full"
//           breakpoints={{
//             1024: { slidesPerView: 1 },
//           }}
//         >
//           {Courses.map((course, index) => (
//             <SwiperSlide key={index} className=''>
//               <Course_Card course={course} height="h-[250px]" />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p>No Course Found</p>
//       )}
//     </div>
//   );
// };

// export default CourseSlider;
