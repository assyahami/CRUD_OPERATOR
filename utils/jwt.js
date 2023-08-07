const apiResponse = require("./apiResponse")

const sendToken = (user) => {
        const generateJWTToken = user.generateJWTToken()
        let response = {
            user,
            token:generateJWTToken,
            user_id: user.id
        }
        return response
}
module.exports = {
    sendToken
}