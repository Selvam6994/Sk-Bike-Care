import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./Contact";
import Home from "./Home";
import Navbar from "./Navbar";
import Service from "./Service";
import About from "./About";
import Servicehistory from "./Servicehistory";


function App() {
  return (
    <div className="app">
    
      <Routes>
       <Route path="" element={<>  <Navbar /><Home/><About/><Service/><Contact/></>}/>
        <Route path="serviceHistory" element={<Servicehistory />} />
      </Routes>
    </div>
  );
}

export default App;
