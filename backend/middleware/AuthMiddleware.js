// Purpose of this is to check if user is currently logged in or not. If not, we cant allow 
// it to access fetchdata api as then it will fetch data of a user who is not logged in
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler"); // to prevent try catch blocks
const user_model = require("../models/user_model");

const protect = asyncHandler(async(req, resp, next) => {
    try{
        const token = req.cookies.Token;
        if (!token){
            resp.status(401);
            throw new Error("Not authorized, Please logIn")
        };

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from token
        const user = await user_model.findById(verified.id).select("-password");

        if (!user){
            resp.status(401);
            throw new Error("User not found");
        };

        // save user to request object to use in fetchData API
        req.user = user
        next();
    }
    catch(err){
        resp.status(401);
        throw new Error(err);
    }
});

module.exports = protect;