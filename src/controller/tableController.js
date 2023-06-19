import tableRepository from '../repository/tableController'

const getAllTable = async (req, res, next) => {
    try {
        const allTable = await tableRepository.getAll()
        return res(200).json({ message: 'success', allTable })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTable
}