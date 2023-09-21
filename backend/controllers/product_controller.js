// -------------------------------------------------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");
const token_model = require("../models/tokenModel");
const product_model = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
const CreateProduct = asyncHandler(async (req, resp) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // Validate our request to check if params exist
  if (!name || !sku || !category || !quantity || !price || !description) {
    resp.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle image file upload
  let filedata = {};

  // if image uploaded through requested data
  if (req.file) {
    let uploadedFile;

    // Upload file to cloudinary
    try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory Management App",
        resource_type: "image",
      });
    } catch (error) {
      resp.status(500);
      throw new Error("Image could not be uploaded to the Cloud");
    }

    filedata = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // handle adding data to new db collection
  const product = await product_model.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: filedata,
  });

  resp.status(201).json(product);
});
// -------------------------------------------------------------------------------------


// Get all Products
const getProducts = asyncHandler(async (req, resp) => {
    const products = await product_model.find({ user: req.user.id }).sort("-createdAt");
    resp.status(200).json(products);
});
  
// Get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json(product);
});

// -------------------------------------------------------------------------------------
module.exports = {
  CreateProduct,
  getProduct,
  getProducts,
};
// -------------------------------------------------------------------------------------
