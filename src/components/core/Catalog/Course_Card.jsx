import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

function Course_Card({course,key,Height}) {
    const [avgReviewCount,setAverageReviewCount]=useState(0);
    useEffect(()=>{
        const count=GetAvgRating(course.Review)
        setAverageReviewCount(count);
    },[course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img src={course.ThumbNail} alt='course thumbnail' className={`${Height} w-full rounded-xl object-cover`}/>
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-m font-semibold text-richblack-5">{course?.CourseTittle}</p>
                    <p className="text-sm text-richblack-50">{course?.Instructor?.FirstName} {course?.Instructor?.LastName}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars ReviewCount={avgReviewCount}  />
                        <span className="text-richblack-400">{course?.Review?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-richblack-5">Rs.{course?.Price}</p>
                </div>

            </div>
        
        
        </Link>

      
    </div>
  )
}

export default Course_Card
