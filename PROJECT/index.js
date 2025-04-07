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
const allowedOrigins = [
  "http://localhost:3000",
  "https://study-notion-1iq1.vercel.app",
  "https://study-notion-1iq1-k1134rf2c-wishaccquires-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
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
