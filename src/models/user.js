const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
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
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

var Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
