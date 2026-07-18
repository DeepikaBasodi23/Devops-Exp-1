const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Connect MongoDB
mongoose.connect("mongodb://mongo:27017/eventdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    event: String
});

const Registration = mongoose.model(
    "Registration",
    registrationSchema
);


// Register user
app.post("/register", async(req,res)=>{

    const {name,email,event}=req.body;

    const user = new Registration({
        name,
        email,
        event
    });

    await user.save();

    res.json({
        message:"Registration Successful"
    });

});


// Get database records
app.get("/registrations", async(req,res)=>{

    const users = await Registration.find();

    res.json(users);

});


app.listen(3000,()=>{
    console.log("Registration Service running on port 3000");
});