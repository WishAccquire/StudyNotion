const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/User')


//auth
exports.auth=async(req,res,next)=>{
    try{
        
        const token=req.cookies.token|| req.body.token || req.header("Authorization")?.replace("Bearer ","");
       
        if(!token){
            return res.status(401).json({
                success: false,
                data: "Token Is Missing...."
            }) 
        }

        //verify token
        try{
            
            
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            
            
            req.user = decode;
           console.log(req.user);
            
            next();
        }catch(err){
            return res.status(401).json({
                success: false,
                data: "Token Invalid...."
            }) 
        }
        

        
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Authorization"
        })
    }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.role!=="Student"){
           return res.status(401).json({
            success: false,
            data: "This Is A Student Website"
           });
        }
        

 
        next();
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Authorization as Student"
        })
    }
}

//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
             success: false,
             data: "This Is a Admin Website"
            });
         }

        next();
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Authorization as Admin"
        })
    }
}

//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{
        console.log("req.user.role",req.user);
        if(req.user.role!=="Instructor"){
            return res.status(401).json({
             success: false,
             data: "This Is A Instructor Website"
            });
         }

        next();
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to Authorization as Instructor"
        })
    }
}