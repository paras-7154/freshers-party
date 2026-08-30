const mongoose = require("mongoose");

const validPRNSchema = new mongoose.Schema({
    prn: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ValidPRN", validPRNSchema);