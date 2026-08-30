const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Registration = require("./models/Registration");

const app = express();
app.use(cors());
app.use(express.json());
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(
  "MONGO_URI starts with:",
  process.env.MONGO_URI?.substring(0, 20)
);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

app.post("/api/registrations", async (req, res) => {
  try {
    const { studentName, className, mobile, event, songName } = req.body;

    if (!studentName || !className || !mobile || !event || !songName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields."
      });
    }

    const registration = new Registration({
      studentName, className, mobile, event, songName
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: registration
    });
  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
});

app.get("/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch registrations" });
  }
});

app.delete("/api/registrations/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete registration" });
  }
});

app.put("/api/registrations/:id", async (req, res) => {
  try {
    const { studentName, className, mobile, event, songName } = req.body;
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { studentName, className, mobile, event, songName },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.json({ success: true, message: "Registration updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update registration", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Freshers Party Backend Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
