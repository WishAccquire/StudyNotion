import React from 'react'
import { Form } from 'react-router-dom'
import ContactUs from '../../common/ContactUs'

function ContactForm() {
  return (
    <div className='mx-auto w-fit gap-4 max-w-maxContent items-center w-11/12 flex flex-col'>
        <h1 className='text-4xl font-semibold text-[#F1F2FF]'>Get in Touch</h1>
        <p className='text-[#838894]'>We’d love to here for you, Please fill out this form.</p>
        <div className='items-center' ><ContactUs/></div>
    </div>
  )
}

export default ContactForm