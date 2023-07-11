const express = require("express");

import customerController from "../controller/customerController";
import adminAuth from "../middleware/adminAuth.middleware";

const router = express.Router();

router.get("/", adminAuth, customerController.getAllCustomer);
router.get("/:_id", customerController.getCustomerById);
router.post("/login", customerController.loginCustomer);
router.post("/register", customerController.regisNewCustomer);
router.post("/updatePassword/:id", customerController.updatePasswordCustomer)
router.put("/update/:_id", customerController.updateCustomer);
router.post("/forgotpassword", customerController.forgotPassword);
router.put("/reset-password/:resetToken", customerController.resetPassword)
// router.post("/delete/:_id", customerController.deleteCustomer);

module.exports = router;
