import {
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import serviceCardImage from "../src/assets/App Images/Bike Images/Servicepage Image.jpg";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Service() {
  const [serviceOptions, setServiceOptions] = useState([]);
  //   get service list data function
  async function showServiceData() {
    const serviceList = await fetch("https://sk-bike-app-backend.onrender.com/getServiceList");
    const jsonData = await serviceList.json();

    if (jsonData.message == "No data available") {
      setServiceOptions([]);
    } else setServiceOptions(jsonData);
  }

  useEffect(() => {
    showServiceData();
  }, []);

  const serviceType = [
    {
      name: "General Check-up",
    },
    {
      name: "Periodic Maintenance",
    },
    {
      name: "Engine Work",
    },
    {
      name: "Spares",
    },
    {
      name: "Accidental Repair",
    },
  ];
  const bikeBrand = [
    {
      name: "Tvs",
      model: [
        "Apache RTR 160",
        "Apache RTR 180",
        "Raider 125",
        "Ntorq 125",
        "iQube",
        "Sport",
        "Jupiter",
        "Radeon",
        "XL 100",
        "XL 60",
        "Scooty",
      ],
    },
    {
      name: "Hero MotoCorp",
      model: [
        "Splender Plus",
        "Splender",
        "iSmart 110",
        "Passion Pro",
        "Mastro 110",
        "Mastro 125",
        "Xpulse 200",
      ],
    },
    {
      name: "Bajaj",
      model: [
        "Pulsar 150",
        "Pulsar 125",
        "Pulsar 200NS",
        "Pulsar 180",
        "Pulsar 200F",
        "Pulsar 160NS",
        "Pulsar 160N",
        "Dominar 400",
        "Dominar 250",
        "CT 100",
        "Platina",
        "Avenger",
        "Discover 110",
        "Discover 125",
      ],
    },
    {
      name: "Mahindhra",
      model: ["Centuro", "Gusto 125", "Mojo 300", "gusto 110"],
    },
    {
      name: "Honda",
      model: [
        "X-ADV",
        "Dio",
        "CBR",
        "Navi",
        "Scoopy",
        "Sp 125",
        "Vario",
        "Activa",
        "Activa 125",
        "Shine 125",
        "Unicorn 150",
        "Unicorn 160",
        "Hornet 2.0",
      ],
    },
    {
      name: "Yamaha",
      model: [
        "YZF-R6",
        "YZF-R15",
        "MT-07",
        "MT-09",
        "Fazzio",
        "NMAX",
        "FZS-FI",
        "Fino",
        "Fascino",
        "Fascino125",
        "Ray Z",
        "Alpha",
      ],
    },
    {
      name: "Royal Enfield",
      model: [
        "Classic 350",
        "Himalayan",
        "Meteor 350",
        "Bullet 350",
        "Interceptor 650",
        "Continental GT",
        "Thunder Bird",
      ],
    },
    {
      name: "Suzuki",
      model: ["Access 125", "Gixxer 150", "Gixxer 250", "GSX-S750"],
    },
    {
      name: "Vespa",
      model: [
        "SXL 150",
        "VXL 125",
        "SXL 125",
        "Elegante 150",
        "LX 125",
        "Notte 125",
        "ZX",
        "Elettrica",
      ],
    },
    {
      name: "KTM",
      model: ["ktm 390", "ktm 200", "ktm rc 390", "ktm 125", "ktm rc 125"],
    },
    {
      name: "Aprilia",
      model: [
        "RSV4",
        "Tuono",
        "SR 125",
        "SXR 160",
        "RSV4 RR",
        "Dorsoduro",
        "SR 150",
      ],
    },
  ];

  const [cardDetails, setCardDetails] = useState("");
  const [serviceForm, setServiceForm] = useState(false);
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const checkUpForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      bikeBrand: "",
      model: "",
      bikeNumber: "",
      kms: "",
      date: "",
    },
    onSubmit: async (values) => {
      let bookingData = await fetch("https://sk-bike-app-backend.onrender.com/serviceBooking", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": sessionStorage.getItem("authrisationToken"),
        },
        body: JSON.stringify(values),
      });
      if (bookingData.status == 200) {
        setMessage(true);
      } else if (bookingData.status == 401) {
        setErrorMessage(
          "The bike with the registration number is already booked on this date."
        );
      } else {
        setErrorMessage("Please provide the registered email address");
      }
    },
  });


  function serviceBookingForm() {
    if (serviceForm) {
      return (
        <Paper
          elevation={8}
          className="serviceBookingForm"
          style={{ borderRadius: "20px" }}
        >
          <div className="closeButtonSection">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() =>
                setServiceForm(false) ||
                setMessage(false) ||
                setErrorMessage("")
              }
            >
              <CloseIcon />
            </IconButton>
          </div>
          {message ? (
            <span style={{ paddingBottom: "50px" }}>
              Your service has been booked successfully, our mechanic will call
              you shortly.
            </span>
          ) : (
            <>
              <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                Service Form
              </span>

              <form
                onSubmit={checkUpForm.handleSubmit}
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "10px",
                }}
              >
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  type="name"
                  name="name"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.name ? (
                  checkUpForm.values.name == "" ? (
                    <span style={{ color: "red" }}>
                      Customer name is required
                    </span>
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
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.email ? (
                  checkUpForm.values.email == "" ? (
                    <span style={{ color: "red" }}>
                      Registered email is required
                    </span>
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
                  type="number"
                  name="phone"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.phone ? (
                  checkUpForm.values.phone == "" ? (
                    <span style={{ color: "red" }}>
                      Phone number is required
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  id="service"
                  fullWidth
                  select
                  label="Select Service"
                  variant="standard"
                  name="service"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                >
                  {serviceType.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {checkUpForm.touched.service ? (
                  checkUpForm.values.service == "" ? (
                    <span style={{ color: "red" }}>
                      Please Select the service required
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  id="bikeBrand"
                  fullWidth
                  select
                  label="Select Brand"
                  variant="standard"
                  name="bikeBrand"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                >
                  {bikeBrand.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {checkUpForm.touched.bikeBrand ? (
                  checkUpForm.values.bikeBrand == "" ? (
                    <span style={{ color: "red" }}>
                      Seclect your bike brand
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="model"
                  label="Bike Model"
                  type="text"
                  name="model"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.model ? (
                  checkUpForm.values.model == "" ? (
                    <span style={{ color: "red" }}>
                      Mention your bike model name
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="bikeNumber"
                  label="Registeration Number"
                  type="text"
                  name="bikeNumber"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.bikeNumber ? (
                  checkUpForm.values.bikeNumber == "" ? (
                    <span style={{ color: "red" }}>
                      Registration number is required
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="kms"
                  label="KM driven"
                  type="number"
                  name="kms"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.kms ? (
                  checkUpForm.values.kms == "" ? (
                    <span style={{ color: "red" }}>
                      Kilometers driven is required
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  id="date"
                  type="date"
                  name="date"
                  variant="standard"
                  onChange={checkUpForm.handleChange}
                  onBlur={checkUpForm.handleBlur}
                />
                {checkUpForm.touched.date ? (
                  checkUpForm.values.date == "" ? (
                    <span style={{ color: "red" }}>
                      Select the date of appointment
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <span style={{ color: "red" }}>{errorMessage}</span>
                <Button type="submit">Book</Button>
              </form>
            </>
          )}
        </Paper>
      );
    } else {
      return null;
    }
  }
  const isBookingStepsSizeMatches = useMediaQuery("(min-width:740px)");
  return (
    <div className="servicePage" id="services">
      <Card
        elevation={16}
        className="bookingStepsCard"
        style={{ borderRadius: "20px" }}
      >
        <CardMedia
          sx={{ height: "fitContent", width: "100%" }}
          image={serviceCardImage}
          title="Royal Enfield"
        >
          <CardMedia
            sx={{ height: "fitContent", width: "100%",padding:"50px" }}
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <CardContent
              className={
                isBookingStepsSizeMatches
                  ? "bookingStepsContent"
                  : "tabResBookingStepsContent"
              }
            >
              <Typography
                gutterBottom
                variant={isBookingStepsSizeMatches ? "h5" : "h6"}
                component="div"
                style={{ color: "#edcd00", fontSize: "40px" }}
              >
                3 Step Booking
              </Typography>
              <div>
                <Typography variant="body2">
                  Choose the service you require.
                </Typography>
                <Typography>Enter your contact information.</Typography>
                <Typography>Let our team handle the rest.</Typography>
              </div>
            </CardContent>
            <div className="bookingCardSection">
              <span style={{ fontSize: "40px", color: "#EDCD00" }}>
                Our Services
              </span>
              <div className="serviceOptionCards">
                {serviceOptions.map((data) => (
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onMouseEnter={() => setCardDetails(data.nameOfService)}
                    onMouseLeave={() => setCardDetails()}
                    onClick={() => {
                      if (sessionStorage.length == 0) {
                        alert("kindly login to book your service.");
                      } else setServiceForm(true);
                    }}
                  >
                    <Paper
                      elevation={8}
                      className="serviceCards"
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "#EDCD00",
                      }}
                    >
                      <img src={data.imageLink} alt="" />
                      {cardDetails == data.nameOfService ? (
                        <div className="seviceCardDetails">
                          <span>{data.nameOfService}</span>
                          <span>
                            Starts @{" "}
                            <span
                              style={{ fontSize: "25px", color: "#EDCD00" }}
                            >
                              Rs.{data.price}/-
                            </span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Paper>
                  </motion.div>
                ))}
              </div>
              {serviceBookingForm()}
            </div>
          </CardMedia>
        </CardMedia>
      </Card>
    </div>
  );
}

export default Service;
