const Couse = require("../models/Couse")
const {instance}=require('../config/RazorPay')
const User=require('../models/User')
const mailSender=require('../utils/Mail')
const { default: mongoose } = require("mongoose")
const crypto=require('crypto')


//capture the payment and initiate the Razorpay Order
exports.CaptureThePayment=async(req,res)=>{
    //get user and course id
    const {couresId}=req.body;
    const userID=req.user.id;


    //validation
    
    if(!couresId){
         return res.json({
            success:false,
            message:"PLEASE ENTER VALID COURSE ID"
         })
    }
    //valid course details
    let course;
    try{
        course=await Couse.findById(couresId);
        if(!course){
            return res.json({
                success:false,
                message:"Could not find the course"
            })
        }

        //user alredy pay for the same course
        //userid-->string hai toh usse convert karenge object id
        const uid=new mongoose.Types.ObjectId(userID);

        if(course.EnrollStudent.includes(uid)){
            return res.status(201).json({
                success:false,
                message:'Student is alredy Enrolled'
            })
        }

    }catch(err){
        return res.json({
            success:false,
            message:err.message,
            data:err.message,
        })
    }
    
    //order create and return response
    const amount=course.Price;
    const currency="INR";
    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:couresId,
            userID,
        }
    };

    try{
        //inititae the payment using razorpay
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);

        return res.json({
            success:true,
            courseName:course.CourseTittle,
            CourseDescription:course.CourseDescription,
            thumbnail:course.ThumbNail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
            message:"Course is Paid"
        })

       

    }catch(err){
        return res.json({
            success:false,
            message:"Could Not Initiate Order"
        })
    }

}


//verify Signature

exports.verifySignature=async(req,res)=>{
    const webhookSecreet="123456789";

    //rozar pay signature in hashed
    const signature=req.headers["x-razorpay-signature"];

    //we hook ko convert karna hoga to check with signature
    const shasum=crypto.createHmac("sha256",webhookSecreet);
    shasum.update(JSON.stringify(req.body))
    const digest=shasum.digest("hex");

    //check Match

    if(signature!==digest){
       return res.status(400).json({
        success:false,
        message:"fail to match"
       })
    }
    else{
    console.log("PAYMENT IS AUTHORIZED");
    const {userID,couresId}=req.body.payload.payment.entity.notes;

    try{
        //fullfill the Action


        //find the couse and enroll the Student
        const enrollcourse=await Couse.findByIdAndUpdate(couresId,{
            $push:{
                EnrollStudent:userID,
            }
        },{new:true})
        if(!enrollcourse){
            return res.status(500).json({
                success:false,
                message:'Course Not Found'
            })
        }

        console.log(enrollcourse);

        //find the student course update kar do

        const updateStudent=await User.findByIdAndUpdate(userID,
            {
                $push:{
                    Courses:couresId,
                }
            },{new:true}
        )
        console.log(updateStudent);

        //mail send kardo
        const emailresponse=await mailSender(EnrollStudent.email,"Congraatulation","Congraatulation you are onboarderd int studysinc Couse");


        console.log(emailresponse);

        return res.status(200).json({
            success:true,
            message:"Authorization is done",
        })



    }catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}


    

}