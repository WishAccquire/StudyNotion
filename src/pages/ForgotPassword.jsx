import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { getPasswordResetToken } from '../services/operations/authAPI';

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);
    const [Email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(Email, setEmailSent))
    }

    return (
        <div className='text-white flex justify-center items-center h-screen'>
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem]'>
                            {!emailSent ? "Reset Your Password" : "Check Your Email"}
                        </h1>

                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {
                                !emailSent
                                    ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                                    : `We have sent the reset email to ${Email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                            Email Address <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input
                                            type='email'
                                            required
                                            name="Email"
                                            value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter Your Email Address'
                                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[2px] border-b-richblack-600 focus:outline-none'
                                        />
                                    </label>
                                )
                            }

                            <button
                                type='submit'
                                className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200'
                            >
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>

                        <div className='mt-6 flex items-center justify-between'>
                            <Link to='/login'>
                                <p className='flex items-center gap-x-2 text-richblack-5 hover:text-yellow-50 transition-all duration-200'>
                                    <BiArrowBack /> Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword