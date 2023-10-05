const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./config/connectDB");
const user_route = require("./routes/user_route");
const product_route = require("./routes/product_route");
const contact_route = require("./routes/contact_route");
const ErrorHandler = require("./middleware/Error")
const Protect = require("./middleware/AuthMiddleware");

//----------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://inventory-management.vercel.app"],
    credentials: true
}));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use("/api/users", user_route);
app.use("/api/products", product_route);
app.use("/api/contact", contact_route);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // To define route for uploading images

app.get("/", (req, resp) => {
    resp.send("Home Page");
});


// CHATBOT STUFF
const { exec } = require('child_process'); 
const pythonScript = '../Chatbot/Main.py';

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput; 
    exec(`python ${pythonScript} ${userInput}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error}`);
          return;
        }
      
        console.log(`Python script output:\n${stdout}`);
      
        if (stderr) {
          console.error(`Python script error:\n${stderr}`);
        }
      });
    res.json({ 
        msg: "Success!"
     });
  });

// USING CUSTOM MIDDLEWARE
app.use(ErrorHandler);

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

