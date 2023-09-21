const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const product_schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required : true,
            ref: "User"
         },
         name: 
         {
             type: String,
             required : [true, "Please add a name"],
             trim: true
         },

        sku:{
            type: String,
            required : true,
            default: "sku",
            trim: true
        },

        category: 
        {
            type: String,
            required : [true, "Please add a category"],
            trim: true
        },

        quantity: 
        {
            type: Number,
            required : [true, "Please add a quantity"],
            trim: true
        },

        price: 
        {
            type: String,
            required : [true, "Please add a price"],
            trim: true
        },

        description: 
        {
            type: String,
            required : [true, "Please add a description"],
            trim: true
        },

        image: 
        {
            type: Object,
            default:{}
        },
    },
    
    {
        timestamps: true
    }
);

const product_model = mongoose.model("Product", product_schema);
module.exports = product_model;