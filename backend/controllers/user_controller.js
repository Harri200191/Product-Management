// Importing and required fields
const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");


// This is used to ensure user logs out automatically after 1 day of logging in
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

const RegisterUser = asyncHandler(async (req, resp) => {
    const {name, email, password} = req.body;

    // Validation if user enters an empty string
    if (!name || !password || !email){
        resp.status(400);
        throw new Error("Please fill in all the required fields.");
    }

    // Validation if user enters short password
    if (password.length < 8){
        resp.status(400);
        throw new Error("Password must be at least 8 charachters");
    }

    // Check if user email already exists
    const userExists = await user_model.findOne({email});
    if (userExists) {
        resp.status(400);
        throw new Error("Email is already in use.");
    };

    // Create new user if they do not exist in Database
    const user = await user_model.create({
        name: name,
        email: email,
        password: password
    });

    // Generate token
    const token = generateToken(user._id);

    // Send http only cookie
    resp.cookie("Token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });
 
    // Get the details of the user when account is created
    if (user){
        resp.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            token
        })
    }
    else{
        resp.status(400);
        throw new Error("Invalid User Data");
    }
});

module.exports = {
    RegisterUser,
};