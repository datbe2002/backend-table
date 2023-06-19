const mongoose = require("mongoose");
require("dotenv").config();
var Manager = require('./models/manager.js');
const AvailableTime = require("./models/availableTime.js");
const Position = require("./models/position.js");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/swd392");

        console.log("Connected to MongoDB");
        // const example = [
        //     {
        //         position: "Outdoor",
        //         baseDeposit: "50000"
        //     },
        //     {
        //         position: "Inside",
        //         baseDeposit: "20000"
        //     },
        //     {
        //         position: "Upstair",
        //         baseDeposit: "30000"
        //     },

        // ];
        // // const insertedData = await Position.insertMany(example)
        // console.log(insertedData)
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = {
    connect,
};
