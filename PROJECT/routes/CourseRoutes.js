const express=require('express')
const router=express.Router()
const {auth,isStudent,isAdmin,isInstructor}=require('../middleware/auth')
const{CreateCourse,getAllCourse,getCourse,getFullCourseDetails,getInstructorCourses,editCourse,deleteCourse}=require('../controllers/CourseController')
const {createCategory,getAllCategory,categoryPageDetails}=require('../controllers/CreateCategory')
const {CreateSection,UpadateSection,DeleteSection,ShowAllSection}=require('../controllers/SectionCreation')
const {CreateSubSection,UpdateSubSection,DeleteSubSection}=require('../controllers/SubSectionController')
const {creatingReview,getAverageReview,getAllRating,getCourseBasedReview}=require('../controllers/RatingAndReview')
const {updateCourseProgress} = require("../controllers/CourseProgressController")


//course creation routes
router.post('/createCourse',auth,isInstructor,CreateCourse);

//get All courses
router.get('/getAllCourses',getAllCourse);

//get Course Details
router.get('/getCourseDetails',getCourse);

// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// Delete a Course
router.delete("/deleteCourse",auth,isInstructor, deleteCourse)

// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

//add Section
router.post('/addSection',auth,isInstructor,CreateSection);

//update Section
router.post('/updateSection',auth,isInstructor,UpadateSection);

//delete Section
router.post('/deleteSection',auth,isInstructor,DeleteSection);

//add Sub Section
router.post('/addSubSection',auth,isInstructor,CreateSubSection);

//update Sub Section
router.post('/updateSubSection',auth,isInstructor,UpdateSubSection);

//delete Sub Section
router.delete('/deleteSubSection',auth,isInstructor,DeleteSubSection);


//                    category routes

//create category
router.post('/createCategory',auth,isAdmin,createCategory);

//get All Category
router.get('/showAllCategories',getAllCategory);

//get Category Details
router.get('/getCategoryDetails',categoryPageDetails);

//update Category
router.put('/updateCategory',auth,isAdmin,createCategory);


//                     rating and review routes

//create Review
router.post('/createReview',auth,isStudent,creatingReview);

//get Average Review
router.get('/getAverageReview',getAverageReview);

//get All Rating
router.get('/getAllRating',getAllRating);

module.exports=router;
