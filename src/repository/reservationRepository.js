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

const getAllReservations = async () => {
    const all = await Reservation.find().populate('user', ['username']).populate('table', ['name'])
    return all
}

const getAllReservationsByUserIdAndStatus = async (status, id) => {
    const reservations = await Reservation.find({ status, user: id }).populate('user', ['username']).populate('table', ['name'])
    return reservations
}

const getReservationsByUser = async (id) => {
    const reservations = await Reservation.find({ user: id }).populate('user', ['username']).populate('table', ['name'])
    return reservations
}

const getReserservationById = async (id) => {
    const reser = await Reservation.findById(id).populate('table', ['name'])
    return reser
}

const clearTableForNextPlacement = async (id) => {
    return Reservation.updateOne({ _id: id }, {
        $unset: { table: null },
        $set: { status: "Success" }
    })
}

const cancelTableForNextPlacement = async (id) => {
    return Reservation.updateOne({ _id: id }, {
        $unset: { table: null },
        $set: { status: "Cancelled" }
    })
}

const dateChecking = async (dateUser) => {
    try {
        console.log("27 " + dateUser)
        const startOfDay = new Date(dateUser);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(dateUser);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const reservations = await Reservation.find({
            dateTime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        console.log("hello from repo" + reservations)

        const matchingReservations = reservations.some((reservation) => {
            const reservationDate = new Date(reservation.dateTime);

            console.log(reservationDate.getTime() === dateUser.getTime())
            return reservationDate.getTime() === dateUser.getTime();
        });

        return matchingReservations;

    } catch (error) {
        throw error
    }
}


module.exports = {
    getAllReservationsByUserIdAndStatus,
    checkTableForSlot,
    getReservationsByUser,
    getReserservationById,
    dateChecking,
    clearTableForNextPlacement,
    cancelTableForNextPlacement,
    getAllReservations
}