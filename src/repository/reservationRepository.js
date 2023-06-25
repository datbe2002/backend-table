const Reservation = require("../models/reservation")
const Table = require("../models/table")

const checkTableForSlot = async (tableId) => {
    const q = await Reservation.find({
        table: tableId,
        $or: [
            { status: "Ongoing" },
            { status: "Pending" }
        ]
    })
    return !q.length
}

const getAllReservationsByUserIdAndStatus = async (status, id) => {
    const reservations = await Reservation.find({ status, user: id }).populate('user', ['username']).populate('table', ['name'])
    return reservations
}

const getReservationsByUser = async (id) => {
    const reservations = await Reservation.find({ user: id }).populate('user', ['username']).populate('table', ['name'])
    return reservations
}



module.exports = {
    getAllReservationsByUserIdAndStatus,
    checkTableForSlot,
    getReservationsByUser
}