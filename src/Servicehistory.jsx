import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Paper, useMediaQuery } from "@mui/material";
import appLogo from "./assets/App Images/Navbar Logo/App logo.png";

function Servicehistory() {
  const resTable = useMediaQuery("(min-width:480px)");
  const resBar = useMediaQuery("(min-width:400px)");

  let token = sessionStorage.token
  let id = jwt_decode(token);
  
const[serviceStatus,setServiceStatus]=useState([])
async function getServiceStatus (){
  const getData = await fetch(`https://sk-bike-care-backend.vercel.app/customerServiceStatus/${id.email}`,{
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  })
  
  const jsonData =await getData.json()
  if(jsonData.message=="no data"){
    setServiceStatus([])
  }else{
    setServiceStatus(jsonData)
  }
}

  // service History Data
  const [historyData, setHistoryData] = useState([]);
  async function getServiceHistory() {
    const getServiceData = await fetch(
      `https://sk-bike-care-backend.vercel.app/serviceHistory/${id.email}`,
      {
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
        },
      }
    );
    const jsonData = await getServiceData.json();
    if (jsonData.message == "Data not found") {
      setHistoryData([]);
    } else {
      setHistoryData(jsonData);
    }
  }

  useEffect(() => {
    getServiceStatus()
    getServiceHistory();
  }, []);

  function statusColor(data) {
    if (data.status == "new") {
      return "blue";
    } else if (data.status == "taken for work") {
      return "yellow";
    } else if (data.status == "ready for delivery") {
      return "green";
    }
  }

  return (
    <div className="serviceHistoryPage">
      <Paper elevation={8} className={resBar ? "infoBar" : "resInfoBar"}>
        <img src={appLogo} alt="Logo" />
        <span>{id.email}</span>
      </Paper>
      <div className="statusSection">
        <span style={{ fontWeight: "bold" }}>Booking Status</span>
        <Paper className={resTable ? "statusTable" : "resStatusTable"}>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Bike Brand</th>
                <th>Model</th>
                <th>Registration No.</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceStatus.map((data) => (
                <tr>
                  <td>{serviceStatus.indexOf(data) + 1}</td>
                  <td>{data.date}</td>
                  <td>{data.bikeBrand}</td>
                  <td>{data.model}</td>
                  <td>{data.bikeNumber}</td>
                  <td>{data.service}</td>
                  <td style={{ color: statusColor(data) }}>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
      <div className="historySection">
        <span style={{ fontWeight: "bold" }}>History</span>
        <Paper className={resTable ? "statusTable" : "resStatusTable"}>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Bike Brand</th>
                <th>Model</th>
                <th>Registration No.</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((data) => (
                <tr>
                  <td>{historyData.indexOf(data) + 1}</td>
                  <td>{data.date}</td>
                  <td>{data.bikeBrand}</td>
                  <td>{data.model}</td>
                  <td>{data.bikeNumber}</td>
                  <td>{data.service}</td>
                  <td style={{ color: statusColor(data) }}>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
    </div>
  );
}

export default Servicehistory;