import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

function ForgotPassword() {
    const [emailSent,setEmailSent]=useState(false);
    const [Email,setEmail]=useState("");
    const {loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();


    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(Email,setEmailSent))
    }



  return (
    <div className='text-white flex justify-center items-center h-screen'>
        {
              loading?(<div>Loading...</div>):
              (
              <div>
                   <h1>
                    {
                        !emailSent? "Reset Your PassWord":"Check Your Email"
                     }
                   </h1>

                   <p>
                    {
                         !emailSent? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to
                                                                                                                                                                                                 ${Email}`
                    }
                   </p>
                   <form  onSubmit={handleOnSubmit}>
                       {
                        !emailSent && (
                            <label>
                              <p>Email Address <sup>*</sup></p>
                            
                            <input
                             type='email'
                             required
                             name="Email"
                             value={Email}
                             onChange={(e)=>setEmail(e.target.value)}
                             placeholder='Enter Your Email Address'
                             />
                             </label>
                        
                    )
                }

                <button type='submit'>
                    {!emailSent? "Reset PassWord":"Resend Email"}
                </button>
                   </form>

                   <div>
                    <Link to='login'>
                     <p>Back to Login</p>
                     </Link>
                   </div>

              </div>

              
              )
        }
    </div>
  )
}

export default ForgotPassword