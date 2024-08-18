import React, { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_7qs2dse', 'template_5u0p88q', event.target, 'i3TeSKybpWjXgkfCQ')
      .then((result) => {
          window.location.reload()  
      }, (error) => {
          console.log(error.text);
      });
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
  };


  return (
    <div className="main-container">
      {isSubmitted ? (
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>We have received your message and will get back to you soon.</p>
          <button onClick={() => setIsSubmitted(false)}>
            Submit Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <h2 style={{ color: "#d56b50" }}>Contact Us</h2>

         
          <div className="input-container">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

         
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="input-container">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
