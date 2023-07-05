const reservationService = require('../service/reservationService')
const reservationRepository = require('../repository/reservationRepository')

const placeTable = async (req, res, next) => {
    try {
        const reservation = await reservationService.checkingReservation(req, res)
        res.status(200).json({ message: 'success', reservation })
    } catch (error) {
        next(error)
    }
}

const getAllReservationsUserIdStatus = async (req, res, next) => {
    try {
        const { status } = req.body
        const { _userId } = req.params
        const allReservations = await reservationRepository.getAllReservationsByUserIdAndStatus(status, _userId)
        res.status(200).json({ message: 'success', allReservations })
    } catch (error) {
        next(error)
    }
}

const getAllReservationsByUserId = async (req, res, next) => {
    try {
        const { _userId } = req.params
        const allReservations = await reservationRepository.getReservationsByUser(_userId)
        res.status(200).json({ message: 'success', allReservations })
    } catch (error) {
        next(error)
    }
}

const getReserservationById = async (req, res, next) => {
    try {
        const { _reservationId } = req.params
        const reservation = await reservationRepository.getReserservationById(_reservationId)
        res.status(200).json({ message: 'success', reservation })

    } catch (error) {
        next(error)

    }
}

module.exports = {
    placeTable,
    getAllReservationsUserIdStatus,
    getAllReservationsByUserId,
    getReserservationById
}