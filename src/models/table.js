const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        enum: ['Outdoor', 'Inside', 'Upstair'],
        default: 'Inside'
    },
    baseDeposit: {
        type: Number,
        required: true,
        default: 20000
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
