// -------------------------------------------------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");
const token_model = require("../models/tokenModel");
const product_model = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = upload("cloudinary").v2;
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

// -------------------------------------------------------------------------------------
module.exports = {
  CreateProduct,
};
// -------------------------------------------------------------------------------------
