import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SolarSystem from "./components/SolarSystem/SolarSystem"
import Earth from "./components/Earth/Earth";
import Mars from "./components/Mars/Mars"
import "./App.css";

function App() {
  return (<div className="main">
  <Router>
      <Routes>
        <Route path="/" element={<SolarSystem />} />  
        <Route path="/Earth" element={<Earth />} />   {/* Earth Details Page */}
        <Route path="/Mars" element={<Mars />} />
      </Routes>
    </Router>
  </div>
    
  );
}

export default App;
