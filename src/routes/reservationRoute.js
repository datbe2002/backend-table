const express = require("express");

import reservationController from "../controller/reservationController"

const router = express.Router();
router.post("/", reservationController.placeTable);
router.post("/:_userId", reservationController.getAllReservationsUserIdStatus)
router.get("/:_userId", reservationController.getAllReservationsByUserId)
router.get("/detail/:_reservationId", reservationController.getReserservationById)

module.exports = router;