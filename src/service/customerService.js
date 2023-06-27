const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

import customerRepository from "../repository/customerRepository";
import Customer from "../models/user";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePassword = async (passwordCustomerUse, hashPassword) => {
  const match = await bcrypt.compare(passwordCustomerUse, hashPassword);
  return match;
};

const genAuthToken = async (customer) => {
  const customerObj = {
    id: customer._id,
    email: customer.email,
    role: customer.role,
  };
  const token = jwt.sign(customerObj, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const genRefreshToken = async (customer) => {
  const customerObj = {
    id: customer._id,
    email: customer.email,
  };
  const token = jwt.sign(customerObj, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

const saveResetToken = async (email, token) => {

  await Customer.findOneAndUpdate({ email: email }, { resetToken: token });
};

const signInWithEmailPassword = async (email, password) => {
  try {
    // check email
    const customerMailCheck = await customerRepository.getCustomerByEmail(
      email
    );
    if (!customerMailCheck) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
    }

    if (!(await comparePassword(password, customerMailCheck.password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Email or password is incorrect"
      );
    }
    return customerMailCheck;
  } catch (error) {
    throw error;
  }
};

const handleGetAllCustomer = async () => {
  try {
    const getall = await customerRepository.getAll();
    return getall;
  } catch (error) {
    throw error;
  }
};

const handleGetCustomerById = async (id) => {
  try {
    const found = await customerRepository.getCustomerById(id);
    return found;
  } catch (error) {
    throw error;
  }
};

const handleCreateNewCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const customerExisted = await customerRepository.getCustomerByEmail(
      customer.email
    );
    if (customerExisted) {
      throw new ApiError(httpStatus.NOT_FOUND, "Email already taken");
    }
    const hashPass = await hashPassword(customer.password);
    const newCustomer = new Customer({
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      password: hashPass,
      address: customer.address,
    });
    await newCustomer.save();
    return newCustomer;
  } catch (error) {
    throw error;
  }
};

const handleUpdateCustomer = async (req, res) => {
  try {
    const id = req.params._id;
    const obj = req.body;
    await customerRepository.updateCustomer(id, obj);
  } catch (error) {
    throw error;
  }
};

const handleDeleteCustomer = async (req, res) => {
  try {
    const customerId = req.params._id;
    await customerRepository.deleteCustomerById(customerId);
  } catch (error) {
    throw error;
  }
};

const handleGetCustomerByMail = async (email) => {
  try {
    const customerMailCheck = customerRepository.getCustomerByEmail(email);
    return customerMailCheck;
  } catch (error) {
    throwerror;
  }
};

module.exports = {
  handleGetAllCustomer,
  handleGetCustomerById,
  handleCreateNewCustomer,
  handleDeleteCustomer,
  signInWithEmailPassword,
  genAuthToken,
  genRefreshToken,
  saveResetToken,
  generateResetToken,
  handleUpdateCustomer,
  handleGetCustomerByMail,
  hashPassword
};
