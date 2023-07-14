const reservationRepository = require('../repository/reservationRepository')
const tableRepository = require('../repository/tableRepository')
const customerRepository = require('../repository/customerRepository')
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const Reservation = require('../models/reservation');
const Table = require('../models/table');
const checkingReservation = async (req, res) => {
    try {
        const { noSlot, date, time, position, note, _id } = req.body




        const tableByPosition = await tableRepository.tableByPosition(position)

        const datetimeConvert = convertDateTime(date, time)


        if (tableByPosition.length < 1) {
            throw new ApiError(httpStatus.NOT_FOUND, "Not found any available table")
        }

        tableByPosition.sort((a, b) => a.numOfChair - b.numOfChair)

        let assginTable = null;

        for (let index = 0; index < tableByPosition.length; index++) {
            const element = tableByPosition[index];
            const checkTable = await reservationRepository.checkTableForSlot(element._id)
            if (element.numOfChair >= noSlot && checkTable) {
                assginTable = element;
                break
            }
        }

        if (!assginTable) {
            throw new ApiError(httpStatus.NOT_FOUND, "No table found")
        }

        const totalPriceBySlot = noSlot * assginTable.baseDeposit


        const customer = await customerRepository.getCustomerById(_id);

        const newRes = new Reservation({
            user: customer,
            dateTime: datetimeConvert,
            note: note,
            slot: noSlot,
            position: position,
            table: assginTable,
            price: totalPriceBySlot
        })

        await newRes.save()

        return newRes

    } catch (error) {
        throw error
    }
}


const convertDateTime = (dateString, timeString) => {
    const [day, month, year] = dateString.split('/');
    const [hours, minutes] = timeString.split(':');
    const dateTime = new Date(year, month - 1, day, hours, minutes);
    return dateTime
}




module.exports = {
    checkingReservation
}