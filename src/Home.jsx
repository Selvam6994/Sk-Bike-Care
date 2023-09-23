import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import caroselImage1 from "../src/assets/App Images/Bike Images/Image 1.jpg";
import caroselImage2 from "../src/assets/App Images/Bike Images/Image 2.jpg";
import caroselImage3 from "../src/assets/App Images/Bike Images/Image 3.jpg";
import { Paper, useMediaQuery } from "@mui/material";

function Home() {
  const imageAndCaption = [
    {
      image: caroselImage1,
      caption: "Unleash Your Bike's Full Potential with Our Service.",
      seviceType: "General Service",
      discount: "15",
      slideCount: "1",
    },
    {
      image: caroselImage2,
      caption: "Saddle Up for a Better Ride – Come In for Bike Service Today.",
      seviceType: "Water Wash",
      discount: "10",
      slideCount: "2",
    },
    {
      image: caroselImage3,
      caption:
        "Turning Crashes into Comebacks – Choose Us for Bike Accident Repairs.",
      seviceType: "Spare Parts",
      discount: "20",
      slideCount: "3",
    },
  ];
  const isFontSizeLarge = useMediaQuery("(min-width:600px)");
  return (
    <div className="homePage" id="/">
      <Carousel className="backGroundImage" >
        {imageAndCaption.map((data) => (
          <Carousel.Item key={data.image}>
            <img src={data.image} alt={`Slide ${data.slideCount}`}  />
            <Carousel.Caption className={isFontSizeLarge?"carouselCaption":"resCarouselCaption"}>
              <p>{data.caption}</p>
              <p>
                {data.seviceType} @ <span>{data.discount}%</span> offer
              </p>
              <a href="#services"className="nav-link scrollto">
              <motion.div
                className="box"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Paper
                  className={isFontSizeLarge?"discountServiceButton":"resDiscountServiceButton"}
                  style={{ backgroundColor: "#EDCD00" }}
                >
                  Book Service
                </Paper>
              </motion.div>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
