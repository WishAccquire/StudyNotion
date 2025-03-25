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
    <div className='text-white'>
        {
            loading?(<div>Loading...</div>):(
                <div>
                   <h1>
                    "Verify email"
                   </h1>

                   <p>
                    "A verification code has been sent to you. Enter the code below"
                   </p>
                   <form  onSubmit={handleOnSubmit}>
                       <OtpInput
                         value={OTP}
                         onChange={setOtp}
                         numInputs={6}
                         renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} 
                        className='text-richblack-700'
                         />}/>

                         <button type='submit'>
                            Verify Email
                         </button>
                   </form>

                   <div>
                   <div>
                    <Link to='login'>
                     <p>Back to Login</p>
                     </Link>
                   </div>
                   <div><button
                   onClick={()=>dispatch(sendOtp(signupData.Email,navigate))}>Resend it</button></div>
                   </div>

              </div>

              
              )
        }
        </div>
  )
            
        
  
}

export default VerifyEmail