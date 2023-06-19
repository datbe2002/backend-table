const Customer = require('../models/user')

const getAll = async () => {
    const foundAll = await Customer.find({ status: true })
    return foundAll
}

const getCustomerById = async (id) => {
    const foundManById = await Customer.findOne({ _id: id, status: true })
    return foundManById
}

const getCustomerByEmail = async (email) => {
    const foundManByEmail = await Customer.findOne({ email })
    return foundManByEmail
}

const deleteCustomerById = async (id) => {
    return await Customer.updateOne({ _id: id }, { $set: { status: false } })
}

const updateCustomer = async (id, obj) => {
    return await Customer.findByIdAndUpdate(id,
        {
            $set: obj
        },
        { new: true })
}

module.exports = {
    getAll,
    getCustomerById,
    getCustomerByEmail,
    deleteCustomerById,
    updateCustomer
}

