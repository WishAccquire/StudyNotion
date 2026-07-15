const mongoose=require('mongoose')
const {O}=require("../template/EmailVerification");
const { validate } = require('node-cron');

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
        type:String,
        trim:true,
        validate:{
            validator:function(v){
                return /^[0-9]{10}$/.test(v);
            },
            message: props=>`${props.value} is not a valid 10 digit number!`
        }
    }
})

module.exports=mongoose.model("Profile",ProfileSchema);