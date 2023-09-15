const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Farmer = require("../models/farmers")

const farmerAuth = async(req, res, next) => {
    try{
        //console.log(req.cookies);
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY_FARMER);
        //console.log(verifyUser);

        const farmer = await Farmer.findOne({_id: verifyUser._id});
        //console.log(user);

        if(!farmer){
            throw new Error("User not found")
        }

        req.token = token;
        req.farmer = farmer;
        req.userId = farmer._id;

        next();

    } catch(error){
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
    }
}

module.exports = farmerAuth;