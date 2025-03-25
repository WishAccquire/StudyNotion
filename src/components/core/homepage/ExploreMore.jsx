import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from "./CourseCard"

const tabsName=["Free","New to coding","Most popular","Skills paths","Career paths"]

function ExploreMore() {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses, setCorses]=useState(HomePageExplore[0].courses)
    const [currentcard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((courses)=>courses.tag===value);
        setCorses(result[0].courses);
        setCurrentCard(result[0].courses.heading)
    }
  return (
    <div className='w-full max-h-full flex flex-col gap-[36px]'>
        <div className='mb-40' >
        <div className='text-4xl font-semibold text-center'>
            Unclock the 
            <HighlightText text={" Power of Code"}/>
        </div>
        <p className='text-richblack-300 text-center text-m mt-3'>Learn to Build Anything You Can Imagine</p>

        <div className='flex flex-row justify-between w-6/12  mx-auto rounded-full bg-richblack-800 mb-5 mt-5 px-2 py-1'>
            {
                tabsName.map((Element,index)=>{
                    return (
                        <div className={`text-[16px]  items-center gap-2 ${currentTab===Element? "bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"} rounded-full transition-all duration-200  cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2`} key={index} onClick={()=>setMyCards(Element)}>
                            {Element}
                        </div>
                    )
                })
            }
        </div>
        </div>

        <div className='w-9/12 lg:h-[180 px] mx-auto'> 
            <div className='absolute  flex flex-row w-10/12 gap-5 items-center  justify-between translate-y-[-70%]'>
                {
                    courses.map( (Element,index)=>{
                        return (
                        <CourseCard key={index} cardData={Element} currentcard={currentcard} setCurrentCard={setCurrentCard} />

                        )
                    })
                }
            </div>
        </div>
        
      
    </div>
  )
}

export default ExploreMore
