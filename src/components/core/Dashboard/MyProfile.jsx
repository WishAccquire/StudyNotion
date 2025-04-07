import { RiEditBoxLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { formattedDate } from "../../../utils/dataFormatter"
import IconButton from "../../common/IconButton"
import { useEffect } from "react"
import { getUserDetails } from "../../../services/operations/profileAPI"
import { setUser } from "../../../slices/profileSlice"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const navigate = useNavigate()

  
  useEffect(() => {
    if (!token) return;
    
    const fetchUser = async () => {
      console.log("hello")
      const response=await getUserDetails(token, navigate);
      
      dispatch(setUser(response))
    };
  
    fetchUser();
      
    
  }, [token]); 
  
  console.log("username",user)

  return (
    < div className=" mx-auto ">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.Image }
            alt={`profile-${user?.FirstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.FirstName + " " + user?.LastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.Email}</p>
          </div>
        </div>
        <IconButton
          text="Edit"
          onClick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconButton>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>
        <p
          className={`${
            user?.AdditionalDetails?.About
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.AdditionalDetails?.About ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconButton
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.FirstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.Email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.AdditionalDetails?.Gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.LastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.AdditionalDetails?.ContactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.AdditionalDetails?.DOB) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}