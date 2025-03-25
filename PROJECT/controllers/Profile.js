const Profile=require('../models/Profilr');
const User=require('../models/User')
const corn=require('node-cron');
const {UploadImageToCloudinary}=require('../utils/ImageUploader')

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
       const {Gender, DOB="", About="", ContactNumber} =req.body

       //user id
       const id=req.user.id;


       //validation
       if(!Gender || !ContactNumber ||!id ){
        return res.status(401).json({
            success:false,
            message:"FILL ALL DETSILS"
        })
       }

       //profile .findById
       const user=await User.findById(id);
       const ProfileId=user.AdditionalDetails;

       //udate profile
       const updateProfile=await Profile.findByIdAndUpdate(ProfileId,{Gender, DOB, About, ContactNumber},{new:true});
       await updateProfile.save();

       console.log(updateProfile);

       return res.status(201).json({
        success:true,
        data:updateProfile,
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
       const {id}=req.user.id;
       console.log(id);
       const userDetails=await User.findById(id);

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
        .populate("Courses")
        .exec()
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
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("hello");
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      
      const image = await UploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
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