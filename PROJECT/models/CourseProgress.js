const mongoose=require('mongoose')

const CoursePSchema=new mongoose.Schema({

    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    CompleteVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
})

module.exports=mongoose.model("CourseProgress",CoursePSchema);