//1.script ko load karna hai
//2.razorpay modal ke liye option create karna
//option object successful then function inside it will call and agar payement successful ho jata hai hai toh mail send kar denge

import { studentEndpoints } from "../api";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo from '../../assets/Logo/Logo-Small-Dark.png'
import { resetCart } from "../../slices/CartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror=()=>{
            resolve(true);
        }

        document.body.appendChild(script)
     })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("Loading...");
    try{
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed To Load");
            return;
        }
        //initialize the order
        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization:`Bearer ${token}`
        })
        console.log("responsesss:",orderResponse.data.message)

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        //option create karna
        console.log(process.env.REACT_APP_RAZORPAY_KEY)
        const option={
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`{orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNov",
            description:"Thanks you For Enrolling in Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.FirstName}`,
                email:`${userDetails.Email}`
            },
            handler:function(response){
                //send succesfull mail
                 sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                 verifyPayment({...response,courses},token,navigate,dispatch)
                //verify payment
            }
        }
        //create object for modal creation
        const paymnetObject=new window.Razorpay(option);
        paymnetObject.open();
        paymnetObject.on("payment.failed",function(response){
               toast.error("oops, payment failed");
               console.log(response.error);
        })

    }catch(err){
         console.log("PAYMENT ERROR...........",err);
         toast.error("Could not make Payment");
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
       await  apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
        amount,
       },{
        Authorization:`Bearer ${token}`
       });
       console.log("Mail send successfully");
    }catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR.....",err);

    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate,dispatch){
    const toastId=toast.loading("Verify Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })
       

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())
    }catch(err){
       console.log("Payment Verify Error......",err);
       toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}