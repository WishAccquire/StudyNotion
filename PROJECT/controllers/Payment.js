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
            console.error("Razorpay Error:", err)
            return res.status(500).json({
                success:false,
                message:"Failed to Create instance in payment ",
                data:err.message
            })

        }
      
}

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, amount } = req.body;
    const userid = req.user.id;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userid) {
        return res.status(400).json({ success: false, message: "Payment Verification Fields Missing" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // 1. Pehle database mein safely enroll karwao
        const enrollmentResult = await enrollStudent(courses, userid, amount, razorpay_order_id, razorpay_payment_id);
        
        if(enrollmentResult.success) {
            return res.status(200).json({ success: true, message: "Payment Verified and Enrolled Successfully" });
        } else {
            return res.status(500).json({ success: false, message: enrollmentResult.message });
        }
    }
    return res.status(400).json({ success: false, message: "Invalid Signature, Payment Failed" });
}

const enrollStudent = async (courses, usersId, amount, orderId, paymentId) => {
    // Database ACID consistency ke liye session start karenge
    const session = await mongoose.startSession();
    session.startTransaction();

    try {   
        const enrolledCoursesTitles = [];
        const student = await User.findById(usersId).session(session);
        
        if(!student) throw new Error("User not found");

        for (const courseId of courses) {
            const enrollCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                { $push: { EnrollStudent: usersId } },
                { new: true, session } // session pass kiya taaki agar fail ho toh rollback ho sake
            );
            
            if (!enrollCourse) throw new Error(`Course not found: ${courseId}`);
            enrolledCoursesTitles.push(enrollCourse.CourseTittle);
            
            const courseProgress = await CourseProgress.create(
                [{ CourseId: courseId, userId: usersId, CompleteVideo: [] }],
                { session }
            );

            await User.findByIdAndUpdate(
                { _id: usersId },
                { $push: { Courses: courseId, CourseProgress: courseProgress[0]._id } },
                { new: true, session }
            );
        }

        // Agar saare DB operations bina kisi error ke pure ho gaye, toh save karo permanently
        await session.commitTransaction();
        session.endSession();

        // 2. DB Commit hone ke baad hi Emails trigger hongi (Zero Race Condition)
        // Aap yahan se dono email background mein bina 'await' kiye ya async bhej sakte hain
        try {
            // Course enrollment mail
            await mail(student.Email, `Successfully Enrolled`, courseEnrollmentEmail(enrolledCoursesTitles.join(", "), student.FirstName));
            // Payment success receipt mail
            await mail(student.Email, `Payment Received`, paymentSuccessEmail(student.FirstName, amount / 100, orderId, paymentId));
        } catch (mailErr) {
            console.error("Email sending failed but user is safely enrolled:", mailErr);
            // Email fail hone se user ka course block nahi hoga, data consistent rahega.
        }

        return { success: true };

    } catch (err) {
        // Agar loop mein ek bhi jagah error aaya, toh pura database pehle jaisa ho jayega (Rollback)
        await session.abortTransaction();
        session.endSession();
        console.error("Enrollment Transaction Aborted:", err.message);
        return { success: false, message: err.message };
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

      

