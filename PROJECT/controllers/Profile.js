const Profile=require('../models/Profilr');
const User=require('../models/User')
const corn=require('node-cron');
const {UploadImageToCloudinary}=require('../utils/ImageUploader')
const {convertSecondsToDuration}=require('../utils/secToDuration')
const CourseProgress=require('../models/CourseProgress')
const Course =require('../models/Couse')
corn.schedule("0 0 * * *",async()=>{
    try{
        const now = new Date();
        const DeleteUser=await User.find({
            deletionSchedule:{$lte:now},
        })

        for(const user of DeleteUser){
            if(user.AdditionalDetails){
                await Profile.findByIdAndDelete(user.AdditionalDetails);
            }
        }

        await User.findByIdAndDelete(user.id);

        console.log("Scheduled account deletion complete.");

    }catch(err){
        console.error("Error during scheduled account deletion:", err.message);
    }
})

exports.updateProfile=async(req,res)=>{
    try{

        //fetch data
        
       const {FirstName,LastName,Gender, DOB="", About="", ContactNumber} =req.body
       console.log("fghj",req.body)

       //user id
       const id=req.user.id;
       


       //validation
       if(!FirstName || !LastName || !Gender || !ContactNumber ||!id ){
        return res.status(401).json({
            success:false,
            message:"FILL ALL DETSILS"
        })
       }

       //profile .findById
       const user=await User.findById(id)
       const ProfileId=user.AdditionalDetails;

       //udate profile
       console.log(ProfileId)
       const updateProfile=await Profile.findByIdAndUpdate(ProfileId,{Gender, DOB, About, ContactNumber},{new:true});
       const updatedUser=await User.findByIdAndUpdate(id,{FirstName,LastName}).populate("AdditionalDetails").populate('CourseProgress').populate('Courses');
       

       return res.status(201).json({
        success:true,
        data:updatedUser,
        message:"Profile UPDATION Successfully"
    })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Profile UPDATION FAILED"
        })
    }
}

exports.deleteProfile=async(req,res)=>{
    try{
       //user id
       
       const {userId}=req.query;
       console.log(userId);
       const userDetails=await User.findById(userId);

       //validation
       if(!userDetails){
        return res.status(401).json({
            success:false,
            message:"User Not Found"
        })
       }

       //profile .findById
       userDetails.deletionSchedule=new Date(Date.now() + 5*24*60*60*1000);
       await userDetails.save();
       

       return res.status(201).json({
        success:true,
        data:userDetails,
        message:"user DELETION Successfully"
    })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"User DELETION FAILED"
        })
    }
}

exports.cancelDeltetion=async(req,res)=>{
    try{
        const {id}=req.user;
        const user = await User.findById(id);
        if (!user || !user.deletionSchedule) {
            return res.status(404).json({
                success: false,
                message: "No deletion scheduled for this user.",
            });
        }
        user.deletionSchedule=null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Account deletion canceled.",
        });

    }catch(err){

        return res.status(500).json({
            success: false,
            message: "Failed to cancel deletion",
            error: err.message,
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("AdditionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "Courses",
        populate: {
            path: "CourseContent",
            populate: {
              path: "Subsection" // or whatever the field name is that contains subsections
          }
        }
    })
        .exec()
        
        var SubsectionLength = 0
        
        for (var i = 0; i < userDetails.Courses.length; i++) {
          var totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.Courses[i].CourseContent.length; j++) {
            
            totalDurationInSeconds += userDetails.Courses[i].CourseContent[
              j
            ].Subsection.reduce((acc, curr) => acc + parseInt(curr.TimeDuration), 0)
            

            userDetails.Courses[i].timeDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            

            SubsectionLength +=
              userDetails.Courses[i].CourseContent[j].Subsection.length

          }
          console.log("drftgyhuji",SubsectionLength)
          let courseProgressCount = await CourseProgress.findOne({
            CourseId: userDetails.Courses[i]._id,
            userId: userId,
          })
          console.log("drftgyhuji",courseProgressCount)

          courseProgressCount = courseProgressCount?.CompleteVideo.length
          if (SubsectionLength === 0) {
            userDetails.Courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.Courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.Courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
    }

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("hello");
        console.log("diasplay",req.files.displayPicture);
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      
      const image = await UploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log("xdcfvgbhnjmkjhgfgh")
     
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { Image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDetails=async(req,res)=>{
  try{
    const coursedetails=await Course.find({Instructor:req.user.id});
    const courseData=coursedetails.map((course)=>{
      const totalStudentEnrolled=course.EnrollStudent.length
      const totalAmountGenerated=totalStudentEnrolled*course.Price;

      //create a new object with the addidtional field
      const courseDatawithStats={
        _id:course._id,
        CourseTittle:course.CourseTittle,
        CourseDescription:course.CourseDescription,
        totalStudentEnrolled,
        totalAmountGenerated,
      }
      return courseDatawithStats
    })

    res.status(200).json({success:true,courses:courseData})

  }catch(err){
     return res.status(500).json({
      err:err.message,
      success:flase,
      data:"Internal Server Failure"
     })
  }
}