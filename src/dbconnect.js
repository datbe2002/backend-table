const mongoose = require('mongoose');
require("dotenv").config();
const Manager = require('./models/manager')


async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

    const exampleData = [
        {
            name: "John Doe",
            phone: 1234567890,
            email: "john@example.com",
            password: "password123",
            address: "123 Main Street",
            status: true,
            role: 1,
        },
        {
            name: "John Doe",
            phone: 1234567890,
            email: "john@example.com",
            password: "password123",
            address: "123 Main Street",
            status: true,
            role: 1,
        },
    ];

    const insertedData = await Manager.insertMany(exampleData);
    console.log('Example data inserted:', insertedData);
}

module.exports = {
    connect,
};

