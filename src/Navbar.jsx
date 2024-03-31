import { Button, Paper, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import React, { useState } from "react";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import appLogo from "./assets/App Images/Navbar Logo/App logo.png";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import Menudropdown from "./Menudropdown";

function Navbar() {
  const tabResponsive = useMediaQuery("(min-width:1000px)");
  const buttons = [
    {
      name: "Home",
      route: "#/",
    },
    {
      name: "About",
      route: "#about",
    },
    {
      name: "Services",
      route: "#services",
    },
    {
      name: "Contact",
      route: "#contact",
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [signUpform, setSignupForm] = useState(false);
  const [forgotPassword, setForgotPasswordForm] = useState(false);
  // const [userButtons, setuserButtons] = useState("");

  const token = sessionStorage.getItem("userAuth");
  // formik
  const logInUser = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },
    onSubmit: async (values) => {
      let userData = await fetch("https://sk-bike-app-backend.onrender.com/logIn", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (userData.status == 200) {
        // setuserButtons();
        setOpenForm(false);
        const token = await userData.json();
        // setUserToken(token.token);
        sessionStorage.setItem("token", token.token);
      }
    },
  });

  return (
    <div className="navBar">
      <div className="navContent">
        <img className="appLogo" src={appLogo} alt="appLogo" />
        {tabResponsive ? (
          <div className="navButtonSection">
            {buttons.map((button) => (
              <a href={button.route} className="nav-link scrollto">
                <motion.div
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Paper
                    className="navButton"
                    style={{ backgroundColor: "#edcd00", borderRadius: "10px" }}
                    elevation={16}
                  >
                    {button.name}
                  </Paper>
                </motion.div>
              </a>
            ))}

            {sessionStorage.getItem("token") ? (
              <div className="userButtons">
                <Link to="serviceHistory" style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Paper
                      className="navButton"
                      style={{
                        backgroundColor: "#edcd00",
                        borderRadius: "10px",
                      }}
                      elevation={16}
                    >
                      Your History
                    </Paper>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                >
                  <Paper
                    className="navButton"
                    style={{ backgroundColor: "#edcd00", borderRadius: "10px" }}
                    elevation={16}
                  >
                    Log out
                  </Paper>
                </motion.div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() =>
                  setOpenForm(true) ||
                  setSignupForm(false) ||
                  setForgotPasswordForm(false)
                }
              >
                <Paper
                  className="navButton"
                  style={{ backgroundColor: "#edcd00", borderRadius: "10px" }}
                  elevation={16}
                >
                  Log in
                </Paper>
              </motion.div>
            )}
          </div>
        ) : (
          <Menudropdown />
        )}
      </div>
      {openForm ? (
        <div className="userFormSection">
          {!signUpform && !forgotPassword ? (
            <Paper elevation={16} className="userForm">
              <div className="closeButtonSection">
                <IconButton onClick={() => setOpenForm(false)}>
                  <CloseIcon color="error" />
                </IconButton>
              </div>
              <span>Log In</span>
              <form
                className="formTextFields"
                onSubmit={logInUser.handleSubmit}
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  variant="standard"
                  onChange={logInUser.handleChange}
                />
                <TextField
                  id="pin"
                  label="Pass Code"
                  type="number"
                  name="pin"
                  variant="standard"
                  onChange={logInUser.handleChange}
                />
                <Button type="submit">Login</Button>
              </form>

              <Button
                onClick={() =>
                  setSignupForm(true) || setForgotPasswordForm(false)
                }
              >
                New to our site?
              </Button>
              <Button onClick={() => setForgotPasswordForm(true)}>
                Forgot Password?
              </Button>
            </Paper>
          ) : !forgotPassword ? (
            <Paper elevation={16} className="userForm">
              <div className="closeButtonSection">
                <IconButton onClick={() => setOpenForm(false)}>
                  <CloseIcon color="error" />
                </IconButton>
              </div>
              <span>Sign Up</span>
              <form
                className="formTextFields"
                onSubmit={logInUser.handleSubmit}
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  variant="standard"
                  onChange={logInUser.handleChange}
                />
                <Button type="submit">Verify Email</Button>
              </form>
            </Paper>
          ) : (
            <Paper elevation={16} className="userForm">
              <div className="closeButtonSection">
                <IconButton onClick={() => setOpenForm(false)}>
                  <CloseIcon color="error" />
                </IconButton>
              </div>
              <span>Forgot PassCode?</span>
              <form
                className="formTextFields"
                onSubmit={logInUser.handleSubmit}
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  variant="standard"
                  onChange={logInUser.handleChange}
                />
                <Button type="submit">Send OTP</Button>
              </form>
            </Paper>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
