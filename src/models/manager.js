const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new mongoose.Schema({
  name: {
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
}, {
  timestamps: true,
  versionKey: false
});

var Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
