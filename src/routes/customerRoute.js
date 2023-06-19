const express = require("express");

import customerController from "../controller/customerController";
import adminAuth from "../middleware/adminAuth.middleware";

const router = express.Router();

router.get("/", adminAuth,customerController.getAllCustomer);
router.get("/:_id", customerController.getCustomerById);
router.post("/login", customerController.loginCustomer);
router.post("/register", customerController.regisNewCustomer);
router.put("/update/:_id", customerController.updateCustomer);
// router.post("/delete/:_id", customerController.deleteCustomer);

module.exports = router;
