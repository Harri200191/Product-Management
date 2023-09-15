const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/connectDB");
const user_route = require("./routes/user_route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use("/api/users", user_route);

app.get("/", (req, resp) => {
    resp.send("Home Page");
});

const startserver = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server running on port: ", PORT);
        });
    }
    catch (error){
        console.warn(error)
    };
};

startserver();

