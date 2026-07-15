import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

function PublishCourse() {
    const {register,handleSubmit,setValue,getValues,}=useForm();
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const {token}=useSelector((state)=>state.auth)
    const {course}=useSelector((state)=>state.course);
    const [loading, setLoading]=useState(false);
    const goBack = () => {
        dispatch(setStep(2))
      }

      useEffect(()=>{
        if(course?.Status===COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
        
      },[])
    
      const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
      }

    const handleCoursePublish=async()=>{

        if((course?.Status===COURSE_STATUS.PUBLISHED && getValues("public")===true) || 
           (course.Status===COURSE_STATUS.DRAFT && getValues("public")===false)){
            //no updation
            goToCourses();
            return;
           }
        //if form updated
        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
        formData.append("Status",courseStatus)

        setLoading(true);
        const result=await editCourseDetails(formData,token)

        if(result){
            goToCourses();
        }
        setLoading(false);


    }

    const onSubmit=(data)=>{
        console.log(data);
        handleCoursePublish();

    }

  return (
    <div className='roundes-md border-1px bg-richblack-800 p-6 border-richblack-700'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              onChange={(e) => setValue("public", e.target.checked)}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
            <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconButton disabled={loading} text="Save Changes" customclasses={'bg-yellow-50 p-2 text-richblack-900 rounded-md px-4 font-semibold'}/>
        </div>
        </form>
    </div>
  )
}

export default PublishCourse
