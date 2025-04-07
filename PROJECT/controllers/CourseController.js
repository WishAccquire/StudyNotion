const Couse = require('../models/Couse');
const Course = require('../models/Couse');
const CategoryM= require("../models/Category")
const User = require("../models/User");
const { UploadImageToCloudinary } = require("../utils/ImageUploader")
const {convertSecondsToDuration}=require("../utils/secToDuration")
const Section =require("../models/Section")
const SubSection =require("../models/SubSection")
const CourseProgress =require("../models/CourseProgress")

//create course handler function

exports.CreateCourse = async (req, res) => {
    try {
        //fetch data
        const { CourseTittle, CourseDescription, WhatLearn, Price, Tag ,Category,Instructtion} = req.body;
        console.log(CourseTittle,CourseDescription,WhatLearn,Price,Tag,Category,Instructtion)

        //fetch file
        console.log("helo");
        const thumbnail = req.files.ThumbNail
        console.log("helo",thumbnail);
        //validation
        if (!CourseTittle || !CourseDescription || !WhatLearn || !Price || !Tag  || !Category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "FILL ALL THE DATA WHICH ARE REQUIRED FOR COURSE"
            })

        }

        //check Instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{AccountType:"Instructor"});
        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details Not Found"
            })
        }

        //check Give Tag Valid or Not for PostMan
        //tag-->ObjectId
       
        const CategoryDetails = await CategoryM.findById(Category);
        if (!CategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details Not Found"
            })
        }
        
        //Upload image cloudinary
        console.log("helo");

        const thumbnailImages = await UploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log("helo");

        const newCource = await Course.create({
            CourseTittle,
            CourseDescription,
            Instructor: instructorDetails._id,
            WhatLearn,
            Price,
            Tag,
            Instructtion,
            Category:CategoryDetails._id,
            ThumbNail: thumbnailImages.secure_url,
        })
        console.log("helo");

        //user Update

        //add new course to the user schema iof Instructor
        await User.findByIdAndUpdate({ _id: instructorDetails._id },
            {
                $push: {
                    Course: newCource._id,
                }
            },
            { new: true }
        )

        //update the Schema Tag
        console.log("hello");
        await CategoryM.findByIdAndUpdate({_id: CategoryDetails._id }, {
            $push: {
                Course: newCource._id,
            }
        }, { new: true })


        //return res

        return res.status(201).json({
            success: true,
            message: "Course Fetched SuccessFully",
            data: newCource
        })

    } catch (err) {
        return res.status(501).json({
            success: false,
            data: err.message,
            message: "Course Doesn't Get Created"
        })
    }
}

exports.getAllCourse = async (req, res) => {
    try {

        const allcourse = await Course.find({Status:"Published"}, { CourseTittle: true, CourseDescription: true, Price: true, ThumbNail: true, Instructor: true, Review: true, EnrollStudent: true }).populate("Instructor");

        console.log("All Courses", allcourse);

        res.status(201).json({

            success: true,
            message: "Course Fetched SuccessFully",
            data: allcourse
        })

    } catch (err) {
        return res.status(501).json({
            success: false,
            data: err.message,
            message: "All Course Doesn't Get Fetched"
        })
    }
}

exports.getCourse = async (req, res) => {
    try {
        //get id
        const { courseId } = req.params;
        console.log("id:::",courseId);
        //find course details
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "Instructor",
                populate: {
                    path: "AdditionalDetails",
                }
            }).populate("Category")
            .populate("Review")
            .populate({
                path:"CourseContent",
                populate:{
                    path:"Subsection"
                }
            }).exec();

    //validation
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Couldn't find the Course with ${corseDetails}`
        })
    }

    let total=0;
    courseDetails.CourseContent.forEach((content)=>{
        content.Subsection.forEach((Subsection)=>{
            const time=parseInt(Subsection.TimeDuration)
            total+=time;
        })
    })

    const timeDuration=convertSecondsToDuration(total);

    return res.status(201).json({
        success:true,
        message:"Course Details is Fetched Successfully",
        data:{
            courseDetails,
            timeDuration
        }
    })

    } catch (err) {
        return res.status(501).json({
            success: false,
            data: err.message,
            message: "Course Doesn't Get Fetched"
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
      console.log("hello mein vishaka")
      const { courseId } = req.body
      console.log("courseId",courseId);
      const updates = req.body
      console.log(updates);
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      
      if (req.files) {
        console.log("thumbnail update")
        console.log(req.files);
        const thumbnail = req.files.ThumbNail
        const thumbnailImage = await UploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.ThumbNail = thumbnailImage.secure_url
      }
      console.log("hello kya hal chal");
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "Tag" || key === "Instructtion") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
      console.log("hello kya hal chal");
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "AdditionalDetails",
          },
        })
        .populate("Category")
        .populate("Review")
        .populate({
          path: "CourseContent",
          populate: {
            path: "Subsection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
      .populate({
        path: "Instructor",
        populate: {
          path: "AdditionalDetails",
        },
      })
      .populate("Category")
      .populate("Review")
      .populate({
        path: "CourseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      let total=0;
    courseDetails.CourseContent.forEach((content)=>{
        content.Subsection.forEach((Subsection)=>{
            const time=parseInt(Subsection.TimeDuration)
            total+=time;
        })
    })

    const timeDuration=convertSecondsToDuration(total);
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          timeDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  exports.deleteCourse = async (req, res) => {
    try {
      
      const { courseId } = req.body
      console.log("courseid",req.body)
  
      
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      
      const studentsEnrolled = course.EnrollStudent
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.CourseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.Subsection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }


exports.getInstructorCourses=async(req,res)=>{
    try{
        const id=req.user.id;
       

        const instructorCourse=await Course.find({Instructor:id}).sort({createdAt:-1});
        res.status(200).json({
            success: true,
            data: instructorCourse,
          })

    }catch{
        console.error(error)
       res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })

    }
}
  
  