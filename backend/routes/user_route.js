const express = require("express");
const user_model = require("../models/user_model");
const {RegisterUser, LogInUser, LogOut, FetchData} = require("../controllers/user_controller");
const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/Register", RegisterUser);
router.post("/Login", LogInUser);
router.get("/Logout", LogOut);
router.get("/FetchData", protect, FetchData);


module.exports = router;