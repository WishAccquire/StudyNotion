const mongoose=require('mongoose');
const Category = require('./Category');

const CourseSchema=new mongoose.Schema({
  CourseTittle:{
    type:String,
    required:true,
    trim:true,
  },
  CourseDescription:{
    type:String,
    required:true,
    trim:true,
  },
  WhatLearn:{
    type:String,
    required:true,
    trim:true,
  },
  Review:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview"
  }],
  Instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  CourseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section",
    required:true,
  }],
  Price:{
    type:Number,
    required:true,
  },
  ThumbNail:{
    type:String,
    
  },
  Category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
  },
  Tag:{
       type:[String],
       required:true,
  },
  EnrollStudent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  }],
  Instructtion:{
    type:[String],
  },
  Status:{
    type:String,
    enum:["Draft","Published"],
    default:"Draft"
  },
  createdAt: { 
    type: Date,
    default: Date.now
   },
   timeDuration:{
    type:String,
   },progressPercentage:{
    type:Number,
   }

})

module.exports=mongoose.model("Course",CourseSchema);