import React from "react";

function Contact() {
  return (
    <div className="contact" id="contact__section">
      <h1>Contact us</h1>
      <form action="">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Type your email" required />
        <textarea
          placeholder="Write your message here..."
          name="message"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <input type="submit" value="send" name="" id="" />
      </form>
    </div>
  );
}

export default Contact;
