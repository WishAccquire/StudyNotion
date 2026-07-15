import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import { setcourseSectionData,setcourseEntireData, setcompletedLectures, settotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewmodal from '../components/core/ViewCourse/CourseReviewmodal';
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';
function ViewCourse() {
    const [reviewModal,setReviewModal]=useState(false)
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth)
    const dispatch =useDispatch();

    useEffect(()=>{
        console.log("hellloohjh")
        const setCourseSpecailDetails=async()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
           
            dispatch(setcourseSectionData(courseData.courseDetails?.CourseContent));
            dispatch(setcourseEntireData(courseData?.courseDetails))
            dispatch(setcompletedLectures(courseData?.completedVideos ))
            
            let lecture=0;
            courseData?.courseDetails?.CourseContent?.forEach((sec)=>{
                lecture+=sec.Subsection.length
            })
            dispatch(settotalNoOfLectures(lecture))
        }
        setCourseSpecailDetails()
    },[courseId,token,dispatch])
  return (
    <div>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSideBar setReviewModal={setReviewModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>

        {reviewModal && <CourseReviewmodal setReviewModal={setReviewModal} />}
      
    </div>
  )
}

export default ViewCourse
