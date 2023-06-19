const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ApiError } = require("./apiError");
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "INVALID TOKEN");
        }
        const currentUser = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, payload) => {
                if (!err) {
                    return payload;
                }
                throw new ApiError(httpStatus.UNAUTHORIZED, "BAD REQUEST");
            }
        );

        if (currentUser.role !== "Admin") {
            throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
        }

        req.currentUser = currentUser;
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = adminAuth;