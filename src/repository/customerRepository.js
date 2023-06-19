const Manager = require("../models/manager")


const findOne = async () => {
    const nameFound = await Manager.find()
    return nameFound;
}



module.exports = {
    findOne
}