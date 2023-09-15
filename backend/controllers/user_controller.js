const express = require("express");
const user_model = require("../models/user_model");

const RegisterUser = async (req, resp) => {
    try{
        const task = await user_model.create(req.body);
        resp.status(200).json(task);
    }
    catch(error){
        resp.status(500).json({
            msg: error.message
        })
    };
};

module.exports = {
    RegisterUser
};