const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dateTime: {
        type: Date,
        required: true,
    },
    createTime: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    slot: {
        type: Number,
        required: true,
    },
    changedReservation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Managerhasreservation",
        }
    ],
    availableTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "availableTime",
    },
    table: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    }]
});

var Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
