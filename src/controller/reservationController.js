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

const sth = async (req, res, next) => {
    try {
        const { id } = req.body
        const reservation = await reservationRepository.checkTableForSlot(id)

        res.status(200).json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    placeTable,
    sth
}