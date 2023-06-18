const mongoose = require("mongoose");
require("dotenv").config();
var Manager = require('./models/manager.js')

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/swd392");
    console.log("Connected to MongoDB");
    const exampleManager = [
      {
        name: "Namdeptrai",
        phone: 123123,
        email: "namhuynh2610@gmail.com",
        password: "123123213213",
        address: "tesstttt",
        status: false,
        role: 2,
      },{
        name: "nam rat dep trai",
        phone: 12312354,
        email: "namhuynh2610@gmail.com",
        password: "1212313",
        address: "tesstttt222222",
        status: false,
        role: 1,
      },
    ];
    const insertedData = await Manager.insertMany(exampleManager)
    console.log('Example data inserted:', insertedData);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = {
  connect,
};
