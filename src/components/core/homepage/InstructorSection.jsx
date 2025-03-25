import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  return (
    <div className='flex flex-row gap-9 items-center mt-16'>
        <div className='w-[50%]'>
           <img src={Instructor} className='shadow-white'/>
        </div>

        <div className='flex flex-col gap-5 w-[50%] '>
            <div className='text-4xl font-semibold w-[50%]'>
                Become an
                <HighlightText text={" Instructor"} />
            </div>
            <p>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <div className='font-medium text-[16px] w-[90%] flex flex-row items-center text-richblack-300 '>
                <Button active={true} linkto={"/signup"}>
                <div className='flex flex-row items-center gap-2'>
                    Teaching Today
                    <FaArrowRight/>
                    
                </div>
                
                </Button>
            </div>

        </div>
      
    </div>
  )
}

export default InstructorSection
