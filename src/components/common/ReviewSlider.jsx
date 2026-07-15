import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation,FreeMode } from 'swiper/modules';
import ReactStars from 'react-rating-stars-component'
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/api'
import { FaStar } from 'react-icons/fa';
function ReviewSlider() {
    const [reviews, setReviews]=useState([])
    const truncationWords=15;

    useEffect(()=>{
       const fetchAllReview=async()=>{
        const response=await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
        if(response?.data?.success){
            setReviews(response?.data?.data)
        }
        console.log("Printing Reviews",response.data.data);
       }
       fetchAllReview()
    },[])

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={reviews.length<4?reviews.length : 4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.User?.Image
                          ? review?.User?.Image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.User?.FirstName} ${review?.User?.LastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.User?.FirstName} ${review?.User?.LastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.Course?.CourseTittle}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.Review.split(" ").length > truncationWords
                      ? `${review?.Review
                          .split(" ")
                          .slice(0, truncationWords)
                          .join(" ")} ...`
                      : `${review?.Review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.Rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.Rating}
                      size={20}
                      edit={false}
                      isHalf={true}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
