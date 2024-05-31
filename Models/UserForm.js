const mongoose = require("mongoose");

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
    snNo: { type: Number },

    firstName: { type: String, },

    lastName: { type: String, },

    email: { type: String, },

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
