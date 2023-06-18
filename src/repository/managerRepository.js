const Manager = require("../models/manager")

const getAll = async () => {
    const foundAll = await Manager.find({ status: true })
    return foundAll
}

const getManagerById = async (id) => {
    const foundManById = await Manager.findOne({ _id: id, status: true })
    return foundManById
}

const getManagerByEmail = async (email) => {
    const foundManByEmail = await Manager.findOne({ email })
    return foundManByEmail
}

const deleteManagerById = async (id) => {
    return await Manager.updateOne({ _id: id }, { $set: { status: false } })
}

const updateManager = async (id, obj) => {
    return await Manager.findByIdAndUpdate(id,
        {
            $set: obj
        },
        { new: true })
}

module.exports = {
    getAll,
    getManagerById,
    getManagerByEmail,
    deleteManagerById,
    updateManager
}

