import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/homepage/HighlightText';
import CTAButton from '../components/core/homepage/Button'
import Ban from '../assets/Images/home.mp4'
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import "../App.css"
import TimeLineSection from '../components/core/homepage/TimeLineSection';
import LearningLanguage from '../components/core/homepage/LearningLanguage';
import InstructorSection from '../components/core/homepage/InstructorSection';
import Footer from "../components/common/footer"
import ExploreMore from '../components/core/homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';


function Home() {
  return ( 
    <div className='relative  mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between '>
        {/*Section1-->front page */}
         <div>
            <Link to={"/signup"}>
            <div className="group mt-16 p-0.5 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit  shadow-white shadow-[0_1.8px_1.8px_rgba(0,0,0,0.25)]"> 
                <div className='flex flex-row items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-6'>
                Empower Your Future with 
                <HighlightText text={" Coding Skills"} />
            </div>
            <div className='text-center w-[90%] text-lg font text-richblack-300 mt-4 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8 justify-center'>
                <CTAButton active={true} link={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} link={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-white mx-auto my-12  overflow-hidden w-[935px] h-[515px] max-w-full aspect-video flex items-center justify-center border-x-20 border-y-20 border-white box-border'>
                <video muted loop autoPlay className='w-full h-full object-cover'>
                      <source src={Ban} type="video/mp4"/>
                </video>
            </div>

            <div>
                <CodeBlocks position={"lg:flex-row"}
                heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text={"coding Potential "}/> with our online courses</div>}
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={{
                   btnText:"Try it Yourself" ,
                   linkto:"/signup",
                   active:true,
                }}
                ctabtn2={{
                    btnText:"Learn More" ,
                    linkto:"/login",
                    active:false,
                 }}
                 codeblock={'<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>'}
                 codeColor={"text-yellow-25"}/>
            </div>

            <div>
                <CodeBlocks position={"lg:flex-row-reverse"}
                heading={<div className='text-4xl font-semibold'>Start<HighlightText text={" coding in seconds "}/> </div>}
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={{
                   btnText:"Continue Lesson" ,
                   linkto:"/signup",
                   active:true,
                }}
                ctabtn2={{
                    btnText:"Learn More" ,
                    linkto:"/login",
                    active:false,
                 }}
                 codeblock={'<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>'}
                 codeColor={"text-blue-50"}/>
            </div>

          
         </div>

         <div className='w-full '><ExploreMore/></div>

        {/*Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700 w-screen pb-6'>
           
            <div className='homepage_bg h-[310px]'> 
            <div className='w-11/12 mx-auto max-w-maxContent'>
            <div className=' max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                  <div className='flex flex-row gap-7 text-white'>
                    <CTAButton active={true} linkto={'/signup'}>
                       <div className='flex gap-2 items-center'> Explore Full Catalog
                       <FaArrowRight/></div>
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"}>
                    <div>Learn More</div>
                    </CTAButton>
                   
                  </div>
            </div>
            </div>
            </div>

            <div className='mx-auto w-10/12 max-w-maxContent flex flex-col items-center  justify-center gap-3'>

            <div className='flex flex-row gap-[18px] mt-[95px] mb-10'>
                <div className="text-[36px] font-semibold w-[45%]">
                Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div>Learn More</div></CTAButton>
                </div>
            </div>
            
            
            </div>

            <TimeLineSection/>
            <LearningLanguage/>
            
        </div>

        
         
        {/*Section3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8'>
                <InstructorSection/>
                <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>
                
        </div>
          <ReviewSlider />
        {/*Section4 ->footer */}
        <Footer className="w-screen"/>
        

      
    </div>
  )
}

export default Home
