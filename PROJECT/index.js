const express=require('express')
const ConnectDb=require('./config/Database')
const CorseRoute=require('./routes/CourseRoutes')
const UserRoute=require('./routes/User')
const PaymentRoute=require('./routes/PaymentRoutes')
const ProfileRoute=require('./routes/Profile')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {connectCloudinary}=require('./config/Cloudeinary')
const fileUpload=require('express-fileupload')

require('dotenv').config();
const app=express();
ConnectDb();
//middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:*,
   
    credentials:true,
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
connectCloudinary();
//routes mount
app.use('/api/v1/course',CorseRoute)
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/payment',PaymentRoute)
app.use('/api/v1/profile',ProfileRoute) 


app.get('/',(req,res)=>{
    return res.send("Hello World");
})


app.listen(process.env.PORT ,()=>{
    console.log("WE ARE READY");
})
