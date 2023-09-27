const express = require("express");
const { CreateProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product_controller");
const protect = require("../middleware/AuthMiddleware");
const {upload} = require("../utils/fileUpload");

const router = express.Router();

// Protect middle ware is used only when we want to start the function IF the user is logged in
router.post("/", protect, upload.single("image"), CreateProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;