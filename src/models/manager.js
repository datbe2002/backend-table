const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: false,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager'],
    default: 'Manager'
  },
  changedReservation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Managerhasreservation",
    }
  ]

}, {
  timestamps: true,
  versionKey: false
});

var Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
