const mongoose=require('mongoose')

const ReviewAndRatingSchema=new mongoose.Schema({

    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Rating:{
        type:Number,
        required:true,
    },
    Review:{
        type:String,
        required:true,
    },
    Course:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,//index created in course column
    }
    
})

module.exports=mongoose.model("RatingAndReview",ReviewAndRatingSchema);