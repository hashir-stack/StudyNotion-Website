import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import countryCode from "../../data/countrycode.json";

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const { register,handleSubmit,reset, formState : { errors , isSubmitSuccessful } } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                phoneNumber:"",
                message:""
            })
        }
    },[isSubmitSuccessful,reset]);

    const submitContactForm = async (data) =>{
        console.log("Form Data" ,data);
        try {
            setLoading(true);
            const responce = {status:"200...OK..."}
            console.log(responce);
            setLoading(false);
            toast.success("Form Sumbitted Successfully ...")
        } catch (error) {
            setLoading(true);
            console.log("Error Message",error);
            setLoading(false);
            toast.error("Can't Submit the Form...")
        }
    }

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='border border-white rounded-md shadow-2xl shadow-richblue-500'>
        <div className='lg:flex lg:gap-4 mt-5 mx-5'>
            {/* First Name */}
            <div className='flex flex-col gap-1 justify-center items-start'>
                <label htmlFor="firstName" className='font-bold text-lg'>First Name <sup className='text-red-600'>*</sup></label>

                <input type="text" name='firstName' placeholder='Enter Your First Name' id='firstName' {...register( "firstName",{required:true} ) } className= ' h-fit placeholder:text-[18px] p-1 bg-richblack-600 border-b border-b-richblack-50 rounded-md text-[18px] font-semibold' />
                {
                   errors.firstName && (
                    <span>Please Enter Your First Name</span>
                   )
                }
            </div>

            {/* LastName */}
            <div className='flex flex-col gap-1 justify-center items-start'>
                <label htmlFor="lastName" className='font-bold text-lg'>Last Name <sup className='text-red-600'>*</sup></label>

                <input type="text" name='lastName' placeholder='Enter Your Last Name' id='lastName' {...register("lastName") } className= 'h-fit placeholder:text-[18px] p-1 bg-richblack-600 border-b border-b-richblack-50 rounded-md text-[18px] font-semibold'/>
            </div>
        </div>

        {/* email */}
        <div className='flex flex-col gap-1 justify-center items-start p-5 w-full'>
            <label htmlFor="email" className='font-bold text-lg'> Email Address <sup className='text-red-600'>*</sup></label>

            <input type="email" name='email' placeholder='Enter Your Email Address' id='email' {...register( "email",{required:true} ) } className='h-fit placeholder:text-[18px] p-1 bg-richblack-600 border-b border-b-richblack-50 rounded-md text-[18px] font-semibold w-full'/>
             {
                   errors.email && (
                    <span>Please Enter Your Email Address</span>
                   )
                }
        </div>

        {/* phoneNumber */}
        <div className='p-5'> 
            <label htmlFor="phoneNumber" className='font-bold text-lg'>Phone No.<sup className='text-red-600'>*</sup></label>
               
            <div className='flex gap-4'>
                {/* dropDown */}
                <div className='text-white flex flex-col gap-2 w-[80px]'>
                    <select name="dropDown" id="dropDown" {...register( "countryCode", {required:true})}  className= 'h-fit placeholder:text-[18px] p-2 bg-richblack-600 border-b border-b-richblack-50 rounded-md font-semibold'>
                        {
                            countryCode.map((element,index)=>{
                                return(
                                    <option key={index} value={element.code} className='text-black'>
                                        {element.code} - {element.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className=' flex w-[calc(100% - 90px)] flex-col gap-2'>
                    <input type="text" name='phoneNumber' id='phoneNumber'
                    className='h-fit placeholder:text-[18px] p-1 bg-richblack-600 border-b rounded-md text-[18px] font-semibold w-full border-b-richblack-50'
                    placeholder='12345 67890' {...register("phoneNumber",
                        {
                            required:{value:true,message:"Please Enter your Phone Number"},
                            maxLength:{value:10,message:"Invalid Phone Number"},
                            minLength:{value:8,message:"Invalid Phone Number"},
                            
                        }
                    )} />
                </div>
            </div>
            {
                errors.phoneNumber && (
                    <span>{errors.phoneNumber.message}</span>
                )
            }
        </div>

        {/*message */}
        <div className='flex flex-col gap-1 justify-center items-start px-10 py-7'>
            <label htmlFor="message" className='font-bold text-lg'> Message <sup className='text-red-600'>*</sup></label>
            <textarea name="message" id="message" placeholder='Enter Your Message Here...' rows={7} cols={30} {...register("message",{required:true})} className= ' h-fit placeholder:text-[18px] p-1 bg-richblack-600 border-b border-b-richblack-50 rounded-md text-[18px] font-semibold'/>
            {
                errors.message && (
                    <span>Please Enter Your Message</span>
                )
            }
        </div>

       <div className=' flex justify-center items-center mb-10'>
           <button type='submit' className='w-fit rounded-md bg-yellow-50 text-center p-2 text-[18px] font-sans font-bold text-black mx-auto'>
            Send Message
        </button>  
       </div>
    </form>
  )
}

export default ContactUsForm