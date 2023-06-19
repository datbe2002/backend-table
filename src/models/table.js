const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position",
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    numOfChair: {
        type: Number,
        enum: [2, 4, 6, 8, 10],
        required: true,
    },
});

var Table = mongoose.model("Table", tableSchema);
module.exports = Table;
