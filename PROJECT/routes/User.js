const {auth,isAdmin,isInstructor,isStudent}=require('../middleware/auth')
const {login,sendOtp,SignUp,ChangePassWord}=require('../controllers/Auth')
const {
   resetPasswordToken,ResetPassword
  } = require("../controllers/ResetPassword")
const express=require('express')
const router=express.Router()

router.post("/login", login)

router.post("/signup", SignUp)

router.post("/sendotp", sendOtp)

router.post("/changepassword", auth, ChangePassWord)

router.post("/reset-password-token", resetPasswordToken)

router.post("/reset-password", ResetPassword)

module.exports=router;