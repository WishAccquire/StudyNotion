import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function UpdatePassword() {
    const {loading}=useSelector((state)=>state.auth);
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const [formData,setFormData]=useState({
        PassWord:"",
        ConfirmPassword:"",
    })
    const dispatch=useDispatch();
    const location=useLocation();
    //form ke data se nikal lo
    const{PassWord,ConfirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
            [e.target.name]:e.target.value,
            }
        ))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split('/').at(-1);
        dispatch(resetPassword(PassWord,ConfirmPassword,token));

    }
  return (
    <div className='text-white flex justify-center items-center h-screen'>
             {
                loading? (<div>Loading...</div>)
                :(
                    <div>
                    <h1>
                     "Choose  new password"
                    </h1>
 
                    <p>
                    "Almost done. Enter your new password and youre all set."
                    </p>
                    <form  onSubmit={handleOnSubmit}>
                             <label>
                               <p>New password<sup>*</sup></p>
                             
                             <input
                              type={showPassword? 'text':'password'}
                              required
                              name="PassWord"
                              value={PassWord}
                              onChange={handleOnChange}
                              className='text-richblack-700'
                             
                              />
                              <span>
                                <button type="button" onClick={()=>setShowPassword((prev)=>!prev)}>
                                    {
                                        showPassword? <FaEye fontSize={24}/>:<FaRegEyeSlash fontSize={24}/>
                                    }
                                </button>

                              </span>
                              </label>
 
                              <label>
                               <p>Confirm new password<sup>*</sup></p>
                             
                             <input
                              type={showConfirmPassword? 'text':'password'}
                              required
                              name="ConfirmPassword"
                              value={ConfirmPassword}
                              onChange={handleOnChange}
                              className='text-richblack-700'
                             
                              />
                              </label>

                              <span>
                                <button type="button" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                    {
                                        showConfirmPassword? <FaEye fontSize={24}/>:<FaRegEyeSlash fontSize={24}/>
                                    }
                                </button>

                              </span>
                         
                    
 
                 <button type='submit'>
                    "Reset PassWord"
                 </button>
                    </form>
 
 
                    <div>
                     <Link to='login'>
                     <IoIosArrowRoundBack />
                      <p>Back to Login</p>
                      </Link>
                    </div>
 
               </div>
 
                )
             }
              
             
    </div>
  )
}

export default UpdatePassword