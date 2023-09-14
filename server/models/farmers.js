const mongoose = require("mongoose");
const conn = require("../db/conn")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const farmerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

farmerSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        //console.log(token);
        return token;
    } catch(error){
        console.log(error);
    }
}


const Farmer = new mongoose.model("farmer", farmerSchema);
module.exports = Farmer;