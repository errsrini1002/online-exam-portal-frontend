import React, { useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import emailjs from '@emailjs/browser';

const ContactUs = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_nfpgg6g', 'template_lvu2iwh', form.current, 'iDwvUQnW8W3704oM6')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <div className="text-color ms-5 me-5 mr-5 mt-3">
      <h4 className="mb-3">Contact Us</h4>
      <b>
        We value your feedback, questions, and inquiries. Whether you need
        assistance with an order, have a suggestion, or simply want to connect,
        our team is here to help. Feel free to reach out through the provided
        contact form, email, or phone number, and we'll respond promptly to
        ensure your experience with us is nothing short of exceptional. Your
        satisfaction is our priority, and we look forward to hearing from you.
      </b>
  

<div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div className="card rounded-card h-100 shadow-lg">
          <div className="card-body">
            <h4 className="card-title text-color-second text-center">
              Contact Form 
              </h4> 
<form ref={form} onSubmit={sendEmail}>

  
<div className="row mt-2">
              <div className="col-md-3">
                <p className="mb-2">
<label>Name</label>
<input type="text" name="user_name" />

</p>
</div>
</div>



<div className="row mt-2">
              <div className="col-md-3">
                <p className="mb-2">
<label>Email</label>
<input type="email" name="user_email" />
</p>
</div>
</div>

<div className="row mt-2">
              <div className="col-md-3">
                <p className="mb-2">
<label>Phone No</label>
<input type="phone" name="user_phone" />
</p>
</div>
</div>



<div className="row mt-2">
              <div className="col-md-3">
                <p className="mb-2">
<label>Message</label>

<textarea name="message" rows={8} cols={80}/>


</p>
</div>
</div>

<div className="row mt-2">
              <div className="col-md-3">
                <p className="mb-2">
<input type="submit" value="Send" />


</p>
</div>
</div>

</form>


</div>
</div>
</div>

</div> 
    
  );
};

export default ContactUs;


