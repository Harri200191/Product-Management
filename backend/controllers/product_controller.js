// -------------------------------------------------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");
const token_model = require("../models/tokenModel");
const product_model = require("../models/productModel");
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const CreateProduct = asyncHandler(async (req, resp) =>{
    const {name, sku, category, quantity, price, description} = req.body;

    // Validate our request to check if params exist
    if(!name || !sku || !category || !quantity || !price || !description){
        resp.status(400);
        throw new Error("Please fill in all fields");
    };

    const product = await product_model.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description
    });

    resp.status(201).json(product);
})
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
module.exports = {
    CreateProduct,
};
// -------------------------------------------------------------------------------------
