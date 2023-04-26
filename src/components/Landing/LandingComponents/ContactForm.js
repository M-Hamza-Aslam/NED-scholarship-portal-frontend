import React, { useState } from "react";
import contactFormBackground from "../../../assets/images/contact-form-background.png";
import { TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationIcon from "@mui/icons-material/LocationOn";
import EastIcon from "@mui/icons-material/East";

import classes from "./ContactForm.module.css";
import { BACKEND_DOMAIN } from "../../../config";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Submit Form");
    const res = await fetch(`${BACKEND_DOMAIN}/send-contact-form`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.status !== 201) {
      const resData = await res.json();
      toast.error(resData.message);
      return;
    }
    const resData = await res.json();
    toast.success(resData.message);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setLoading(false);
  };

  const setFormValueHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={classes.contact}>
      <div id="contact" style={{ position: "absolute", top: "-100px" }}></div>
      <h1 className={classes["main-heading"]}>Contact Form</h1>
      <section className={classes["contact-form"]}>
        <div className={classes.inputs}>
          <h1>Say Hi!</h1>
          <p>We'd like to talk with you.</p>
          <form onSubmit={submitFormHandler}>
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              size="small"
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email Address"
              size="small"
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            <label htmlFor="message">Your Message</label>
            <TextField
              id="message"
              name="message"
              value={formData.message}
              placeholder="I want to say that..."
              size="small"
              multiline
              minRows={3}
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            {/* <button
              disabled={loading}
              type="submit"
              className={classes["color-button"]}
            >
              {loading ? "Sending..." : "Send Message"}
            </button> */}
            <button className={classes.btn}>
              <span className={classes["btn-text"]}>
                {loading ? "Sending... " : "Send Message "}
                <EastIcon sx={{ marginLeft: "5px" }} />
              </span>
            </button>
          </form>
        </div>
        <div className={classes["form-image"]}>
          <div className={classes["form-text"]}>
            <h1>Contact Information</h1>
            <p>
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <ul>
              <li>
                <span>
                  <PhoneIcon />
                </span>
                +1 (315) 554-9664
              </li>
              <li>
                <span>
                  <EmailIcon />
                </span>
                info@neduet.edu.pk
              </li>
              <li>
                <span>
                  <LocationIcon />
                </span>
                19 Holly Cove Ln, Dover, DE 19901, United States
              </li>
            </ul>
          </div>
          <img loading="lazy" src={contactFormBackground} alt="" />
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
