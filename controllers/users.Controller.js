const Users = require("../models/Users");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { sendToken } = require("../utils/jwt");
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECERT
});


const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)

        const body = req.body
        const isUserExits = await Users.findOne({ phone: body.phone })
        if (isUserExits) {
            return APIRES.getExistsResult({
                message: "User already exits use different phone number",
                status: false
            }, res)
        }
        const createUser = new Users({
            ...body
        }, { versionKey: false })
        createUser.save()
        let getResp = sendToken(createUser)
        return APIRES.getSuccessResult(getResp, res)
    } catch (error) {
        if (error.code == 11000) {
            let message = `${error.keyValue.phone} ${Object.keys(error.keyValue)} already exits please use different phone number`;
            return APIRES.getErrorResult(message, res)
        }
        return APIRES.serverError(error, res)
    }
}


const loginUser = async (req, res, next) => {
    try {

        const body = req.body
        const findUser = await Users.findOne({ phone: body.phone }).select("+password")

        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const isvalidPassword = await findUser.comparePassword(body.password)
        if (!isvalidPassword) {
            return APIRES.getErrorResult({
                message: "Invalid password " + body.password,
                status: false
            }, res)
        }
        let getResp = sendToken(findUser)
        APIRES.getSuccessResult(getResp, res)
        req.session.user_id = getResp.user_id
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}



const logoutUser = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error clearing session:', err);
                return res.status(500).json({ error: 'Failed to logout!' });
            }
            res.json({ message: 'Logged out successfully!', status: true });
        });
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


module.exports = {
    loginUser,
    registerUser,
    logoutUser
}

