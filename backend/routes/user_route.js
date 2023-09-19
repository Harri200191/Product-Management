const express = require("express");
const user_model = require("../models/user_model");
const {RegisterUser, UpdateUser, LogInUser, LogOut, FetchData, LoginStatus} = require("../controllers/user_controller");
const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router.post("/Register", RegisterUser);
router.post("/Login", LogInUser);
router.get("/Logout", LogOut);
router.get("/FetchData", protect, FetchData);
router.get("/LoggedIn", LoginStatus);
router.patch("/UpdateUser", protect, UpdateUser);

module.exports = router;