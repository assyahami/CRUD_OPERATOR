const apiResponse = require("./apiResponse")

const sendToken = (user) => {
        const generateJWTToken = user.generateJWTToken()
        let response = {
            name:user.name,
            phone:user.phone,
            qualification:user.qualification,
            gender:user.gender,
            email:user.email,
            DOB:user.DOB,
            profile_url:user.profile_url,
            country:user.country,
            state:user.state,
            hobbies:user.hobbies,
            token: generateJWTToken,
            user_id: user.id
        }
        return response
}

module.exports = {
    sendToken
}