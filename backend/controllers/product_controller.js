// -------------------------------------------------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");
const token_model = require("../models/tokenModel");
const product_model = require("../models/productModel");
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const CreateProduct = asyncHandler(async (req, resp) =>{

})
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
module.exports = {
    CreateProduct,
};
// -------------------------------------------------------------------------------------
