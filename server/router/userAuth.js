const express = require("express");

const router = express.Router();
const cookieParser = require("cookie-parser");

const bcrypt = require("bcryptjs");

const auth = require("../middleware/auth");

router.use(cookieParser());

module.exports = router;