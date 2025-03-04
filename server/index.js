require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDb=require("./config/dbConnection")

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDb()
const earthSchema = new mongoose.Schema({
    size: Number,
    speed: Number,
    distance: Number,
  });
  
const EarthModel = mongoose.model("EarthModel", earthSchema);

  
const marsSchema = new mongoose.Schema({
    size: Number,
    speed: Number,
    distance: Number,
  });
  
  const MarsModel = mongoose.model("MarsModel", marsSchema);

  app.get("/api/getEarthSettings", async (req, res) => {
    try {
      const settings = await EarthModel.findOne().sort({ _id: -1 }); // Get the latest settings
      res.json(settings || { message: "No Earth settings found" });
    } catch (error) {
      res.status(500).json({ message: "Error fetching settings", error });
    }
  });
  
  // Fetch Mars settings
  app.get("/api/getMarsSettings", async (req, res) => {
    try {
      const settings = await MarsModel.findOne().sort({ _id: -1 });
      res.json(settings || { message: "No Mars settings found" });
    } catch (error) {
      res.status(500).json({ message: "Error fetching settings", error });
    }
  });
  
  // API Route to Save Earth Settings
  app.post("/api/saveSettings", async (req, res) => {
    const { size, speed, distance } = req.body;
  
    try {
      const settings = new EarthModel({ size, speed, distance });
      await settings.save();
      res.json({ message: "Earth settings saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving settings", error });
    }
  });
  
  // API Route to Save Mars Settings
  app.post("/api/saveMarsSettings", async (req, res) => {
    const { size, speed, distance } = req.body;
  
    try {
      const settings = new MarsModel({ size, speed, distance });
      await settings.save();
      res.json({ message: "Mars settings saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving settings", error });
    }
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));