require('dotenv').config();
const mongoose=require('mongoose')

const connectDb=async()=>{
    try{

        const conn=await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("MongoDb is connected");
    }catch(error){
        console.log("MongoDb Connection is Failed");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports=connectDb;