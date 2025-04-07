const Course = require("../models/Couse")

const User=require('../models/User')
const {mail}=require('../utils/Mail')
const {paymentSuccessEmail}=require("../template/paymentSuccessEmail")
const mongoose = require("mongoose")
const crypto=require('crypto')
const { courseEnrollmentEmail } = require("../template/courseEnrollmentEmail")
const {instance}=require('../config/RazorPay')
const CourseProgress = require("../models/CourseProgress")


exports.CaptureThePayment=async(req,res)=>{
      const {courses}=req.body;
      const userId=req.user.id;
      if(courses.length==0){
        return res.json({success:false,message:"Please provide Course id"});
      }
      let totalamount=0;
      
      for(const courseId of courses){
        try{
            let course=await Course.findById(courseId);
            
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the Courses"
                })
            }
            
            if(course.EnrollStudent.includes(userId)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already fetched in this Course"
                })
            }
            totalamount+=course.Price
        }catch(err){
             res.status(500).json({
                success:false,
                data:err.message,
                message:"Failed to Capture the payement"
             })
        }
    }

        const options={
            amount:totalamount*100,
            currency:"INR",
            receipt: `order_rcptid_${Date.now()}`

        }
       

        try{
           
            const payementResponse=await instance.orders.create(options);
            
            res.json({
                success:true,
                message:payementResponse,
            })

        }catch(err){
            console.error("🔥 Razorpay Error:", err)
            return res.status(500).json({
                success:false,
                message:"Failed to Create instance in payment ",
                data:err.message
            })

        }
      
}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature

    const courses=req.body?.courses;
    const userid=req.user.id;
    
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userid){
        return res.status(200).json({success:false,message:"Payment Failed"})
    }

    let body=razorpay_order_id+ "|"+razorpay_payment_id;
    const expectedSignature=crypto
          .createHmac("sha256",process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

    if(expectedSignature===razorpay_signature){
        //enrool kar va do
        await enrollStudent(courses,userid,res)

        return res.status(200).json({success:true,message:"Payment Verified"});
    }
    return res.status(500).json({success:false,message:"Payment Failed"});
}

const enrollStudent=async(courses,usersId,res)=>{
       if(!courses || !usersId){
          return res.status(400).json({success:false , message:"Please Provide data for Courses or UserId"})
       }
       
       for(const courseId of courses){
        try{   
            const enrollCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{EnrollStudent:usersId}},{new:true})
            
        if(!enrollCourse){
            return res.status(500).json({
                success:false,
                message:"Course Not Found"
            })
        }
        
        const courseProgress=await CourseProgress.create({
            CourseId:courseId,
            userId:usersId,
            CompleteVideo:[]
        })

        //find the student and add the course in their list of enrollment
        console.log("enrollCourse:",usersId);
        const enrollStudent=await User.findByIdAndUpdate({_id:usersId},
            {
                $push:{
                    Courses:courseId,
                    CourseProgress:courseProgress._id
                }
            },{new:true},
        )
        console.log("enrollstudent:",enrollStudent)
         //bache ko mail send kardo
       const emailResponse=await mail(enrollStudent.Email,`SuccessFully Enrolled into ${enrollCourse.CourseTittle}`,courseEnrollmentEmail(enrollCourse.CourseTittle,`${enrollStudent.FirstName}`))
      console.log("Email Sent Successfully",emailResponse.response)

        }catch(err){
            return res.status(500).json({
                success:true,
                data:err.message,
                messgae:"Failed to Enrolled Student In Course"
            })
        }
    }
}

exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount} =req.body;
    const userId=req.user.id;
    //jo tumhare user id hai uske corresponding tum student ki user id nikal sakte ho
    if(!orderId || !paymentId || !amount || !userId ){
        return res.status(400).json({success:false,message:"Please provide all the field"})
    }
    try{
        console.log(userId,paymentId,amount)
       const enrollStudent=await User.findById(userId);
       
       await mail(
        enrollStudent.Email,
        `Payment Recieved`,
        paymentSuccessEmail(enrollStudent.FirstName,amount/100,orderId,paymentId)

       )
       
    }catch(err){
        console.log("Error in Sending mail",err);
        return res.status(500).json({success:false,message:"Could not send email"})
    }
}

      

//capture the payment and initiate the Razorpay Order
// exports.CaptureThePayment=async(req,res)=>{
//     //get user and course id
//     const {couresId}=req.body;
//     const userID=req.user.id;


//     //validation
    
//     if(!couresId){
//          return res.json({
//             success:false,
//             message:"PLEASE ENTER VALID COURSE ID"
//          })
//     }
//     //valid course details
//     let course;
//     try{
//         course=await Couse.findById(couresId);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Could not find the course"
//             })
//         }

//         //user alredy pay for the same course
//         //userid-->string hai toh usse convert karenge object id
//         const uid=new mongoose.Types.ObjectId(userID);

//         if(course.EnrollStudent.includes(uid)){
//             return res.status(201).json({
//                 success:false,
//                 message:'Student is alredy Enrolled'
//             })
//         }

//     }catch(err){
//         return res.json({
//             success:false,
//             message:err.message,
//             data:err.message,
//         })
//     }
    
//     //order create and return response
//     const amount=course.Price;
//     const currency="INR";
//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:couresId,
//             userID,
//         }
//     };

//     try{
//         //inititae the payment using razorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.json({
//             success:true,
//             courseName:course.CourseTittle,
//             CourseDescription:course.CourseDescription,
//             thumbnail:course.ThumbNail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//             message:"Course is Paid"
//         })

       

//     }catch(err){
//         return res.json({
//             success:false,
//             message:"Could Not Initiate Order"
//         })
//     }

// }


// //verify Signature

// exports.verifySignature=async(req,res)=>{
//     const webhookSecreet="123456789";

//     //rozar pay signature in hashed
//     const signature=req.headers["x-razorpay-signature"];

//     //we hook ko convert karna hoga to check with signature
//     const shasum=crypto.createHmac("sha256",webhookSecreet);
//     shasum.update(JSON.stringify(req.body))
//     const digest=shasum.digest("hex");

//     //check Match

//     if(signature!==digest){
//        return res.status(400).json({
//         success:false,
//         message:"fail to match"
//        })
//     }
//     else{
//     console.log("PAYMENT IS AUTHORIZED");
//     const {userID,couresId}=req.body.payload.payment.entity.notes;

//     try{
//         //fullfill the Action


//         //find the couse and enroll the Student
//         const enrollcourse=await Couse.findByIdAndUpdate(couresId,{
//             $push:{
//                 EnrollStudent:userID,
//             }
//         },{new:true})
//         if(!enrollcourse){
//             return res.status(500).json({
//                 success:false,
//                 message:'Course Not Found'
//             })
//         }

//         console.log(enrollcourse);

//         //find the student course update kar do

//         const updateStudent=await User.findByIdAndUpdate(userID,
//             {
//                 $push:{
//                     Courses:couresId,
//                 }
//             },{new:true}
//         )
//         console.log(updateStudent);

//         //mail send kardo
//         const emailresponse=await mailSender(EnrollStudent.email,"Congraatulation","Congraatulation you are onboarderd int studysinc Couse");


//         console.log(emailresponse);

//         return res.status(200).json({
//             success:true,
//             message:"Authorization is done",
//         })



//     }catch(err){

//         return res.status(500).json({
//             success:false,
//             message:err.message
//         })

//     }
// }


    

// }