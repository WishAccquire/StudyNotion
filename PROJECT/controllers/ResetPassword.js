const User = require('../models/User')
const {mail} = require('../utils/Mail')
const bcrypt=require('bcryptjs');
const validator=require('validator')
const crypto=require('crypto')

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email
        const Email  = req.body.Email;

        //validation
        const valid = validator.isEmail(Email);
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }

        const checkEmail = await User.findOne({ Email });
        if (!checkEmail) {
            return res.status(401).json({
                success: false,
                message: `The Email ${Email} is not Register`
            })
        }

        //generate token
       
        const token=crypto.randomBytes(20).toString("hex");
        console.log("Generated token",token)
        
        //update user by adding token and expiration time
         const updateDetails=await User.findOneAndUpdate({Email},{
           Token: token,
           ResetPasswordExpires:Date.now()+ 24*60*1000
         },{new:true})
         console.log("Updated User Details:", updateDetails);
         console.log("hello")
        //link generate
        const url=`http://localhost:3000/update-password/${token}`

        //send mail
         await mail(Email,"Password Reset Link",`Password Reset Link:${url}`)

        return res.status(201).json({
            success:true,
            message:"Password reset Succesfully",
            data:updateDetails
        })


    } catch (err) {
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Return Respond Token Failed"
        })
    }
}


//resetpassword
exports.ResetPassword=async(req,res)=>{
    try{
        //data fetch
         const {NewPassword,ConfirmPassword,Token}=req.body;

        //validation
        if(NewPassword!==ConfirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password Doesn't Matched"
            })
        }
        console.log("Generated token",Token)

        //token->user entry lane ke liye
        const userDetails=await User.findOne({Token:Token});

        //if no entry-invalid Token
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: "Token Invalid"
            })
        }

        //token time
        if(userDetails.ResetPasswordExpires>Date.now()){
            return res.status(401).json({
                success: false,
                message: "Token Expired Because Time Get Over"
            })
        }

        //hashedPassword
        const hashedPassword=await bcrypt.hash(NewPassword,10);

        //db entry mein password update kar do
        await User.findByIdAndUpdate({Token:Token},{PassWord:hashedPassword},{new:true})


        //res send
        return res.status(201).json({
            success:true,
            message:"Password Reset"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Return Respond Token Failed"
        })
    }
}
