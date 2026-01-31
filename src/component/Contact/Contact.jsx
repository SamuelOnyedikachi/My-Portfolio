import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>
      <div className="container contact__container">
        <form
          className="contact__form"
          onSubmit={(e) => {
            e.preventDefault();
            // placeholder: integrate email service when ready
            alert('Thanks — message captured (demo only)');
          }}
        >
          <input
            name="name"
            type="text"
            placeholder="Your Full Name"
            required
          />
          <input name="email" type="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
          />
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>

        <aside className="contact__info">
          <h4>Contact Info</h4>
          <p className="text-light">Email: hello@example.com</p>
          <p className="text-light">Location: Remote / Lagos, Nigeria</p>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
