const {auth,isAdmin,isInstructor,isStudent}=require('../middleware/auth')
//const {CaptureThePayment,verifySignature}=require('../controllers/Payment')
const express=require('express')
const router=express.Router()

//router.post("/capturePayment", auth, isStudent,CaptureThePayment)
//router.post("/verifySignature", verifySignature)
module.exports=router;