import customerRepository from '../repository/customerRepository'

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const dataCallFromdb = await customerRepository.findOne()
        //lam login tai day


        return dataCallFromdb

    } catch (error) {

    }
}

module.exports = {
    handleLogin
}