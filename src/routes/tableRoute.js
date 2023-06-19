const express = require("express");

import tableController from "../controller/tableController"
import adminAuth from "../middleware/adminAuth.middleware";

const router = express.Router();
router.get("/", tableController.getAllTable);
// router.get("/:_id", managerController.getAllManagerBYid);
// router.post("/create", adminAuth, managerController.regisNewManager);
// router.post("/delete/:_id", adminAuth, managerController.deleteManager);
// router.post("/update/:_id", adminAuth, managerController.updateManager);
// router.post("/login", managerController.loginManager)
module.exports = router;