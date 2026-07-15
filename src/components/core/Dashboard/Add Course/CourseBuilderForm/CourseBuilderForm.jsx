import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse,setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';


function CourseBuilderForm() {
    const {token}=useSelector((state)=>state.auth)
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();
    const [editSection,setEditSection]=useState(null);
    const {course}=useSelector((state)=>state.course)
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const cancelEdit=()=>{
        setEditSection(null);
        setValue("sectionName","")
    }

    

    const GoBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(null));


    }

    const onSubmit=async(data)=>{

        setLoading(true);
        let result;
        if(editSection){

            result=await updateSection({
                SectionName:data.sectionName,
                sectionID:editSection,
                courseId:course._id,
            },token)

        }
        else{
            result=await createSection({
                SectionName:data.sectionName,
                CourseID:course._id
            },token)

            console.log("CreateSection result",result)
        }


        //values ko update
        console.log("Updated Course from API:", result);
       
      

        if(result){
            
            dispatch(setCourse(result));
            dispatch(setEditCourse(null));
            setValue("sectionName",result.SectionName)
            setEditSection(null);
        }

        setLoading(false)


    }


    

    const gotonext=()=>{
        if(course.CourseContent.length===0){
            toast.error("Please Add one Section");
            return;
        }
        if(course.CourseContent.some((section)=>section.Subsection.length===0)){
            toast.error("Please Add one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }


    const handleChnagEditSectionName=(sectionId,sectionName)=>{
        if(editSection===sectionId){
            cancelEdit();
            return;
        }
        setEditSection(sectionId);
        setValue("sectionName",sectionName,{shouldDirty:true,shouldTouch:true,shouldValidate:true})
    }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='sectionName' className="text-sm text-richblack-5">Section Name <sup className='text-pink-200'>*</sup></label>
        <input
          id='sectionName'
          placeholder='Add Section Name'
          {...register("sectionName",{required:true})}
          className='w-full bg-[#2C333F] p-3 mt-1 rounded-lg'
        />
        {
            errors.sectionName && (
                <span>Section Name is Required</span>
            )
        }
        <div className="flex items-end gap-x-4">
        <div className='mt-10  flex place-items-center gap-1  text-yellow-25   border-2 border-yellow rounded-lg p-3'>
        <IconButton type="Submit" text={editSection?"Edit Section Name":"Create Section"}  customclasses={"text-yellow "}  />
            <IoIosAddCircleOutline className='text-yellow-100 font-bold' size={20}/>
        </div>
            {
                editSection && (
                    <button type='button' onClick={()=>cancelEdit()} className='text-sm text-richblack-300 underline'>Cancel Edit</button>
                )
            }
        </div>
       
      </form>
     

      {
        course?.CourseContent?.length>0 && (
            <NestedView handleChnagEditSectionName={handleChnagEditSectionName} />
        )
      }

      <div className='flex justify-end gap-2'>
        <button onClick={()=>GoBack()} className='bg-richblack-500 text-richblack-200 px-[12px] py-[8px] rounded-md '>
            Back
        </button>
        <IconButton text="Next" onClick={()=>gotonext()} customclasses={"text-white bg-yellow-50 px-[12px] py-[8px] rounded-md"}/>

      </div>

      

    </div>
  )
}

export default CourseBuilderForm
