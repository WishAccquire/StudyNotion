import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../api"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API ,GET_INSTRSTRUCTOR_DATA_API} = profileEndpoints

export async function getUserDetails(token, navigate) {
  
    const toastId = toast.loading("Loading...")
    let result;
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result=response.data.data
      const userImage = response.data.data.Image
        ? result.Image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      
    } catch (error) {
     
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    return result;
   
  }


export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result ;
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
     console.log(
       "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
       response
     )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  
  return result
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result ;
  try {
    console.log("BEFORE Calling BACKEND API FOR INSTRUCTOR DATA");
    const response = await apiConnector(
      "GET",
      GET_INSTRSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR INSTRUCTOR DATA");
     console.log(
       "GET_INSTRSTRUCTOR_DATA_API API RESPONSE............",
       response
     )

    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    result = response.data.courses
  } catch (error) {
    console.log("GET_INTSRUCTOR_API API ERROR............", error)
    toast.error("Could Not Get INSTRUCTOR DATA")
  }
  toast.dismiss(toastId)
  
  return result
}