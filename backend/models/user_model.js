const mongoose = require("mongoose");

const user_schema = mongoose.Schema(
    {
        name: 
        {
            type: String,
            required : [true, "Please add a name"]
        },

        email: 
        {
            type: String,
            required : [true, "Please add an email"],
            unique : true,
            trim : true,
            match: 
            [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
            ]
        },

        email: 
        {
            type: String,
            required : [true, "Please add a password"],
            minLength: [8, "Password must be at least 8 charachters"],
            maxLength: [20, "Password must have at most 20 charachters"],
        },

        photo: 
        {
            type: String,
            //required : [true, "Please add a photo"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png"
        },

        phone: 
        {
            type: String,
            default: "+92 "
        },

        bio: 
        {
            type: String,
            default: "bio",
            maxLength: [300, "Bio must have at most 300 charachters"],
        }
    },
    
    {
        timestamps: true
    }
);

const user_model = mongoose.model("User", user_schema);

module.exports = user_model;