import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { motion } from "framer-motion";
import email from "../src/assets/App Images/Contact Page Icon/email.png";
import whatsapp from "../src/assets/App Images/Contact Page Icon/whatsapp.png";
import phone from "../src/assets/App Images/Contact Page Icon/phone.png";
import facebook from "../src/assets/App Images/Contact Page Icon/facebook.png";
import instagram from "../src/assets/App Images/Contact Page Icon/instagram.png";
import twitter from "../src/assets/App Images/Contact Page Icon/twitter.png";
import { useFormik } from "formik";

function Contact() {
  const enquiryType = [
    {
      label: "Booking Service",
      value: "Booking Service",
    },
    {
      label: "Maintenance",
      value: "Maintenance",
    },
    {
      label: "Insurance",
      value: "Insurance",
    },
    {
      label: "Feedback",
      value: "Feedback",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  const contactDetails = [
    {
      contact: "contact@skbikes.com",
      icon: email,
      name: "Email Icon",
    },
    {
      contact: "+91 9790905989",
      icon: whatsapp,
      name: "Whatsapp Icon",
    },
    {
      contact: "+91 8111033297",
      icon: phone,
      name: "Phone Icon",
    },
  ];

  const socialIcons = [
    {
      name: "Instagram Icon",
      icon: instagram,
    },
    {
      name: "Twitter Icon",
      icon: twitter,
    },
    {
      name: "Facebook Icon",
      icon: facebook,
    },
  ];

  const [contactMessage, setContactMessage] = useState(false);

  const enquiryForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      about: "",
      message: "",
    },
    onSubmit: async (values) => {
      let enquiry = await fetch("https://sk-bike-app-backend.onrender.com/enquires", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (enquiry.status == 200) {
        setContactMessage(true);
      }
    },
  });
  const isContactFontSizeMatches = useMediaQuery("(min-width:768px)");
  const isContentOverlaps = useMediaQuery("(min-width:1110px)");
  const isFontSizeLarge = useMediaQuery("(min-width:895px)");
  return (
    <div className="contactPage" id="contact">
      <div className="titleSection">
        <span> Contact Us</span>
      </div>
      <div
        className={
          isContentOverlaps
            ? "contactPageComponents"
            : "tabResContactPageComponents"
        }
      >
        <div
          className={
            isContentOverlaps
              ? "enquiryFormSection"
              : "tabResEnquiryFormSection"
          }
        >
          {contactMessage ? (
            <Paper elevation={8}>
              <div className="closeButtonSection">
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => setContactMessage(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <span style={{ padding: "10px" }}>
                Thank You for contacting us!
              </span>
            </Paper>
          ) : (
            <Paper
              elevation={8}
              className="formPaper"
              style={{ borderRadius: "20px" }}
            >
              <form onSubmit={enquiryForm.handleSubmit} className="enquiryForm">
                <span
                  style={
                    isContactFontSizeMatches
                      ? { fontSize: "30px" }
                      : { fontSize: "20px" }
                  }
                >
                  Got anything to say / ask?
                </span>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  type="name"
                  name="name"
                  variant="standard"
                  onChange={enquiryForm.handleChange}
                  onBlur={enquiryForm.handleBlur}
                />
                {enquiryForm.touched.name ? (
                  enquiryForm.values.name == "" ? (
                    <span style={{ color: "red" }}>Name is required!</span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  variant="standard"
                  onChange={enquiryForm.handleChange}
                  onBlur={enquiryForm.handleBlur}
                />
                {enquiryForm.touched.email ? (
                  enquiryForm.values.email == "" ? (
                    <span style={{ color: "red" }}>Email is required!</span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  type="phone"
                  name="phone"
                  variant="standard"
                  onChange={enquiryForm.handleChange}
                  onBlur={enquiryForm.handleBlur}
                />
                {enquiryForm.touched.phone ? (
                  enquiryForm.values.phone == "" ? (
                    <span style={{ color: "red" }}>
                      Phone Number is required!
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  id="enquiryOptions"
                  fullWidth
                  select
                  label="Select"
                  variant="standard"
                  name="about"
                  onChange={enquiryForm.handleChange}
                  onBlur={enquiryForm.handleBlur}
                >
                  {enquiryType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {enquiryForm.touched.about ? (
                  enquiryForm.values.about == "" ? (
                    <span style={{ color: "red" }}>Select Options</span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  id="message"
                  label="Message"
                  name="message"
                  type="text"
                  fullWidth
                  multiline
                  rows={5}
                  onChange={enquiryForm.handleChange}
                  onBlur={enquiryForm.handleBlur}
                />
                {enquiryForm.touched.message ? (
                  enquiryForm.values.message == "" ? (
                    <span style={{ color: "red" }}>
                      Type your message to us.
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <motion.div
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button type="submit">
                    <Paper
                      elevation={8}
                      className="enquiryButton"
                      style={{ backgroundColor: "#EDCD00", fontSize: "25px" }}
                    >
                      Send
                    </Paper>
                  </Button>
                </motion.div>
              </form>
            </Paper>
          )}
        </div>
        <div
          className={
            isContentOverlaps
              ? "contactDetailsSection"
              : "tabResContactDetailsSection"
          }
        >
          {contactDetails.map((data) => (
            <div
              className={
                isContentOverlaps ? "contactDetails" : "tabResContactDetails"
              }
            >
              <Paper
                elevation={8}
                className={
                  isFontSizeLarge ? "contactIcon" : "tabResContactIcon"
                }
                style={{ borderRadius: "50%", backgroundColor: "#EDCD00" }}
              >
                <img
                  src={data.icon}
                  alt={data.name}
                  style={
                    isFontSizeLarge ? { width: "50px" } : { width: "30px" }
                  }
                />
              </Paper>
              <span
                style={
                  isFontSizeLarge
                    ? { fontSize: "30px", color: "white" }
                    : { fontSize: "20px", color: "white" }
                }
              >
                {data.contact}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="socialMediaSection">
        {socialIcons.map((data) => (
          <Paper
            elevation={8}
            className={isFontSizeLarge ? "socialIcon" : "tabResSocialIcon"}
            style={{ borderRadius: "50%", backgroundColor: "#EDCD00" }}
          >
            <img
              src={data.icon}
              alt={data.name}
              style={isFontSizeLarge ? { width: "50px" } : { width: "30px" }}
            />
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default Contact;