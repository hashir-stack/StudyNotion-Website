import React from 'react'
import ContactUsForm from '../../common/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className='flex flex-col justify-center items-center text-white mt-32 py-5 px-10 w-full'>
        <p className='text-4xl font-semibold text-center p-1'>Get In Touch</p>
        <p className='font-semibold mb-7 mt-3'>We'd love to here for you , Please fill out this form </p>

        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection;