const mongoose=require('mongoose')
const {O}=require("../template/EmailVerification")

const ProfileSchema=new mongoose.Schema({
    Gender:{
        type:String,
       
    },
    DOB:{
        type:String 
    },
    About:{
        type:String 
    },
    ContactNumber:{
        type:Number,
        trim:true
    }
})

module.exports=mongoose.model("Profile",ProfileSchema);