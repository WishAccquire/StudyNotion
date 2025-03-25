import React from 'react'
import { Link } from 'react-router-dom'

function Button({children,active,linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-[24px] py-[12px]  rounded-md font-bold shadow-inner-md 
            ${active? "bg-[#FFD60A] text-black":"bg-richblack-800 text-white"}`}
            >{children}</div>
    </Link>
  )
}

export default Button
