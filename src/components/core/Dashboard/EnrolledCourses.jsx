import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar"

function EnrolledCourses() {
    const {token}=useSelector((state)=>state.auth);

    const [enrolledCourses,setEnrolledCourses]=useState(null);
    const getEnrolledCourses=async()=>{
        try{
           const response=await getUserEnrolledCourses(token);
           setEnrolledCourses(response);
           
        }catch(err){
            console.log("unable to Fetch Enrolled Courses")
        }
    }
    useEffect(()=>{
      getEnrolledCourses();
    },[])

  return (
    <div className='text-white'>
      
      <div>Enrolled Courses</div>
      {
        !enrolledCourses ? (<div>Loading..</div>)
        : !enrolledCourses.length? (<p>You have not enrolled in any Course yet</p>)
        :(
            <div> 
                <div>
                <p>Course Name</p> 
                  <p>Duration</p>
                  <p>Progress</p>
                </div>
                {
                    enrolledCourses.map((course,index)=>{
                         <div>
                            <div>
                                <img src={course.ThumbNail}/>
                            </div>
                            <div><p>{course.CourseTittle}</p>
                            <p>{course.CourseDescription}</p>
                            </div>
                            <div>{course?.CourseCotent.Subsection.TimeDuration}</div>
                            <div>
                                <p>Progress: {course.progressPercentage || 0}% </p>
                                <ProgressBar completed={course.progressPercentage || 0}
                                height='8px'
                                isLabelVisible={false}
                                />
                            </div>
                         </div>
})
                }
            </div>
        )
      }

    </div>
  )
}

export default EnrolledCourses
