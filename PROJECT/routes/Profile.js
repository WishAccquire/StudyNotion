const {auth,isAdmin,isInstructor,isStudent}=require('../middleware/auth')
const {deleteProfile,updateProfile,cancelDeltetion,getAllUserDetails,getEnrolledCourses,updateDisplayPicture,instructorDetails}=require('../controllers/Profile')
const express=require('express')
const router=express.Router()

router.delete("/deleteProfile",auth, deleteProfile)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getInstructorData",auth,isInstructor,instructorDetails)

module.exports=router;