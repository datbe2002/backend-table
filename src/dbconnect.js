const mongoose = require("mongoose");
require("dotenv").config();
var Manager = require('./models/manager.js')

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/swd392");

        console.log("Connected to MongoDB");

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = {
    connect,
};
