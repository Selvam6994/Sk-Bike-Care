import { Card, CardContent, CardMedia, Paper } from "@mui/material";
import React from "react";
import serviceCardImage from "../src/assets/App Images/Bike Images/Servicespage Image.jpg";
import multiBrandImage from "../src/assets/App Images/About Page Icon/Multi-Brand Icon.png";
function About() {
  const featuresContent = [
    {
      name: "Multi-brand Options",
      image: multiBrandImage,
    },
    {
      name: "Genuine OEM Parts",
      image: multiBrandImage,
    },
    {
      name: "Email Tracking",
      image: multiBrandImage,
    },
    {
      name: "Quality Standards",
      image: multiBrandImage,
    },
  ];
  return (
    <div className="aboutPage" id="about">
      <Card className="aboutUsCard" elevation={16}>
        <CardMedia
          sx={{ height: "fitContent", width: "100%", }}
          image={serviceCardImage}
          title="Royal Enfield"
        >
          <CardMedia
            sx={{ height: "fitContent", width: "100%", padding: "50px" }}
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <CardContent className="aboutUsContent">
              <span>About Us</span>
              <p>
                We are a Coimbatore-based two-wheeler repair and service station
                offering the best in class services. We service all{" "}
                <span> major two-wheeler brands,</span> including{" "}
                <span>electric vehicles</span>
              </p>
            </CardContent>
            <div className="featuresSection">
              {featuresContent.map((data) => (
                <div className="features">
                  <Paper
                    elevation={8}
                    className="featuresIcons"
                    style={{ borderRadius: "50%", backgroundColor: "#EDCD00" }}
                  >
                    <img
                      style={{ width: "100px" }}
                      src={data.image}
                      alt={data.name}
                    />
                  </Paper>
                  <span>{data.name}</span>
                </div>
              ))}
            </div>
          </CardMedia>
        </CardMedia>
      </Card>
    </div>
  );
}

export default About;
