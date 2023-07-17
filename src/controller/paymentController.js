const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
require("dotenv").config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
})

const getPayment = async (req, res, next) => {
    try {
        res.status(200).json({
            publisableKey: process.env.STRIPE_PUBLISHABLE_KEY
        })
    } catch (error) {
        next(error)
    }
}

const postPayment = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'VND',
            amount: req.params.amount,
            automatic_payment_methods: { enabled: true },
        })
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPayment,
    postPayment
}