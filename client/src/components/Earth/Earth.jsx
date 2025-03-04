import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { Slider, Button } from "@mui/material";
import axios from "axios";
import "./earth.css";

const Earth = ({ size, speed, distance }) => {
  const earthRef = useRef();
  const [angle, setAngle] = useState(0);
  const texture = useTexture("/pexels-pixabay-87651.jpg");

  useFrame(() => {
    setAngle((prev) => prev + speed / 100);
    earthRef.current.position.x = Math.cos(angle) * distance;
    earthRef.current.position.z = Math.sin(angle) * distance;
  });

  return (
    <Sphere args={[size, 32, 32]} ref={earthRef}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

const Controls = ({ label, value, setValue, min, max, step }) => (
  <div>
    <p>{label}: {value.toFixed(2)}</p>
    <Slider value={value} onChange={(e, v) => setValue(v)} min={min} max={max} step={step} />
  </div>
);

export default function App() {
  const [size, setSize] = useState(1);
  const [speed, setSpeed] = useState(0.5);
  const [distance, setDistance] = useState(5);
  const [savedSettings, setSavedSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getSettings");
        if (response.data.length > 0) {
          const latestSettings = response.data[response.data.length - 1];
          setSize(latestSettings.size);
          setSpeed(latestSettings.speed);
          setDistance(latestSettings.distance);
          setSavedSettings(response.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/saveSettings", {
        size,
        speed,
        distance,
      });
      alert(response.data.message);
      setSavedSettings([...savedSettings, { size, speed, distance }]);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70vw", height: "100vh" }}>
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Earth size={size} speed={speed} distance={distance} />
          <OrbitControls />
        </Canvas>
      </div>
      <div style={{ padding: 20, width: "30vw" }}>
        <h2>Planet Controls</h2>
        <Controls label="Size" value={size} setValue={setSize} min={0.5} max={3} step={0.1} />
        <Controls label="Speed" value={speed} setValue={setSpeed} min={0.1} max={2} step={0.1} />
        <Controls label="Orbit Distance" value={distance} setValue={setDistance} min={3} max={10} step={0.5} />
        
        <Button variant="contained" color="primary" onClick={saveSettings} style={{ marginTop: 20 }}>
          Save Settings
        </Button>

        <h3>Saved Settings</h3>
        <ul>
          {savedSettings.map((setting, index) => (
            <li key={index}>
              Size: {setting.size}, Speed: {setting.speed}, Distance: {setting.distance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}