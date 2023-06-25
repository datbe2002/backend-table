const Reservation = require("../models/reservation")
const Table = require("../models/table")

// const checkSumTableForSlot = async (slot) => {
//     const tables = await Table.aggregate([
//         {
//             $group: {
//                 _id: null,
//                 total: { $sum: '$numOfChair' },
//                 tables: { $push: '$_id' }
//             }
//         },
//         {
//             $match: {
//                 total: slot
//             }
//         },
//         {
//             $lookup: {
//                 from: 'tables', // Replace with the actual collection name of tables
//                 localField: 'tables',
//                 foreignField: '_id',
//                 as: 'matchingTables'
//             }
//         }
//     ])

//     return tables;
// }

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



module.exports = {
    // checkSumTableForSlot,
    checkTableForSlot
}