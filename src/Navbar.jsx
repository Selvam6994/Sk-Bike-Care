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

function Navbar() {
  const resNavbarButtons = useMediaQuery("(min-width:1028px)");
  const resLoginForm = useMediaQuery("(min-width:570px)");
  const resNavbar = useMediaQuery("(min-width:600px)");
  const navOptions = [
    {
      name: "Home",
      navgateTo: "/",
      backGroundColor: "#EDCD00",
    },
    {
      name: "About Us",
      navgateTo: "about",
      backGroundColor: "#EDCD00",
    },
    {
      name: "Our Services",
      navgateTo: "services",
      backGroundColor: "#EDCD00",
    },
    {
      name: "Contact",
      navgateTo: "contact",
      backGroundColor: "#EDCD00",
    },
  ];

  const [logInForm, setLogInForm] = useState(false);
  const [userAccountForm, setuserAccountForm] = useState(false);
  const [otpVerifyForm, setOtpVerifyForm] = useState(false);
  const [newPinSetForm, setnewPinSetForm] = useState(false);
  const [resetPinOtpForm, setresetPinOtpForm] = useState(false);
  const [resetPinForm, setResetPinForm] = useState(false);
  const [userHistory, setUserHistory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dropDown, setDropDown] = useState(false);

  // form validation

  const loginForm = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },

    onSubmit: async (values) => {
      let logInData = await fetch("http://localhost:4000/logIn", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (logInData.status == 200) {
        let token = await logInData.json();
        sessionStorage.setItem("authrisationToken", token.token);

        setLogInForm(false);
      } else {
        setErrorMessage("Invalid Credentials");
      }
    },
  });

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      let signUpData = await fetch("http://localhost:4000/signUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (signUpData.status == 201) {
        setOtpVerifyForm(true);
        setuserAccountForm(false);
        setErrorMessage("");
        document.getElementById("otp").value = "";
        console.log("email sent");
      } else if (signUpData.status == 400 || signUpData.status == 401) {
        setErrorMessage("Invalid credentials try any other email");
      }
    },
  });

  const signUpOtpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      let otpData = await fetch(
        "http://localhost:4000/signUp/otpVerification",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (otpData.status == 200) {
        setnewPinSetForm(true);
        setErrorMessage("");
        document.getElementById("otp").value = "";
      } else if (otpData.status == 400) {
        setErrorMessage("OTP does not match");
      }
    },
  });

  const setNewPasscode = useFormik({
    initialValues: {
      name: "",
      phone: "",
      pin: "",
      confirmPin: "",
    },
    onSubmit: async (values) => {
      let userData = await fetch(
        `http://localhost:4000/signUp/${signUpForm.values.email}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (userData.status == 200) {
        setuserAccountForm(false);
        setOtpVerifyForm(false);
        setErrorMessage("");
      } else if (userData.status == 400) {
        setErrorMessage("Check the pin number");
      }
    },
  });

  const resetOtpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const resetPasscodeForm = useFormik({
    initialValues: {
      pin: "",
      confirmPin: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function switchuserAccountForm() {
    if (
      !userAccountForm &&
      !otpVerifyForm &&
      !resetPinOtpForm &&
      !resetPinForm
    ) {
      return (
        <>
          <form className="logInForm" onSubmit={loginForm.handleSubmit}>
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              name="email"
              variant="standard"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.touched.email ? (
              loginForm.values.email == "" ? (
                <span style={{ color: "red" }}>Email is required</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <TextField
              id="pin"
              label="Passcode"
              type="number"
              name="pin"
              variant="standard"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />

            {loginForm.touched.pin ? (
              loginForm.values.pin == "" ? (
                <span style={{ color: "red" }}>Pin is required</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <span style={{ color: "red" }}>{errorMessage}</span>
            <Button type="submit">
              <motion.div
                className="box"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setLogInForm(true)}
              >
                <Paper
                  className="logInButton"
                  style={{ backgroundColor: "#EDCD00" }}
                >
                  Log In
                </Paper>
              </motion.div>
            </Button>
          </form>
          <motion.div
            className="userAccountButtonSection"
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setuserAccountForm(true)}
          >
            <Paper
              className="userAccountButton"
              style={{ backgroundColor: "#EDCD00" }}
            >
              New User?
            </Paper>
          </motion.div>
          <motion.div
            className="userAccountButtonSection"
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setresetPinOtpForm(true)}
          >
            <Paper
              className="userAccountButton"
              style={{ backgroundColor: "#EDCD00" }}
            >
              Forgot Pin?
            </Paper>
          </motion.div>
        </>
      );
    } else if (userAccountForm) {
      return (
        <form className="userAccountForm" onSubmit={signUpForm.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            variant="standard"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
          />{" "}
          {signUpForm.touched.email ? (
            signUpForm.values.email == "" ? (
              <span style={{ color: "red" }}>Email is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <span style={{ color: "red" }}>{errorMessage}</span>
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button type="submit">
              <Paper
                className="logInButton"
                style={{ backgroundColor: "#EDCD00" }}
              >
                Send OTP
              </Paper>
            </Button>
          </motion.div>
        </form>
      );
    } else if (otpVerifyForm && !newPinSetForm) {
      return (
        <form className="userAccountForm" onSubmit={signUpOtpForm.handleSubmit}>
          <span>Check Your Email</span>
          <TextField
            id="otp"
            label="OTP"
            type="number"
            name="otp"
            variant="standard"
            onChange={signUpOtpForm.handleChange}
            onBlur={signUpOtpForm.handleBlur}
          />
          {signUpOtpForm.touched.otp ? (
            signUpOtpForm.values.otp == "" ? (
              <span style={{ color: "red" }}>Otp is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <span style={{ color: "red" }}>{errorMessage}</span>
          <Button type="submit">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Paper
                className="logInButton"
                style={{ backgroundColor: "#EDCD00" }}
              >
                Verify OTP
              </Paper>
            </motion.div>
          </Button>
        </form>
      );
    } else if (newPinSetForm) {
      return (
        <form
          className="userAccountForm"
          onSubmit={setNewPasscode.handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            type="text"
            name="name"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.name ? (
            setNewPasscode.values.name == "" ? (
              <span style={{ color: "red" }}>Name is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="phone"
            label="Phone"
            type="number"
            name="phone"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.phone ? (
            setNewPasscode.values.phone == "" ? (
              <span style={{ color: "red" }}>Phone Number is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="pin"
            label="New Pin"
            type="number"
            name="pin"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.pin ? (
            setNewPasscode.values.pin == "" ? (
              <span style={{ color: "red" }}>Pin is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="confirmPin"
            label="Confirm Pin"
            type="number"
            name="confirmPin"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.confirmPin ? (
            setNewPasscode.values.confirmPin == "" ? (
              <span style={{ color: "red" }}>
                Please confirm the Pin number
              </span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <span style={{ color: "red" }}>{errorMessage}</span>
          <Button type="submit">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Paper
                className="logInButton"
                style={{ backgroundColor: "#EDCD00" }}
              >
                Submit
              </Paper>
            </motion.div>
          </Button>
        </form>
      );
    } else if (resetPinOtpForm) {
      return (
        <form className="userAccountForm" onSubmit={resetOtpForm.handleSubmit}>
          <span>Check Your Email</span>
          <TextField
            id="otp"
            label="OTP"
            type="number"
            name="otp"
            variant="standard"
            onChange={resetOtpForm.handleChange}
          />
          <Button type="submit">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => setResetPinForm(true) || setresetPinOtpForm(false)}
            >
              <Paper
                className="logInButton"
                style={{ backgroundColor: "#EDCD00" }}
              >
                Verify OTP
              </Paper>
            </motion.div>
          </Button>
        </form>
      );
    } else if (resetPinForm && logInForm) {
      return (
        <form
          className="userAccountForm"
          onSubmit={resetPasscodeForm.handleSubmit}
        >
          <TextField
            id="pin"
            label="New Pin"
            type="number"
            name="pin"
            variant="standard"
            onChange={resetPasscodeForm.handleChange}
          />
          <TextField
            id="confirmPin"
            label="Confirm Pin"
            type="number"
            name="confirmPin"
            variant="standard"
            onChange={resetPasscodeForm.handleChange}
          />

          <Button type="submit">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() =>
                setuserAccountForm(false) ||
                setOtpVerifyForm(false) ||
                setResetPinForm(false)
              }
            >
              <Paper
                className="logInButton"
                style={{ backgroundColor: "#EDCD00" }}
              >
                Submit
              </Paper>
            </motion.div>
          </Button>
        </form>
      );
    }
  }

  function logInButton() {
    if (logInForm) {
      return (
        <Paper
          className={resLoginForm ? "logInFormPaper" : "resLogInFormPaper"}
        >
          <div className="closeButtonSection">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() =>
                setLogInForm(false) ||
                setuserAccountForm(false) ||
                setOtpVerifyForm(false) ||
                setresetPinOtpForm(false) ||
                setResetPinForm(false) ||
                setErrorMessage("")
              }
            >
              <CloseIcon />
            </IconButton>
          </div>
          {switchuserAccountForm()}
        </Paper>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={resNavbar ? "navBar" : "tabResNavBar"}>
      <div className={resNavbar ? "navLogoSection" : "resNavLogoSection"}>
        <img src={appLogo} alt="Logo" />
      </div>

      {!resNavbarButtons ? (
        <div
          className={resNavbar ? "navButtonsSection" : "resNavButtonsSection"}
        >
          {logInButton()}
          <div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{ marginRight: "50px" }}
            >
              <Paper elevation={8}>
                {dropDown == false ? (
                  <IconButton
                    onClick={() => setDropDown(true) || setLogInForm(false)}
                    aria-label="menu"
                    size="large"
                  >
                    <MenuIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => setDropDown(false)}
                    aria-label="menu open"
                    size="large"
                  >
                    <MenuOpenIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Paper>
            </motion.div>
            {dropDown == true ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <Paper elevation={8} className="dropDown">
                  {navOptions.map((options) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: options.transDelay,
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                          damping: 10,
                          stiffness: 100,
                          restDelta: 0.001,
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <a
                          href={`#${options.navgateTo} `}
                          className="nav-link scrollto"
                        >
                          <Button>
                            {" "}
                            <Paper elevation={4} className="dropDownOption">
                              {options.name}
                            </Paper>
                          </Button>
                        </a>
                      </motion.div>
                    </motion.div>
                  ))}
                  {sessionStorage.length != 0 ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {/* `${sessionStorage.getItem("authrisationToken")}` */}
                        <Link
                          to="serviceHistory"
                          style={{ textDecoration: "none" }}
                        >
                          <Paper
                            className="navButtons"
                            elevation={8}
                            style={{ backgroundColor: "#EDCD00" }}
                          >
                            Service History
                          </Paper>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        onClick={() =>
                          sessionStorage.clear() || window.location.reload()
                        }
                      >
                        <Paper
                          className="navButtons"
                          elevation={8}
                          style={{ backgroundColor: "#EDCD00" }}
                        >
                          Log Out
                        </Paper>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      onClick={() =>
                        setLogInForm(true) || setnewPinSetForm(false)
                      }
                    >
                      <Paper
                        className="navButtons"
                        elevation={8}
                        style={{ backgroundColor: "#EDCD00" }}
                      >
                        Log In
                      </Paper>
                    </motion.div>
                  )}
                </Paper>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="navButtonsSection">
          {navOptions.map((data) => (
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a href={`#${data.navgateTo} `} className="nav-link scrollto">
                <Paper
                  className="navButtons"
                  elevation={8}
                  style={{ backgroundColor: data.backGroundColor }}
                >
                  {data.name}
                </Paper>
              </a>
            </motion.div>
          ))}

          {sessionStorage.length != 0 ? (
            <>
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="serviceHistory"
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    className="navButtons"
                    elevation={8}
                    style={{ backgroundColor: "#EDCD00" }}
                  >
                    Service History
                  </Paper>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() =>
                  sessionStorage.clear() || window.location.reload()
                }
              >
                <Paper
                  className="navButtons"
                  elevation={8}
                  style={{ backgroundColor: "#EDCD00" }}
                >
                  Log Out
                </Paper>
              </motion.div>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => setLogInForm(true) || setnewPinSetForm(false)}
            >
              <Paper
                className="navButtons"
                elevation={8}
                style={{ backgroundColor: "#EDCD00" }}
              >
                Log In
              </Paper>
            </motion.div>
          )}

          {logInButton()}
        </div>
      )}

      {userHistory ? (
        <Paper className="userHistoryTab" elevation={8}>
          <div className="closeButtonSection">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setUserHistory(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Paper>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
