const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

import Manager from "../models/manager";
import managerRepository from "../repository/managerRepository"
import reservationRepository from "../repository/reservationRepository"

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
};

const comparePassword = async (passwordManagerUse, hashPassword) => {

    const match = await bcrypt.compare(passwordManagerUse, hashPassword);
    return match;
};

const genAuthToken = async (manager) => {
    const managerObj = {
        id: manager._id,
        email: manager.email,
        role: manager.role,
    };
    const token = jwt.sign(managerObj, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    return token;
}

const signInWithEmailPassword = async (email, password) => {
    try {
        // check email
        const managerEmailCheck = await managerRepository.getManagerByEmail(email);
        if (!managerEmailCheck) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
        }


        if (!(await comparePassword(password, managerEmailCheck.password))) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                "Email or password is incorrect"
            );
        }
        return managerEmailCheck;
    } catch (error) {
        throw error;
    }
}

const handleGetAllManager = async () => {
    try {
        const getall = await managerRepository.getAll()
        return getall
    } catch (error) {
        throw error
    }
}

const handleGetManagerById = async (id) => {
    try {
        const found = await managerRepository.getManagerById(id)
        return found
    } catch (error) {
        throw error
    }
}

const handleCreateNewManager = async (req, res) => {
    try {
        const manager = req.body
        const managerExisted = await managerRepository.getManagerByEmail(manager.email)
        if (managerExisted) {
            throw new ApiError(httpStatus.CONFLICT, "Email already taken")
        }
        const hashPass = await hashPassword(manager.password);

        const newManager = new Manager({
            username: manager.username,
            phone: manager.phone,
            email: manager.email,
            password: hashPass,
            address: manager.address,
            role: manager.role
        })
        await newManager.save()
        return newManager
    } catch (error) {
        throw error
    }
}

const handleUpdateManager = async (req, res) => {
    try {
        const id = req.params._id
        const obj = req.body
        const found = await managerRepository.getManagerById(id)
        if (!found) {
            throw new ApiError(httpStatus.NOT_FOUND, "Id not found")
        }
        await managerRepository.updateManager(id, obj)
    } catch (error) {
        throw (error)
    }
}

const handleDeleteManager = async (req, res) => {
    try {
        const managerId = req.params._id
        return await managerRepository.deleteManagerById(managerId)
    } catch (error) {
        throw error
    }
}

const handleClearTableForNextPlacement = async (req, res) => {
    try {
        const { _reservationId } = req.params
        const clear = await reservationRepository.clearTableForNextPlacement(_reservationId)
        return clear
    } catch (error) {
        throw error

    }
}

const handleCancelTableForNextPlacement = async (req, res) => {
    try {
        const { _reservationId } = req.params
        const clear = await reservationRepository.cancelTableForNextPlacement(_reservationId)
        return clear
    } catch (error) {
        throw error

    }
}

module.exports = {
    handleGetAllManager,
    handleGetManagerById,
    handleCreateNewManager,
    handleDeleteManager,
    signInWithEmailPassword,
    genAuthToken,
    handleUpdateManager,
    handleClearTableForNextPlacement,
    handleCancelTableForNextPlacement
}