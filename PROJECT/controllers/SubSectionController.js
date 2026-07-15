const SubSection=require('../models/SubSection')
const Section=require('../models/Section');
const { UploadImageToCloudinary } = require('../utils/ImageUploader');
const Course = require('../models/Couse');

exports.CreateSubSection=async(req,res)=>{
    try{
        //data fetch
        const {Tittle, Description,sectionID}=req.body;
        
        
        const VideoFile=req.files.VideoURL;
        console.log("xdcfvgbhnjmkkmjuhytrf",VideoFile)
        
        

        //validation
       

        if(!Tittle || !Description ||!VideoFile  || !sectionID){
            return res.status(401).json({
                success:false,
                message:"FILL SUBSECTION DATA"
            })
        }

        //upload video to cloudinary
        const VideoURLFILE=await UploadImageToCloudinary(VideoFile,process.env.FOLDER_NAME)
        if (!VideoURLFILE || VideoURLFILE.error) {
            return res.status(500).json({
              success: false,
              message: "Video upload failed",
              error: VideoURLFILE.message || "Unknown error",
            });
          }

        
        //create Subsection
        const NewSubSection=await SubSection.create({
            Tittle,
            TimeDuration:`${VideoURLFILE.duration}`,
            Description,
            VideoUrl:VideoURLFILE.secure_url
        })


        //update section with subsection 

        const UpdateSection=await Section.findByIdAndUpdate(sectionID,{
            $push:{
               Subsection:NewSubSection._id,
            }
        },{new:true}).populate("Subsection");


        //res
        console.log("hello")
        return res.status(201).json({
            success:true,
            data:UpdateSection,
            message:"Section Creation Is Done"
        })

        

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"SUBSECTION CREATION FAILED"
        })
    }
}


exports.DeleteSubSection=async(req,res)=>{
     try{
        const {subsectionID,sectionId,courseId}=req.body;
        console.log(subsectionID,sectionId)
        const DeleteSubSection=await SubSection.findByIdAndDelete({_id:subsectionID});
        await Section.findByIdAndUpdate({_id:sectionId},{$pull :{
            Subsection:subsectionID,
        }})

        const updatedCourse=await Course.findById(courseId).populate({
            path: "CourseContent",
            populate:{
                path:"Subsection"
            }
        }).exec()

        return res.status(201).json({
            success:true,
            data:updatedCourse,
            message:"SUBSECTION DELETION Succesfully"
        })

     }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"SUBSECTION DELETION FAILED"
        })
     }


}


exports.UpdateSubSection=async(req,res)=>{
    try{
        const {Tittle,Description,sectionID,subSectionId,courseId}=req.body
        const updateSubSection=await SubSection.findById(subSectionId)



        if(!updateSubSection){
            return res.status(401).json({
                success:false,
                message:"SubSection Not Found"
            })
        }

        if(Tittle!==undefined) updateSubSection.Tittle=Tittle;
        if(Description!==undefined) updateSubSection.Description=Description;

        if (req.files && req.files.VideoUrl !== undefined) {
            const video = req.files.VideoUrl
            const uploadDetails = await UploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            updateSubSection.VideoUrl = uploadDetails.secure_url
            updateSubSection.TimeDuration= `${uploadDetails.duration}`
          }
        await updateSubSection.save();

        const updatedSection = await Section.findById(sectionID).populate(
            "subSection"
          )
        // const updatecourse=await Course.findById(courseId).populate({
        //     path:"CourseContent",
        //     populate:{
        //         path:"Subsection"
        //     }
        // }).exec()


        return res.status(201).json({
            success:true,
            data:updatedSection,
            message:"SUBSECTION UPDATION Succesfully"
        })

     }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"SUBSECTION UPDATION FAILED"
        })
     }
}