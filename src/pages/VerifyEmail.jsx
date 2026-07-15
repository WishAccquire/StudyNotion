import  { useEffect, useState } from 'react';
import { signUp ,sendOtp} from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

function VerifyEmail() {
    const [OTP,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {signupData,loading}=useSelector((state)=>state.auth);
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[signupData,navigate])
 
    
    const{
        AccountType,
        FirstName,
        LastName,
        Email,
        PassWord,
       ConfirmPassword,
        
    }=signupData||{};

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(signUp( AccountType,FirstName,LastName,Email,PassWord,ConfirmPassword,OTP,navigate));
    }
  return (
    <div className=' flex items-center justify-center h-screen'>
        {
            loading?(<div>Loading...</div>):(
                <div className='flex flex-col items-center  '>
                   <h1 className='text-5xl text-white font-bold  '>
                    Verify Email
                   </h1>

                   <p className='text-xl text-white font-medium mb-4'>
                    A verification code has been sent to you. Enter the code below
                   </p>
                   <form  onSubmit={handleOnSubmit} >
                       <OtpInput
                         value={OTP}
                         onChange={setOtp}
                         numInputs={6}
                         renderSeparator={<span>-</span>}
                         renderInput={(props) => <input
                            {...props}
                            className="text-black bg-white border border-white w-[12px]  h-12 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                          />}/>
                        <button type='submit' className='bg-yellow-50 px-5 py-4 rounded-md text-richblack-900 font-semibold mb-4'>
                            Verify Email
                         </button>
                        
                   </form>
                   

                   <div className='flex gap-x-14'>
                   <div className='mb-5'>
                    <Link to='/login' className='font-semibold text-white text-xl'>
                     <p>Back to Login</p>
                     </Link>
                   </div>
                   <div className='font-semibold text-yellow-50 text-xl'><button
                   onClick={()=>dispatch(sendOtp(signupData.Email,navigate))}>Resend it</button></div>
                   </div>

              </div>

              
              )
        }
        </div>
  )
            
        
  
}

export default VerifyEmail