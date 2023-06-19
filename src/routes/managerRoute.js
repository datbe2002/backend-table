const express = require("express");

import managerController from "../controller/managerController"
import adminAuth from "../middleware/adminAuth.middleware";

const router = express.Router();
router.get("/", managerController.getAllManager);
router.get("/:_id", managerController.getAllManagerBYid);
router.post("/create", managerController.regisNewManager);
router.post("/delete/:_id", adminAuth, managerController.deleteManager);
router.post("/update/:_id", adminAuth, managerController.updateManager);
router.post("/login", managerController.loginManager)
module.exports = router;