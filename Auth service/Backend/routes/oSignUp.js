
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/orgSign.js");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    res.json({ message: "Costumersignup API is working!" });
});

router.post("/", upload.single("idProof"), async (req, res) => {
    try {
        const { companyName, email, password, domain, phone} = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = await User.findOne({ companyName });
        if (user) {
            return res.status(400).json({ message: "Org already exists" });
        }

        user = new User({ 
            companyName, 
            email, 
            password: hashedPassword, 
            domain, 
            phone, 
            idProof: req.file ? { 
                data: req.file.buffer, 
                contentType: req.file.mimetype 
            } : null 
        });
        console.log(user);
        await user.save();
        window.location.href="http://localhost:5179/";
        
        res.status(201).json({email:email, message: "Org registered successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;