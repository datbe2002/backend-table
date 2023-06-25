const express = require("express");

import reservationController from "../controller/reservationController"

const router = express.Router();
router.post("/", reservationController.placeTable);
module.exports = router;