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



const updateUser = async (req, res, next) => {
    try {

        const body = req.body
        const id = req.user.user_id
        const findUser = await Users.findById(id)

        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const updatedUser = await Users.findByIdAndUpdate(id, {
            ...body
        }, { new: true }).select("-__v")
        let send = {};
        send.user = updatedUser;
        send.message = "Successfully updated user";
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const updateUserProfilePic = async (req, res, next) => {
    try {

        const body = req.body
        const id = req.user.user_id
        const profilePic = req.file.path
        const cloundinary = await cloudinary.uploader.upload(profilePic)
        const findUser = await Users.findById(id)
        let profile_url = ''
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const updateProfileUserPic = await Users.findByIdAndUpdate(id, {
            profile_url: cloundinary.secure_url
        }, { new: true }).select("-__v")
        let send = {};
        send.user = updateProfileUserPic;
        send.message = "Successfully updated user profile";
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const deleteUser = async (req, res, next) => {
    try {

        const body = req.body
        const id = req.user.user_id
        const findUser = await Users.findById(id)
        let send = {}
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const deletedUsers = await Users.findByIdAndDelete(id)
        send.user = deleteUser;
        send.message = "Successfully deleted user";

        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const getUser = async (req, res, next) => {
    try {
        const id = req.user.user_id
        const findUser = await Users.findById(id).select("-__v")
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        APIRES.getSuccessResult(findUser, res)
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
            res.json({ message: 'Logged out successfully!', status: false });
        });
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


module.exports = {
    loginUser,
    registerUser,
    updateUser,
    updateUserProfilePic,
    getUser,
    deleteUser,
    logoutUser
}

