const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerHasReservation = new mongoose.Schema({
    updatedTime: {
        type: Date,
        required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    }
});

var ManagerHasReservation = mongoose.model(
    "Managerhasreservation",
    managerHasReservation
);
module.exports = ManagerHasReservation;
