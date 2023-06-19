const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
        enum: ['Outdoor', 'Inside', 'Upstair'],
        default: 'Inside'
    },
    baseDeposit: {
        type: Number,
        required: true,
        default: 0
    },
    table: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    }]
}, {
    versionKey: false
});

var Position = mongoose.model("Position", positionSchema);
module.exports = Position;
