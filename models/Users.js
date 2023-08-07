const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false
        },
        shortlist: {
            type: Array,
        },
        mybooks: {
            type: Array,
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    let isModified = this.isModified('password')
    if (!isModified) {
        return next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
    }
})



UserSchema.methods.generateJWTToken = function () {
    return jwt.sign({ user_id: this.id }, process.env.SECRET, {
        expiresIn: '7d'
    })
}

UserSchema.methods.comparePassword = async function (attemptPassword) {
    return await bcrypt.compare(attemptPassword, this.password)
}


const Users = mongoose.model("users", UserSchema);
module.exports = Users;