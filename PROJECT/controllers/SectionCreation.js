const Section=require('../models/Section');
const Course=require('../models/Couse');
const Couse = require('../models/Couse');
const SubSection = require('../models/SubSection');

exports.CreateSection=async (req,res)=>{
    try{
        //data Fetch
        const {SectionName,CourseID}=req.body;


        //data validation
        if(!SectionName || !CourseID){
            return res.status(401).json({
                success:false,
                message:"PLS FILL SECTION DATA"
            })
        }

        //create Section
        const newSection=await Section.create({
            SectionName,
        })

        //Update section in Course
        //populate both section and subsection both in updated course detail
        const UpadateCorse=await Course.findByIdAndUpdate({_id:CourseID},{
            $push:{
                CourseContent:newSection._id,
            }
        },{new:true, strictPopulate:false}).populate({
            path: "CourseContent",
            populate:{
                path:"Subsection"
            }
        }).exec()

        //res
        return res.status(201).json({
            success:true,
            data:UpadateCorse,
            message:"SUCCESSFULLLY TO CREATE SECTION"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"FAILED TO CREATE SECTION"
        })
    }
}


exports.ShowAllSection=async(req,res)=>{
    try{
        const {id}=req.parmas;
        const AllSection=await Section.findById(id).populate();

        return res.status(201).json({
            success:true,
            data:AllSection,
            message:"ALL SECTION GET FETCH"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"FAILED TO FETCH SECTION"
        })
    }
}

exports.UpadateSection=async(req,res)=>{
    try{
        //data fetch
        const {SectionName,sectionID,courseId}=req.body;
        if(!SectionName){
            return res.status(401).json({
                success:false,
                message:"FILL SECTION DATA"
            })
        }

        const updateSection=await Section.findByIdAndUpdate(sectionID,{SectionName},{new:true})
        const updateCourse=await Course.findById(courseId).populate({
            path:"CourseContent",
            populate:{
                path:"Subsection",
            }
        }).exec();

        return res.status(201).json({
            success:true,
            data:updateCourse,
            message:"SECTION Updated Succesfully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"FAILED TO UPDATE SECTION"
        })
    }
}


exports.DeleteSection=async(req,res)=>{
    try{
        //id fetch assuming we are sending id
        const {sectionID,courseId}=req.body;
        //find and DeleteSection
        console.log("section id",sectionID);
        const section = await Section.findById(sectionID);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        await SubSection.deleteMany({ _id: { $in: section.Subsection } });
        
        const deleteSection=await Section.findByIdAndDelete(sectionID);
        if (!deleteSection) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete section",
            });
        }
        //corse ko bhi update karo
       const updatedCourse=await Course.findByIdAndUpdate(courseId,{
        $pull:{
            "CourseContent":sectionID,
        }
       },{new:true}).populate("CourseContent")
       console.log(updatedCourse)
       
       
        //res
        return res.status(201).json({
            success:true,
            data:updatedCourse,
            message:"SECTION DELETED Succesfully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"FAILED TO DELETE SECTION"
        })
    }

}