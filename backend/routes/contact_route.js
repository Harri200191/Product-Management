const express = require("express");
const { contactUs } = require("../controllers/contact_controller");
const router = express.Router();
const protect = require("../middleware/AuthMiddleware");

router.post("/", protect, contactUs);

module.exports = router;