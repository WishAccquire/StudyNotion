const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const validator = require('validator');
const crypto = require("crypto");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const Profile = require('../models/Profilr');
const {mail}=require('../utils/Mail');
const { count } = require('console');
require('dotenv').config()

//OTP
exports.sendOtp = async (req, res) => {
    try {
        //req ki body se email aayega
        const {Email}  = req.body;
        //validator email is valid or not
       
        const valid = validator.isEmail(Email);
        
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }
        

        const checkEmail = await User.findOne({ Email });
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The Email is Already Register"
            })
        }

        //generateotp
        var generateotp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,

        })
        //var generateotp=crypto.randomInt(10 ** (6 - 1), 10 ** length).toString();
        console.log("otp generate:", generateotp);

        const result = await OTP.findOne({ otp: generateotp });
       
        //check unique
        while (result) {
            generateotp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ Otp: generateotp });
        }
        const payload = { Email: Email, Otp: generateotp };

        const body = await OTP.create(payload);
        console.log(body);

        res.status(201).json({
            success: true,
            message: 'OTP Send Successfully',
            data: body,
        })


    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to send otp"
        })
    }


}




//signup

exports.SignUp = async (req, res) => {
    try {
        const {FirstName,LastName,PassWord,ConfirmPassword,Email,AccountType,ContactNumber,otp } = req.body;

        //validate
        if(!FirstName || !LastName || !PassWord || !ConfirmPassword || !Email ){
            
            return res.status(401).json({
                success: false,
                message: "Fill All Details"
            })
        }

        const valid = validator.isEmail(Email);
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }

        if(PassWord!==ConfirmPassword){
            return res.status(401).json({
                success: false,
                message: "Confirm Password And Password Are Different Please Retry Again."
            })
        }
        

        const checkEmail = await User.findOne({ Email });
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The Email is Already Register"
            })
        }
        //otp sort 
        const recentOtp=await OTP.find({Email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp",recentOtp);

        //validate
        if(recentOtp.lenght==0|| !recentOtp[0]){
            return res.status(401).json({
                success: false,
                message: "OTP Not Fount"
            })
        }

        else if( otp.toString()!==recentOtp[0].Otp.toString()){
            return res.status(401).json({
                success: false,
                message: "Invalid OTP. ENter Valid OTP"
            })
        }

        //hash password
       
        const hashedPassword=await bcrypt.hash(PassWord,10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
       
        
        const ProfileDetails=await Profile.create({
            Gender:null,
            DOB:null,
            About:null,
            ContactNumber:ContactNumber,

        })
        console.log("hello")
        const user=new User({
            FirstName,
            LastName,
            Email,
            PassWord:hashedPassword,
            AccountType,
            Approved:approved,
            AdditionalDetails:ProfileDetails,
            Image:`https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`,
        })
        
        await user.save();
        console.log("Hello ji yeh pe error hai");

        return res.status(200).json({
            success: true,
            data: "Register Successfully ",
            user,
        })

    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Sign up"
        })
    }
}



//login

exports.login=async(req,res)=>{
    try{
        const{Email,PassWord}=req.body;

        if( !PassWord || !Email){
            return res.status(401).json({
                success: false,
                message: "Fill All Details"
            })
        }
        

        const valid = validator.isEmail(Email);
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }
        
        
        const checkEmail = await User.findOne({ Email }).populate("AdditionalDetails");
        if (!checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The Email is not Register"
            })
        }
       

        const user=await User.findOne({Email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "The User is Not Register"
            })
        }
      



        if(await bcrypt.compare(PassWord,user.PassWord)){
            const payload={
                email:user.Email,
                id:user._id,
                role:user.AccountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"9h"
            });
            user.token=token;
            

            await user.save();
            console.log(user);
            user.PassWord=undefined;
            


            //cookie generate
            const option={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
           
            res.cookie("token",token,option).json({
                success:true,
                token:token,
                user,
                message:"Login Successfully"
            })
        }
        
        else{
            return res.status(401).json({
                success: false,
                data:err.message,
                message: "Password is Incorrect",
                
            })
        }
        




    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Login"
        })
    }
}


//CHANGE password

exports.ChangePassWord=async(req,res)=>{
    try{
        const{Email,PassWord,NewPassWord,ConfirmPassWord}=req.body;
        

        if (!PassWord || !Email || !NewPassWord ){
            return res.status(401).json({
                success: false,
                message: "Fill All Details"
            })
        }
        
        const valid = validator.isEmail(Email);
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }
        
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The Email is not Register"
            })
        }



      

        if(await bcrypt.compare(PassWord,user.PassWord)){
            if(!NewPassWord){
                return res.status(401).json({
                    success:false,
                    message:"Confirm Password and New Password Doesn't Match",
                })
            }
            
            const hashedPassword=await bcrypt.hash(NewPassWord,10);
            
            const updatedUser=await User.findByIdAndUpdate(req.user.id,{PassWord:hashedPassword},{new:true})
           

           await  mail(updatedUser.Email,"Password Updated Successfully",`<h2>Password Updated for ${updatedUser.FirstName} ${updatedUser.LastName}</h2>`)
           

            res.status(201).json({
                success:true,
                user,
                message:"Password Change Successfully"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect",
                
            })
        }




    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Change Password"
        })
    }
}
