import React from 'react'
import ContactForm from '../components/core/AboutPage/ContactForm'
import Footer from '../components/common/footer'
import ReviewSlider from '../components/common/ReviewSlider'

function ContactUS() {
  return (
    <div className='w-screen my-12 mx-auto'>
        <div className='flex text-[#F1F2FF] justify-around mb-12  w-11/12 mx-auto'>
            <div className='w-1/3 max-h-max bg-[#161D29] p-4 flex flex-col gap-6  rounded-lg'>
            <div>
                <header className='font-semibold'>Chat on us</header>
                <p className='text-[#999DAA]'>Our friendly team is here to help. @mail address</p>

            </div>
            <div>
            <header className='font-semibold'>Visit us</header>
            <p className='text-[#999DAA]'>Come and say hello at our office HQ. Here is the location/ address</p>
            </div>
            <div>

            <header className='font-semibold'>Call us</header>
            <p className='text-[#999DAA]'> Mon - Fri From 8am to 5pm.+123 456 7890 </p>

            </div>

            </div>
            <div className='w-1/2 border-[#424854] border-[1px] py-12 px-10 rounded-lg'>
                <ContactForm/>
            </div>
        </div>
        <div className='mx-auto flex justify-center'> <ReviewSlider /></div>
       
        <Footer/>
      
    </div>
  )
}

export default ContactUS
