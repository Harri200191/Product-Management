const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const token_schema = mongoose.Schema(
    {
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "user"
     },

     token: {
        type: String,
        required: true
     },

     createdAt: {
        type: Date,
        required: true
     },

     expiresAt: {
        type: Date,
        required: true
     }

    },
    
    {
        timestamps: true
    }
);

const token_model = mongoose.model("Token", token_schema);
module.exports = token_model;