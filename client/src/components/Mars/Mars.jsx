import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { Slider, Button } from "@mui/material";
import axios from "axios"; // Import Axios for API requests
import "./Mars.css";

const Mars = ({ size, speed, distance }) => {
  const marsRef = useRef();
  const [angle, setAngle] = useState(0);
  const texture = useTexture("/df3d8caf-5edc-466a-8985-13136d5c4b45.jpg"); // Ensure this image exists in public folder

  useFrame(() => {
    setAngle((prev) => prev + speed / 100);
    marsRef.current.position.x = Math.cos(angle) * distance;
    marsRef.current.position.z = Math.sin(angle) * distance;
  });

  return (
    <Sphere args={[size, 32, 32]} ref={marsRef}>
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

export default function MarsApp() {
  const [size, setSize] = useState(0.8);
  const [speed, setSpeed] = useState(0.3);
  const [distance, setDistance] = useState(7);

  // Function to save settings
  const saveSettings = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/saveMarsSettings", {
        size,
        speed,
        distance,
      });
      alert(response.data.message);
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
          <Mars size={size} speed={speed} distance={distance} />
          <OrbitControls />
        </Canvas>
      </div>
      <div style={{ padding: 20, width: "30vw" }}>
        <h2>Mars Controls</h2>
        <Controls label="Size" value={size} setValue={setSize} min={0.5} max={3} step={0.1} />
        <Controls label="Speed" value={speed} setValue={setSpeed} min={0.1} max={2} step={0.1} />
        <Controls label="Orbit Distance" value={distance} setValue={setDistance} min={3} max={10} step={0.5} />
        
        {/* Save Button */}
        <Button variant="contained" color="secondary" onClick={saveSettings} style={{ marginTop: 20 }}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
