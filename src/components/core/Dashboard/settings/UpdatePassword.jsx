import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconButton from "../../../common/IconButton"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const {user}=useSelector((state)=>state.profile)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      const updatedata={
        ...data,
        Email:user?.Email,
      }
      
      
      await changePassword(token, updatedata)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%] ">
              <label htmlFor="PassWord" className="lable-style text-richblack-25">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="PassWord"
                id="PassWord"
                placeholder="Enter Current Password"
                className="form-style   bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200 items-center"
                {...register("PassWord", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[44px] z-[10] cursor-pointer  "
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="NewPassWord" className="lable-style text-richblack-25">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="NewPassWord"
                id="NewPassWord"
                placeholder="Enter New Password"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("NewPassWord", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[44px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.NewPassWord && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconButton type="submit" text="Update" customclasses={'bg-yellow-50 px-4 py-3 rounded-md text-white'} />
        </div>
      </form>
    </>
  )
}