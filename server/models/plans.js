const mongoose = require("mongoose");
const conn = require("../db/conn")

const planSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    typeOfPlan: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Plan = new mongoose.model("plan", planSchema);
module.exports = Plan;