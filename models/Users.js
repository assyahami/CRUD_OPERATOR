const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserSchema = new Schema(
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
            enum:["MALE","FEMALE"]
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
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default:"USER"
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false
        }
    },
    { timestamps: true }
);

UserSchema.pre('save',async function (next) {
    let isModified = this.isModified('password')
    if (!isModified) {
        return next()
    }else{
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