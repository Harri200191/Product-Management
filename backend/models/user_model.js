const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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

        password: 
        {
            type: String,
            required : [true, "Please add a password"],
            minLength: [8, "Password must be at least 8 charachters"],
            //maxLength: [20, "Password must have at most 20 charachters"],
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

// Encrypt password before saving to DB
user_schema.pre("save", async function (next){
    // This ensures that the password is only hashed when it is modified
    if (!this.isModified("password")){
        return next();
    };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const user_model = mongoose.model("User", user_schema);
module.exports = user_model;