import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/CartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(Email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      
      const response = await apiConnector("POST", SENDOTP_API, {
        Email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)
      console.log("hello")

      console.log(response.data.success)
     

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  AccountType,
  FirstName,
  LastName,
  Email,
  PassWord,
  ConfirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        AccountType,
        FirstName,
        LastName,
        Email,
        PassWord,
       ConfirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(Email, PassWord, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        Email,
        PassWord,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.Image
        ? response.data.user.Image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, Image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}




export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function getPasswordResetToken(Email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      
       const response=await apiConnector("POST",RESETPASSTOKEN_API,{Email})
      
       console.log("API Response:", response);
       if(!response.data.success){
        throw new Error(response.data.message);
       }

       toast.success("Reset Email Sent");
       setEmailSent(true);
    }catch(err){
      console.log("Reset Password Token ERROR ",err.message);
      toast.error("Failed to sent email for resetting password ")

    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(NewPassword,ConfirmPassword,Token){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSWORD_API,{NewPassword,ConfirmPassword,Token});
      console.log("the response....",response);
      console.log(response)
      if(!response.data.success){
        throw new Error("Fail to Reset Password.....",response.data.success)
      }

      toast.success("Password Reset Successfully")
      dispatch(setLoading(false));

    }catch(err){
      console.log("The password reset failed");
      toast.error("Fail to Reset Password");
      dispatch(setLoading(false));

    }
  }
}