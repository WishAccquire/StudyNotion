import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconButton from '../../../../common/IconButton';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { toast } from 'react-hot-toast';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import ChipInput from './ChipInput';
import Upload from './Upload';
function CourseInformation() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    }=useForm();
    const dispatch =useDispatch();
    
    const {token}=useSelector((state)=>state.auth)
    const {course,editCourse}=useSelector((state)=>state.course);
    const [loading, setLoading]=useState(false);
    const [courseCategories,setCourseCategories]=useState([]);
    
    

     useEffect(() => {
        
        
      const getCategories=async()=>{
       
        setLoading(true);
        
        const categories=await fetchCourseCategories();
        console.log("hello categories ", categories);
        if(categories.length>0){
            setCourseCategories(categories);
        }
        setLoading(false);
      }

      
      if(editCourse){
        setValue("courseTittle",course.CourseTittle)
        setValue("courseShortDesc",course.CourseDescription)
        setValue("coursePrice",course.Price)
        setValue("courseTags",course.Tag)
        setValue("courseBenefits",course.WhatLearn)
        setValue("courseCategory",course.Category)
        setValue("courseRequirements",course.Instructtion)
        setValue("courseImage",course.ThumbNail)
      }

      getCategories();
     
       
     },[])

     const isFornUpdated=()=>{
        console.log("hello");
        const currentValues=getValues();
        if(currentValues.courseTittle!=course.CourseTittle || 
            currentValues.courseShortDesc!=course.CourseDescription ||
            currentValues.coursePrice!=course.Price ||
            currentValues.courseTags!=course.Tag ||
            currentValues.courseBenefits!=course.WhatLearn ||
            currentValues.courseCategory!=course.Category ||
            currentValues.courseRequirements.toString()!=course.Instructtion.toString() ||
            currentValues.courseImage!=course.ThumbNail
        ) return true;
        else return false
     }

     const onSubmit=async(data)=>{
        console.log("hello submit mein hoon")
         if(editCourse){
            if(isFornUpdated()){
                const currentValues=getValues();
                const formData=new FormData();
    
                formData.append("courseId",course._id);
                if(currentValues.courseTittle!==course.CourseTittle){
                    formData.append("courseTittle",data.courseTittle)
                }
                if(currentValues.courseShortDesc!==course.CourseDescription){
                    formData.append("courseShortDesc",data.courseShortDesc)
                }
                if(currentValues.coursePrice!==course.Price){
                    formData.append("coursePrice",data.coursePrice)
                }
                if(currentValues.courseTags!==course.Tag){
                    formData.append("courseTags",data.courseTags)
                }
                if(currentValues.courseImage!==course.ThumbNail){
                    formData.append("courseImage",data.courseImage)
                }
                if(currentValues.courseRequirements.toString()!==course.Instructtion.toString()){
                    formData.append("courseRequirements",JSON.stringify(data.courseRequirements))
                }
                if(currentValues.courseCategory!==course.Category){
                    formData.append("courseCategory",data.courseCategory)
                }
                if(currentValues.courseBenefits!==course.WhatLearn){
                    formData.append("courseBenefits",data.courseBenefits)
                }
    
                setLoading(true);
                console.log("hello123",formData)
                const result=await editCourseDetails(formData,token);
                setLoading(false);
                if(result){
                    setStep(2);
                    dispatch(setCourse(result));
                }
             }
             else{
                toast.error("No changes made to the form");
             }
             return;
         }

         console.log("datais here",data);

         const formData=new FormData();
         formData.append("CourseTittle",data.courseTittle);
         
         formData.append("CourseDescription",data.courseShortDesc);
         
         formData.append("Price",data.coursePrice);
         
         formData.append("WhatLearn",data.courseBenefits);
         
         formData.append("Category",data.courseCategory);
         
         formData.append("Tag",JSON.stringify(data.courseTags));
         formData.append("ThumbNail",data.courseImage);
         
         formData.append("Instructtion",JSON.stringify(data.courseRequirements));
         
         formData.append("Status",COURSE_STATUS.DRAFT)
         
        
        
         setLoading(true);
        
         
         
         const result=await addCourseDetails(formData,token);
        
         
         if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
         }
         setLoading(false);
}
         

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

    <div className="flex flex-col space-y-2">
        <label htmlFor='courseTittle' className="text-sm text-richblack-5" >Course Title <sup className='text-[#EF476F]'>*</sup></label>
        <input  
           id='courseTittle'
           placeholder='Enter Course Title'
           {...register("courseTittle",{required:true})}
           className='w-full form-style bg-[#2C333F] p-3 rounded-md '
        />
        {
            errors.courseTittle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Tittle is Required**</span>
            )
        }
    </div>

    <div className="flex flex-col space-y-2">
        <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">Course Short Description<sup className="text-pink-200">*</sup></label>
        <textarea  
           id='courseShortDesc'
           placeholder='Enter Description'
           {...register("courseShortDesc",{required:true})}
          className="form-style bg-[#2C333F] p-3 rounded-md resize-x-none min-h-[130px] w-full"
        />
        {
            errors.courseShortDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required**</span>
            )
        }
    </div>

    

    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 bg-[#2C333F] p-3 rounded-md "
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

    <div className="flex flex-col space-y-2">
    <label htmlFor='courseCategory' className="text-sm text-richblack-5">Course Category<sup className="text-pink-200">*</sup></label>
    <select id='courseCategory'
    defaultValue=""
    className="form-style w-full bg-[#2C333F] p-3 rounded-md"
    {...register("courseCategory",{required:true})}>

        <option value="" disabled className='text-richblack-500'>Choose a Category</option>
        {
            !loading && courseCategories.map((category,index)=>(
                <option key={index} value={category._id} className='text-white bg-[#2C333F] p-3'>
                    {category.TagsName}
                </option>
            ))
        }

    </select>
    {
        errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
        )
    }

    </div>

    {/* create custom tags and upload */}

    <div>
    <label htmlFor='courseCategory'>Benifit of the Course<sup>*</sup></label>
    <textarea
      id='courseBenefits'
      placeholder='Enter Benifits of The Course'
       {...register("courseBenefits",{required:true})}
           className='w-full min-h-[140px]  bg-[#2C333F] p-3 rounded-md '
    />
    {
        errors.courseBenefits && (
            <span className='text-pink-200'>Course Benifits is Required</span>
        )
    }
    </div>

    <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

    <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.ThumbNail : null}
      />
      {/* Benefits of the course */}
      

  


    <RequirementField
      name="courseRequirements"
      label="Requirements/Instruction"
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
    />





    <div>
        {
            editCourse && (
                <button onClick={()=> dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                > Continue Without Saving</button>
            )
        }
    </div>

    <div className='flex justify-end p-3 text-yellow-100'><IconButton 
       text={!editCourse?"Next":"Save Change"}
       type="submit"
    
    /></div>

   </form>
  )
}

export default CourseInformation
