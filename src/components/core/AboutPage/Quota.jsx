import React from 'react'
import HighlightText from '../homepage/HighlightText'

function Quota() {
  return (
    <div className='w-10/12 text-4xl mx-auto font-semibold my-16 text-center text-[#AFB2BF]'>
        "We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/>, <span className='text-caribbeangreen-200'>{" "}expertise</span>, and community to create an <span className='text-pink-200'>{" "}unparalleled educational experience</span>."
    </div>
  )
}

export default Quota