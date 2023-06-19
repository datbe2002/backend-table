const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availableTimeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    reservation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
        }
    ]
}, {
    versionKey: false
});

var AvailableTime = mongoose.model("availableTime", availableTimeSchema);
module.exports = AvailableTime;
