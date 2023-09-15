const express = require("express");
const user_model = require("../models/user_model");
const {RegisterUser} = require("../controllers/user_controller")

const router = express.Router();

router.post("/Register", RegisterUser);

module.exports = router;