
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/branchSign.js");

const router = express.Router();
router.get("/", async (req, res) => {
    res.json({ message: "Branchlogin API is working!" });
});

router.post("/", async (req, res) => {
//     console.log("Login request received:", req.body);
//   res.json({ message: "Login received!" });
    try {
        const { privateID, password } = req.body;
        console.log(privateID, password);
        const user = await User.findOne({ privateID });
        console.log("Login request received:", req.body);
        if (!user) {
            console.log("something went wrong");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                let token = jwt.sign({privateID}, "e4d1c3b7a8f9e6b5d2c1f0a3b8e7d6c4");
                res.cookie("token", token);
                console.log("right");
                return res.status(200).json({ message: "valid credentials" });
            }
            else{
                console.log("something went wrong");
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;