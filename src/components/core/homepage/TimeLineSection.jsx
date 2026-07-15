import React from 'react'
import LOGO1 from "../../../assets/TimeLineLogo/Logo1.svg"
import LOGO2 from "../../../assets/TimeLineLogo/Logo2.svg"
import LOGO3 from "../../../assets/TimeLineLogo/Logo3.svg"
import LOGO4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineIMG from "../../../assets/Images/TimelineImage.png"

const timeline=[
    {
        logo:LOGO1,
        heading:"Leadership",
        Description:"Fully commited to the success company",
    },
    {
        logo:LOGO2,
        heading:"Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        logo:LOGO3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        logo:LOGO4,
        heading:"Solve the problem",
        Description:"Code your way to a solution",
    },
]

function TimeLineSection() {
  return (
    <div className='w-11/12 mx-auto  max-w-maxContent mt-10'>
        <div className='flex flex-row h-full gap-15 items-center'>
            <div className=' min-h-[450px] h-full flex flex-col justify-evenly w-[45%] gap-5  '>
                {
                    timeline.map((Element,index)=>{
                        return (
                           <div className='flex flex-row  gap-6 ' key={index}> 
                           <div className='h-[50px] w-[50px] bg-pure-greys-5 flex justify-center items-center'>
                            <img src={Element.logo}/>
                           </div>
                           <div>
                            <h2 className='font-semibold text-[18px]'>{Element.heading}</h2>
                            <p className='text-base'>{Element.Description}</p>
                           </div>
                           </div> 
                        )

                        
                    })
                }

            </div>
            <div className='relative  shadow-blue-200'>
                <img src={timelineIMG} className='shadow-white object-cover h-fit' />
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                     left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                    </div>
                </div>

            </div>
        </div>
      
    </div>
  )
}

export default TimeLineSection
