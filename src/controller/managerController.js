import { getTableByPosition } from "../repository/tableRepository";
import managerService from "../service/managerService"
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const loginManager = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const manager = await managerService.signInWithEmailPassword(email, password);
        const token = await managerService.genAuthToken(manager);
        res.status(200).json({
            manager,
            token,
        })
    } catch (error) {
        next(error)
    }
}


const getAllManager = async (req, res, next) => {
    try {
        const allManager = await managerService.handleGetAllManager();
        if (allManager.length < 1) {
            throw new ApiError(httpStatus.NOT_FOUND, "Manager Not Found");
        }
        res.status(200).json({ message: "success", allManager })
    } catch (error) {
        next(error)
    }
}

const getAllManagerBYid = async (req, res, next) => {
    try {
        const manager = await managerService.handleGetManagerById(req.params._id)
        if (!manager) {
            throw new ApiError(httpStatus.NOT_FOUND, "Manager Not Found");
        }
        res.status(200).json({ message: "success", manager })
    } catch (error) {
        next(error)
    }
}

const regisNewManager = async (req, res, next) => {
    try {
        const newManager = await managerService.handleCreateNewManager(req, res)
        const token = await managerService.genAuthToken(newManager);
        res.status(200).json({ message: "success", newManager, token })
    } catch (error) {
        next(error)
    }
}

const deleteManager = async (req, res, next) => {
    try {
        await managerService.handleDeleteManager(req, res)
        res.status(200).json({ message: "Delete manager successfully" })
    } catch (error) {
        next(error)
    }
}

const updateManager = async (req, res, next) => {
    try {
        await managerService.handleUpdateManager(req, res)
        res.status(200).json({ message: "Update manager successfully" })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllManager,
    getAllManagerBYid,
    regisNewManager,
    deleteManager,
    loginManager,
    updateManager
}