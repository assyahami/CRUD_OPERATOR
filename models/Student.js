const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const StudentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a username"],
        },

        DOB: {
            type: String,
        },

        gender: {
            type: String,
            required: [true, "Please provide a gender"],
            enum: ["MALE", "FEMALE"]
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            required: [true, "Please provide a user id"],
            ref: "users"
        },

        country: {
            type: String,
        },

        state: {
            type: String,
        },

        profile_url: {
            type: String,
            default: null
        },

        email: {
            type: String,
            required: [true, "Please provide a email"],
        },
        hobbies: {
            type: String,
        },
        qualification: {
            type: String,
            required: [true, "Please provide a email"],
        },

        phone: {
            type: String,
            unique: true,
            required: [true, "Please provide a valid phone number"],
        },
    },
    { timestamps: true }
);



const Students = mongoose.model("students", StudentSchema);
module.exports = Students ;