const Table = require("../models/table")

const getAll = async () => {
    const tables = await Table.find({ status: true })
    return tables
}

const tableByPosition = async (position) => {
    const tables = await Table.find({ position: position, status: true })
    return tables
}



module.exports = {
    getAll,
    tableByPosition
}