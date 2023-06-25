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
    position: {
        type: String,
        required: true,
        enum: ['Outdoor', 'Inside', 'Upstair'],
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Ongoing', 'Success', 'Cancelled'],
        default: 'Pending'
    },
    slot: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    }
}, {
    timestamps: true,
    versionKey: false
});

var Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
