const Table = require("../models/table")


const getAll = async () => {
    const alllble = await Table.find({ status: true })
    return alllble
}

module.exports = {
    getAll,
}