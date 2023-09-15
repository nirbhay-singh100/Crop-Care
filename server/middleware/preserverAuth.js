const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Preserver = require("../models/preservers")

const preserverAuth = async(req, res, next) => {
    try{
        //console.log(req.cookies);
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY_PRESERVER);
        //console.log(verifyUser);

        const preserver = await Preserver.findOne({_id: verifyUser._id});
        //console.log(user);

        if(!preserver){
            throw new Error("User not found")
        }

        req.token = token;
        req.preserver = preserver;
        req.userId = preserver._id;

        next();

    } catch(error){
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
    }
}

module.exports = preserverAuth;