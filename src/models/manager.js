const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
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
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
});

var Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
