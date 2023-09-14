require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser')

const auth = require("./middleware/farmersAuth");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({credentials: true, origin: true}));
app.set('view engine', 'ejs');

//    middlewares

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(require("./router/userAuth"));


app.listen(port, (req, res) => {
    console.log("server is running on port",port); 
})