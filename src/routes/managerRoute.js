const express = require("express");

import managerController from "../controller/managerController"
import adminAuth from "../middleware/adminAuth.middleware";

const router = express.Router();
router.get("/", managerController.getAllManager);
router.get("/:_id", managerController.getAllManagerBYid);
router.post("/create", managerController.regisNewManager);
router.post("/delete/:_id", adminAuth, managerController.deleteManager);
router.put("/update/:_id", adminAuth, managerController.updateManager);
router.post("/login", managerController.loginManager)
router.post("/clear/table/:_reservationId", managerController.clearTableForNextPlacement)
router.post("/cancel/table/:_reservationId", managerController.cancelTableForNextPlacement)
module.exports = router;