import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Course_Card from './Course_Card'
function CourseSlider({Courses}) {
       const [course,setCourse]=useState([]);
       useEffect(()=>{
          if(Courses) setCourse(Courses);
       },[Courses])
    
  return (
    <div>
      {
        course?.length>0 ? (<Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
                1024:{slidesPerView:3,}
            }}
          >
            {
                course?.map((cours,index)=>(
                    <SwiperSlide key={index}>
                        <Course_Card course={cours} Height={"h-[250px]"}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>):(
            <p className="text-xl text-richblack-5">No Course Found</p>
        )
      }
    </div>
  )
}

export default CourseSlider
