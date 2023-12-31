const express = require("express");
const router = express.Router();
import paymentController from "../controller/paymentController";



router.get('/config', paymentController.getPayment)
router.post('/create-payment-intent/:amount', paymentController.postPayment)



module.exports = router;
