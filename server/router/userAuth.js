const express = require("express");
const router = express.Router();
const date = require("./date");
const cookieParser = require("cookie-parser");
const User = require("../models/users");
const Farmer = require("../models/farmers");
const Preserver = require("../models/preservers");
const Plan = require("../models/plans");
const bcrypt = require("bcryptjs");
const farmersAuth = require("../middleware/farmersAuth");
const preserverAuth = require("../middleware/preserverAuth");
const farmerAuth = require("../middleware/farmersAuth");

router.use(cookieParser());

router.post("/register", async(req, res) => {
    try{
        //console.log(req.body);
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
            
                res.status(201).json(newFarmer); 
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
            
                res.status(201).json(newPreserver);
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

router.get("/farmerHome", farmersAuth ,async (req, res) => {
    res.json(req.farmer);
})

router.get("/preserverHome", preserverAuth ,async (req, res) => {
    res.json(req.preserver);
})


//////         For creating the plans
router.post("/createPlan", preserverAuth, async (req, res) => {
    try {
        const {typeOfPlan, price } = req.body;
        if(!typeOfPlan || !price){
            res.status(422).json({error: "Please fill all the fields"});
        }

        const newPlan = new Plan({
            preserverId: req.userId,
            preserverName: req.preserver.firstName,
            typeOfPlan: typeOfPlan,
            price: price
        });

        await newPlan.save();

        await Preserver.findOneAndUpdate({_id: req.userId }, { $push: { myPlans: newPlan } }).then(
            () => {
                console.log("plan added");
            }
        );

    } catch (error) {
        console.log(error);
    }
})

//        to show all plans

router.get("/allPlans",  async (req, res) => {
    try {
        Plan.find().then(
        (allPlans) => { 
            res.status(201).json({allPlans});
        }
        )
    
    } catch (error) {
        console.log(error);
    }
})


//       for mapping the plans 

router.get("/showMyPlans", preserverAuth, async (req, res) => {
    try {
        res.json(req.preserver);
    } catch (error) {
        
    }
})

///////        buying a plan

router.post("/buyPlan", farmersAuth, async (req, res) => {
    try {
        //console.log(req.body);
        const { preserverId, preserverName, typeOfPlan, duration, price, weight } = req.body;

        if (!duration || !weight) {
            res.status(422).json({ error: "Please fill all the fields" });
        }
        else {
        
            const totalPrice = Number(duration) * price * Number(weight);
            //console.log(totalPrice);
            console.log(req.userId);
            const newPurchase = {
                preserverId: preserverId,
                preserverName: preserverName,
                typeOfPlan: typeOfPlan,
                duration: duration,
                totalWeight: weight,
                pricePerKG: price,
                totalPrice: totalPrice,
                startDate: date.getStartDate(),
                endDate: date.getEndDate(typeOfPlan, duration)
            }

            await Farmer.findOneAndUpdate({ _id: req.userId }, { $push: { myPurchases: newPurchase } }).then(
                () => {
                    console.log("purchase added");
                }
            );

            const newOrder = {
                farmerId: req.farmer._id,
                farmerName: req.farmer.firstName,
                typeOfPlan: typeOfPlan,
                duration: duration,
                totalWeight: weight,
                pricePerKG: price,
                totalPrice: totalPrice,
                startDate: date.getStartDate(),
                endDate: date.getEndDate(typeOfPlan, duration)
            }

            console.log(preserverId);
            await Preserver.findOneAndUpdate({ _id: preserverId }, { $push: { myOrders: newOrder } }).then(
                () => {
                    console.log("order added");
                }
            );
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/myPurchases", farmersAuth, async (req, res) => {
    try {
        res.json(req.farmer);
    } catch (error) {
        console.log(error);
    }
})

router.get("/myOrders", preserverAuth, async (req, res) => {
    try {
        res.json(req.preserver);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;