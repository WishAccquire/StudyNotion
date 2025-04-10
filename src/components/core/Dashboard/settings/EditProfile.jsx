import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconButton from "../../../common/IconButton"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="FirstName" className="lable-style text-richblack-25">
                First Name
              </label>
              <input
                type="text"
                name="FirstName"
                id="FirstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("FirstName", { required: true })}
                defaultValue={user?.FirstName}
              />
              {errors.FirstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="LastName" className="lable-style  text-richblack-25">
                Last Name
              </label>
              <input
                type="text"
                name="LastName"
                id="LastName"
                placeholder="Enter first name"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("LastName", { required: true })}
                defaultValue={user?.LastName}
              />
              {errors.LastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="DOB" className="lable-style  text-richblack-25">
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                id="DOB"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("DOB", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.AdditionalDetails?.DOB}
              />
              {errors.DOB && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.DOB.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="Gender" className="lable-style  text-richblack-25">
                Gender
              </label>
              <select
                type="text"
                name="Gender"
                id="Gender"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("Gender", { required: true })}
                defaultValue={user?.AdditionalDetails?.Gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.Gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="ContactNumber" className="lable-style  text-richblack-25">
                Contact Number
              </label>
              <input
                type="tel"
                name="ContactNumber"
                id="ContactNumber"
                placeholder="Enter Contact Number"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("ContactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.AdditionalDetails?.ContactNumber}
              />
              {errors.ContactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.ContactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="About" className="lable-style  text-richblack-25">
                About
              </label>
              <input
                type="text"
                name="About"
                id="About"
                placeholder="Enter Bio Details"
                className="form-style  bg-richblack-700 px-4 py-3 rounded-md border-b-white border-[0.5px] text-xl text-richblack-200"
                {...register("About", { required: true })}
                defaultValue={user?.AdditionalDetails?.About}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
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
          <IconButton type="submit" text="Save"  customclasses="text-white bg-yellow-50 px-5 py-3 rounded-md"/>
        </div>
      </form>
    </>
  )
}