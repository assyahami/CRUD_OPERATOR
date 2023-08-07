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
        const isUserExits = await Users.findOne({ email: body.email })
        if (isUserExits) {
            return APIRES.getExistsResult({
                message: "User already exits use different email",
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
        return APIRES.serverError(error, res)
    }
}


const loginUser = async (req, res, next) => {
    try {

        const body = req.body
        const findUser = await Users.findOne({ email: body.email }).select("+password")
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
        findUser.password=undefined
        let getResp = sendToken(findUser)
        APIRES.getSuccessResult(getResp, res)
        req.session.user_id = getResp.user_id
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const getUser = async (req, res, next) => {
    try {

        const body = req.body
        console.log(req.user);
        const findUser = await Users.findById(req.user.user_id).select("+password")
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        
        APIRES.getSuccessResult(findUser, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const addToShortlist = async (req, res, next) => {
    try {

        const body = req.body
        console.log(body);
        const addToList = await Users.findByIdAndUpdate(req.user.user_id, {
            $push: {
                shortlist: {
                    ...body
                }
            }
        }, { new: true })
        addToList.save()
        console.log(addToList, 'addToShortlist');
        APIRES.getSuccessResult(addToList, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const removeToShortlist = async (req, res, next) => {
    try {

        const id = req.params.id
        console.log(typeof id, 'params');
        const removeList = await Users.findByIdAndUpdate(req.user.user_id, {
            $pull: {
                shortlist: {
                    id: Number(id)
                }
            }
        }, { new: true })
        removeList.save()
        console.log(removeList, 'addToShortlist');
        APIRES.getSuccessResult(removeList, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const writtenBooks = async (req, res, next) => {
    try {

        const body = req.body
        const addToBook = await Users.findByIdAndUpdate(req.user.user_id, {
            $push: {
                mybooks: {
                    ...body
                }
            }
        }, { new: true })
        addToBook.save()
        console.log(addToBook, 'addToShortlist');
        APIRES.getSuccessResult(addToBook, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const deleteWrittenBook = async (req, res, next) => {
    try {

        const id = req.params.id
        console.log(typeof id, 'params');

        const removeBook = await Users.findByIdAndUpdate(req.user.user_id, {
            $pull: {
                mybooks: {
                    id: Number(id)
                }
            }
        }, { new: true })
        removeBook.save()
        console.log(removeBook, 'addToShortlist');
        APIRES.getSuccessResult(removeBook, res)
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
    logoutUser,
    getUser,
    addToShortlist,
    removeToShortlist,
    writtenBooks,
    deleteWrittenBook,
    
}

