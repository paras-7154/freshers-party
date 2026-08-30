const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  mobile: { type: String, required: true },
  event: { type: String, required: true },
  songName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);
