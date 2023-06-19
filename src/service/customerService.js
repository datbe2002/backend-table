const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

import customerRepository from '../repository/customerRepository'
import Customer from '../models/user';


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
}


const signInWithEmailPassword = async (email, password) => {
    try {
        // check email
        const customerMailCheck = await customerRepository.getCustomerByEmail(email);
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
}


const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const dataCallFromdb = await customerRepository.findOne()
        //lam login tai day


        return dataCallFromdb

    } catch (error) {

    }
}

module.exports = {
    handleLogin
}