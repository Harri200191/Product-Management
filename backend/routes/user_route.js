const express = require("express");
const user_model = require("../models/user_model");
const {RegisterUser, LogInUser, LogOut} = require("../controllers/user_controller")

const router = express.Router();

router.post("/Register", RegisterUser);
router.post("/Login", LogInUser);
router.get("/Logout", LogOut)


module.exports = router;