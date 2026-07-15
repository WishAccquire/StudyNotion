import React from 'react'
import HighlightText from './HighlightText'
import progress from "../../../assets/Images/Know_your_progress.png"
import compare from "../../../assets/Images/Compare_with_others.png"
import lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

function LearningLanguage() {
  return (
    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col gap-5 items-center mt-[130px]'>
       <div className='text-4xl font-semibold text-center'>
        Your swiss knife for <HighlightText text={"learning any language"}/>
       </div>
       <div className='text-center text-richblack-600 mx-auto text-base mt-3 w-[70%]'>  
       Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
       </div>
       <div className='flex flex-row items-center justify-center mt-5'>
           <img src={progress} className='object-contain -mr-30' />
           <img src={compare} className='object-contain -ml-32' />
           <img src={lesson} className='object-contain -ml-40' />

       </div>
       <div className='mt-5 w-fit '>
        <CTAButton active={true} linkto={"/signup"}>
        Learn More
        </CTAButton>
       </div>
      
    </div>
  )
}

export default LearningLanguage
