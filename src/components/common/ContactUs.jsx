import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import CountryCode from "../../data/countrycode.json"

export default function ContactUs() {
    const [loading,setLoading]=useState(false)
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phonenumber:"",
        },[isSubmitSuccessful,reset])
      }
    
      
    })

    const sumitContactForm=async(data)=>{
         console.log("Logging data",data);
         try{
            setLoading(true);
            const respoans={status:"OK"}
            console.log("Logging response",respoans);
            setLoading(false)
         }catch(err){
            console.log("Error",err.message);
            setLoading(false)

         }
    }
    
  return (
    <form onSubmit={handleSubmit(sumitContactForm)} className='flex flex-col w-fit gap-4 mx-auto '>
       <div className='flex gap-5 text-[#F1F2FF] justify-between'>
        <div className='flex flex-col w-1/2'>
            <label htmlFor='firstname'>First Name</label>
            <input 
            type='text'
            name='firstname'
            id='firstname'
            placeholder='Enter First Name'
            {...register("firstname",{required:true})}
            className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29] shadow-blue-5 shadow-sm'
            />
            {
                errors.firstname && (
                    <span>Please Enter Your Name</span>
                )
            }

        </div>

        <div className='flex flex-col w-1/2'>
        <label htmlFor='lastname'>LastName</label>
            <input 
            type='text'
            name='lastname'
            id='lastname'
            placeholder='Enter Last Name'
            {...register("lastname")}
            className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29]  shadow-blue-5 shadow-sm'
            />
           
        </div>
       </div>

       <div className='flex flex-col'>
        <label htmlFor='email'>Email</label>
            <input 
            type='email'
            name='email'
            id='email'
            placeholder='Enter Email Address'
            {...register("email",{required:true})}
            className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29]  shadow-blue-5 shadow-sm'
            />
            {
                errors.email && (
                    <span>Please Enter Your Email Address</span>
                )
            }
        </div>

        <div className='flex flex-col gap-2'>
           <label htmlFor='phone_number'>Phone Number</label>
          <div className='flex flex-row w-[25%] '>
            <div >
                <select
                name='dropdown'
                id='dropdown'
                className='text-richblack-300 w-[78lpx] bg-[#161D29] p-3 mr-2 rounded-lg  shadow-blue-5 shadow-sm'
                {...register("countrycode",{required:true})}>
                    {
                         CountryCode.map((element,index)=>{
                            return (
                                <option key={index} value={element.code} className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29]'>
                                    {element.code}-{element.country}
                                </option>
                            )
                         })
                    }
                </select>
            </div>
          <input
           name='phone_number'
           id='phone_number'
           type='phonenumber'
           placeholder='1234567890'
          className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29]  shadow-blue-5 shadow-sm'
           {...register('phone_number',{required:true,maxLength:10,minLength:8})}
           />
           {
            errors.phone_number &&
            (<div>Enetr valid Phone Number</div>)
           }
          </div>
        </div>

        <div className='flex flex-col'>
        <label htmlFor='message'>Message</label>
            <textarea
            name='message'
            id='message'
            row="10"
            col="30"
            placeholder='Enter Your message here'
            {...register("message",{required:true})}
            className='text-[#999DAA] py-2 px-2 rounded-lg bg-[#161D29]  shadow-blue-5 shadow-sm'
            />
            {
                errors.message && (
                    <span>Please Enter Your Email Address</span>
                )
            }
        </div>

        <button type='submit' className='px-3 py-2 bg-yellow-50 rounded-md text-center font-medium text-black'>
            Send Message
        </button>
        
    </form>
  )
}
