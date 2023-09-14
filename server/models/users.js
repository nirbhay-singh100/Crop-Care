const mongoose = require("mongoose");
const conn = require("../db/conn")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    jobRole: {
        type: String,
        require: true
    }
});

const User = new mongoose.model("user", userSchema);
module.exports = User;