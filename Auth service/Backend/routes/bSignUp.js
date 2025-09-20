
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/branchSign.js");
const { MongoClient } = require("mongodb");
const { chownSync } = require("fs");
const client = new MongoClient("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    res.json({ message: "Branchsignup API is working!" });
});

router.post("/", upload.single("idProof"), async (req, res) => {
    try {
        const { branch_name, email, password, location, phone, privateID,orgID,shortBio, longBio} = req.body;
        
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newlocation = await location.trim().replace(/,/g, "").replace(/\s+/g, "");
        let user = await User.findOne({ branch_name, location});
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({ 
            branch_name, 
            email, 
            password: hashedPassword, 
            location, 
            phone, 
            privateID,
            orgID,
            shortBio,
            longBio,
            cleanlocation: newlocation,
            idProof: req.file ? { 
                data: req.file.buffer, 
                contentType: req.file.mimetype 
            } : null 
        });
        const usersWitId=await User.find({privateID:user.privateID});
        console.log("usersWitId", usersWitId);
        if(usersWitId.length>0){
            console.log("Choose diff id");
            return res.status(401).json({ message: "privateID isn't available choose different ID!!" });
        }

        console.log(user.orgID);
        await client.connect();
        const db = client.db("Authentication");
        const collection = db.collection("osignups");
        const result = await collection.find({}).toArray(); 
        const matchingDocs = result.filter(doc => doc.privateID == user.orgID);
        console.log("Matching documents:");
        console.log(matchingDocs); 
        console.log(user.orgID);
        //   console.log("result", result);
          if(matchingDocs.length==0){
            console.log("Org not yet registered");
            return res.status(401).json({ message: "Org not yet registered!!" });
          }
        await user.save();
        res.redirect("http://localhost:5179/");
        // res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;



