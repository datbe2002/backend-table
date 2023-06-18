import customerService from "../service/customerService"

const login = async (req, res, next) => {
    try {
        const userLoginData = await customerService.handleLogin(req, res)
        return res.status(200).json(userLoginData)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
}