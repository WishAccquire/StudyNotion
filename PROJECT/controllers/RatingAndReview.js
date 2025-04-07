const RatingAndReview=require('../models/RatingAndReviews');
const Course=require('../models/Couse');
const { default: mongoose } = require('mongoose');

//create rating
exports.creatingReview=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {courseId,Rating,Review}=req.body;

        

        if(!courseId  ||!Review){
        
            return res.status(404).json({
                success:false,
                message:"Fill All Details",
            })
        }
        //check if user is Enrolled
        const couseDetail=await Course.findById(courseId);
        console.log(couseDetail)
        if(!couseDetail.EnrollStudent.includes(userid)){
            return res.status(404).json({
                success:false,
                message:"YOU HAVE TO ENROLL FIRST",
            })
        }
        //check no multiplication Review
        if(couseDetail.Review.includes(userid)){
            return res.status(404).json({
                success:false,
                message:"YOU HAVE Already REVIEW THE CONTENT",
            }) 
        }
        //create rating and Review
        const reviewed=await RatingAndReview.create({
            User:userid,
            Review,
            Rating,
            Course:courseId
        })
        //course ko update kar done
        await Course.findByIdAndUpdate(courseId,{
            $push:{
                 Review:reviewed._id,
            }
        },{new:true})

        return res.status(201).json({
            success:true,
            data:reviewed,
            message:"Fetch All Details",
        })



    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Fail TO CREATE REVIEW",
        })
    }
}

//get Average RatingAndReview

exports.getAverageReview=async(req,res)=>{
    try{
        const courseId=req.body.courseId;

        //calculate average rating
        const corseDetails=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },{
                $group:{
                    _id:null,
                    averagereview:{$avg:"$Rating"},
                }
            }
       ] );
        //return rating
        if(corseDetails.lenght>0){
            return res.status(201).json({
                success:true,
                data:corseDetails[0].averagereview,
                message:"average Review Successfully",
            }) 
        }


        return res.status(201).json({
            success:true,
            data:0,
            message:"Average rating 0,no rating till now",
        }) 
       


    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Fail TO GET Review REVIEW",
        })
    }
}




//Get All Rating and reviews

exports.getAllRating=async(req,res)=>{
    try{
        const review=await RatingAndReview.find({}).sort({Rating:'desc'}).populate({
            path:"User",
            select:"FirstName LastName Email Image"
        }).populate({
            path:"Course",
            select:"CourseTittle",
        }).exec();

        res.status(201).json({
            success:true,
            data:review,
            message:"get all REVIEW AND RATING Succesfully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Fail TO GET Rating And REVIEW",
        })
    }
}

exports.getCourseBasedReview=async(req,res)=>{
    try{
        const {CouseID}=req.body;
        const review=await RatingAndReview.find({Course:CouseId}).populate({
            path:"Review",
            select:"Rating Review"
        })
        return res.status(201).json({
            success:true,
            data:review,
            message:"Get Course Based Review Successfully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Fail TO GET Course Based Review",
        })
    }
}