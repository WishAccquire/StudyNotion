import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function UpdatePassword() {
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        PassWord: "",
        ConfirmPassword: "",
    })
    const dispatch = useDispatch();
    const location = useLocation();
    const { PassWord, ConfirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(PassWord, ConfirmPassword, token));
    }

    return (
        <div className='text-white flex justify-center items-center h-screen'>
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem]'>
                            Choose New Password
                        </h1>

                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            Almost done. Enter your new password and you're all set.
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            <label className='relative block'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    New Password <sup className='text-pink-200'>*</sup>
                                </p>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    name="PassWord"
                                    value={PassWord}
                                    onChange={handleOnChange}
                                    placeholder='Enter New Password'
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-b-[2px] border-b-richblack-600 focus:outline-none'
                                />

                                <span
                                    className='absolute right-3 top-[42px] cursor-pointer text-richblack-100'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {
                                        showPassword ? <FaEye fontSize={20} /> : <FaRegEyeSlash fontSize={20} />
                                    }
                                </span>
                            </label>

                            <label className='relative block mt-4'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    Confirm New Password <sup className='text-pink-200'>*</sup>
                                </p>

                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    name="ConfirmPassword"
                                    value={ConfirmPassword}
                                    onChange={handleOnChange}
                                    placeholder='Confirm New Password'
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-b-[2px] border-b-richblack-600 focus:outline-none'
                                />

                                <span
                                    className='absolute right-3 top-[42px] cursor-pointer text-richblack-100'
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {
                                        showConfirmPassword ? <FaEye fontSize={20} /> : <FaRegEyeSlash fontSize={20} />
                                    }
                                </span>
                            </label>

                            <button
                                type='submit'
                                className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200'
                            >
                                Reset Password
                            </button>
                        </form>

                        <div className='mt-6 flex items-center justify-between'>
                            <Link to='/login'>
                                <p className='flex items-center gap-x-2 text-richblack-5 hover:text-yellow-50 transition-all duration-200'>
                                    <IoIosArrowRoundBack size={24} /> Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword