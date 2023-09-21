const express = require("express");
const { CreateProduct } = require("../controllers/product_controller");
const protect = require("../middleware/AuthMiddleware");
const {upload} = require("../utils/fileUpload");

const router = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router.post("/CreateProduct", protect, upload.single("image"), CreateProduct);
module.exports = router;