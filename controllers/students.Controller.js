const Users = require("../models/Users");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { sendToken } = require("../utils/jwt");
const Students = require("../models/Student");
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECERT
});


const createStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        let id = req.user.user_id
        const body = req.body
        const createStudents = await Students.create({
            ...body,
            user_id: id
        })
        let send = {}
        send.data = createStudents
        send.message = "Successfully created student"
        return APIRES.getSuccessResult(send, res)
    } catch (error) {
        if (error.code == 11000) {
            let message = `${error.keyValue.phone} ${Object.keys(error.keyValue)} already exits please use different phone number`;
            return APIRES.getErrorResult(message, res)
        }
        console.log(error);
        return APIRES.serverError(error, res)
    }
}




const updateStudents = async (req, res, next) => {
    try {

        const body = req.body
        const id = req.params.id
        const findStudents = await Students.findById(id)
        if (!findStudents) {
            return APIRES.getNotExistsResult("Student not be exits", res)
        }
        const updatedUser = await Students.findByIdAndUpdate(id, {
            ...body
        }, { new: true }).select("-__v")
        let send = {};
        send.user = updatedUser;
        send.message = "Successfully updated student";
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const updateStudentsProfilePic = async (req, res, next) => {
    try {
        const id = req.params.id
        const profilePic = req.file.path
        const cloundinary = await cloudinary.uploader.upload(profilePic)
        let profile_url = cloundinary.secure_url
        const findStudents = await Students.findById(id)
        if (!findStudents) {
            return APIRES.getNotExistsResult("Student not be exits", res)
        }
        const updateProfileUserPic = await Students.findByIdAndUpdate(id, {
            profile_url
        }, { new: true }).select("-__v")
        let send = {};
        send.user = updateProfileUserPic;
        send.message = "Successfully updated user profile";
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const deleteStudents = async (req, res, next) => {
    try {
        const id = req.params.id
        let send = {}
        const findStudents = await Students.findById(id)
        if (!findStudents) {
            return APIRES.getNotExistsResult("Student not be exits", res)
        }
        const deletedStudents = await Students.findByIdAndDelete(id)
        send.user = deletedStudents;
        send.message = "Successfully deleted student";

        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const getStudents = async (req, res, next) => {
    try {
        const id = req.params.id
        const findUser = await Students.findById(id).populate("user_id", "name phone").select("-__v")
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        APIRES.getSuccessResult(findUser, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}



module.exports = {
    createStudent,
    updateStudents,
    updateStudentsProfilePic,
    getStudents,
    deleteStudents,
}

