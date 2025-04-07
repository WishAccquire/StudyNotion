const {auth,isAdmin,isInstructor,isStudent}=require('../middleware/auth')
const {CaptureThePayment,verifyPayment,sendPaymentSuccessEmail}=require('../controllers/Payment')
const express=require('express')
const router=express.Router()

router.post("/capturePayment", auth, isStudent,CaptureThePayment)
router.post("/verifyPayment", auth,isStudent,verifyPayment)
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail)
module.exports=router;