const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({

   TagsName:{
    type:String,
    trim:true,
    required:true,
    unique:true,
   },
   TagsDescription:{
    type:String,
    trim:true,
   },
   Course:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
   }]
    
})

module.exports=mongoose.model("Category",CategorySchema);