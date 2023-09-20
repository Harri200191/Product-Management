const express = require("express");
const { CreateProduct } = require("../controllers/product_controller");
const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router.post("/CreateProduct", protect, CreateProduct);
module.exports = router;