import React from 'react'
import HighlightText from '../components/core/homepage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quota from '../components/core/AboutPage/Quota'
import Foundation from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/States'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/core/AboutPage/ContactForm'
import Footer from "../components/common/footer"

function About() {
  return (
    <div className="text-white w-screen mx-auto  ">
        {/*section1*/}
        <section className='mx-auto my-12 text-center'>
            <div className='mx-auto w-6/12 my-6 text-center'>
                <header className='text-[#F1F2FF] mx-auto font-inter font-semibold text-3xl mb-3'> Driving Innovation in Online Education for a <HighlightText text={" Brighter Future"} /> </header>
                <p className='text-sm text-[#838894] font-medium'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
               
            </div>
            <div className='flex gap-x-3  my-12 justify-center'>
                <img src={BannerImage1} />
                <img src={BannerImage2}/>
                <img src={BannerImage3}/>
            </div>
        </section>

        {/*section2*/}
        <section><div><Quota/></div></section>

        {/*section3*/}
        <section className='w-11/12 mx-auto'>
            <div>
                {/* founding story up */}
                <div className='flex justify-around my-12 items-center'>
                    {/* foundin left */}
                    <div className='w-[35%] flex flex-col gap-3  '>
                        <h1 className='text-pink-200 font-semibold text-3xl'>Our Founding Story </h1>
                        <p className='text-[#838894]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        
                        <p className='text-[#838894]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* foundin right */}
                    <div>
                        <img src={Foundation} className='bg-blend-multiply'/>
                    </div>

                </div>
                {/* founding story up */}
                <div className="flex gap-8 w-11/12 justify-around items-center my-16 mx-auto">
                    <div className='w-[35%]'>
                        <h1 className='text-3xl font-semibold text-[#E65C00]'>Our Vision</h1>
                        <p className='text-[#838894] font-medium'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                    </div>
                    <div className='w-[35%]'>
                        <h1 className='text-3xl font-semibold text-[#1FA2FF]'>Our Mission</h1>
                        <p className='text-[#838894] font-medium'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/*section4*/}
        <section>
            <StatsComponent/>
        </section>
       
         {/*section5*/}
         <section className='w-11/12 max-w-maxContent mx-auto mb-[140px]'>
         <LearningGrid/>
         </section>
         {/*section6*/}
         <section className='mx-auto max-w-maxContent my-16'>
            <ContactForm/>
         </section>

         <Footer/>
        

    </div>
  )
}

export default About