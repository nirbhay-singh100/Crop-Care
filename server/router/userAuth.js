const express = require("express");

const router = express.Router();
const cookieParser = require("cookie-parser");
const User = require("../models/users");
const Farmer = require("../models/farmers");
const Preserver = require("../models/preservers");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/farmersAuth");

router.use(cookieParser());

router.post("/register", async(req, res) => {
    try{
        console.log(req.body);
        const {fname, lname, email,jobRole, password, cpassword} = req.body;

        if(!fname || !lname || !email || !jobRole || !password || !cpassword){
            res.status(422).json({error: "all fiels are not filled"});
        } 
        
        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({error: "Email already exist"});
        }
        else if(password!==cpassword){
            res.status(422).json({error: "Passwords are not matching"});
        } 
        else{
            const hashedPassword = await bcrypt.hash(password, 10);

            if (jobRole === "Farmer") {
                const newFarmer = new Farmer({
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    jobRole: jobRole,
                    password: hashedPassword
                });

                const token = await newFarmer.generateAuthToken();

                res.cookie("jwt", token, {
                    expires: new Date(Date.now()+5000000000),
                    httpOnly: true
                });
                //console.log(res.cookie);
                await newFarmer.save();
            
                res.status(201).json({message : "user registered successfully"}); 
            }
            else if(jobRole==="Preserver"){
                const newPreserver = new Preserver({
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    jobRole: jobRole,
                    password: hashedPassword
                });

                const token = await newPreserver.generateAuthToken();

                res.cookie("jwt", token, {
                    expires: new Date(Date.now()+5000000000),
                    httpOnly: true
                });
                //console.log(res.cookie);
                await newPreserver.save();
            
                res.status(201).json({message : "user registered successfully"});
            }
            
            const newUser = new User({
                email: email,
                password: hashedPassword,
                jobRole: jobRole
            });
            await newUser.save();
        }
          
    } catch(error){
        console.log(error);
    }
})


router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(422).json({error: "Please fill all the fields"});
        }

        const userExist = await User.findOne({email: email});
        if(!userExist) {
            res.status(401).json({error: "Invalid email"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

        if(!isPasswordCorrect){
            res.status(401).json({error:"password is inccorect"});
        } else {
            if (userExist.jobRole == "Farmer") {
                const farmerExist = await Farmer.findOne({ email: email });

                const token = await farmerExist.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now()+5000000000),
                    httpOnly: true
                });
                res.status(201).json(farmerExist);
            }
            else {
                const preserverExist = await Preserver.findOne({ email: email });

                const token = await preserverExist.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now()+5000000000),
                    httpOnly: true
                });
                res.status(201).json(preserverExist);
            }  
        }
    } catch(error){
        console.log(error);
    }
});

module.exports = router;