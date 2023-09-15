const express = require("express");
const user_model = require("../models/user_model");

const RegisterUser = async (req, resp) => {
    if (!req.body.email){
        resp.status(400);
        throw new Error("Please add an email");
    }
    resp.send("Register User");
};

module.exports = {
    RegisterUser
};