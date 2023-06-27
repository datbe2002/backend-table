import tableRepository from '../repository/tableRepository'

const getAllTable = async (req, res, next) => {
    try {
        const allTable = await tableRepository.getAll()
        return res.status(200).json({ message: 'success', allTable })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllTable
}
