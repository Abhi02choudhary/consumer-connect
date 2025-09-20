const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/review');
const consumer = require('../models/consumerinfo');
const branch = require('../models/info');
router.get("/:org_name/:cleanlocation", async(req, res)=>{
    res.json({message:"API working for review"});
});

router.post("/:org_name/:cleanlocation", async(req,res)=>{
    try{
        const {org_name, cleanlocation} = req.params;
        const {email, rating, comment} = req.body;

        //  }
        const branchData = await branch.findOne({ branch_name: org_name, cleanlocation });

if (!branchData) {
   console.log("Branch not found for: ", org_name, cleanlocation);
   return res.status(404).json({ message: "Branch not found" });
}

const branchId = branchData._id;

         
        const user = await User.findOne({ email, branchId });
        if(user){
            console.log("you can give review only one time");
            return res.status(400).json({ message: "review is given!" });
        }
        const newlocation = await cleanlocation.trim().replace(/,/g, "").replace(/\s+/g, "");
        const  forName = await consumer.findOne({email});
       // const branchName = await branch.findById({branchID});
        const newreview = new User({
            branchId : branchId,
            email:email,
            name:forName.name,
            org_name:org_name,
            
            cleanlocation:newlocation,
            rating: rating,
            comment:comment,
        });
        await newreview.save();
        res.status(201).json({ message: "Review added successfully!" });
        console.log("works");
     } 
    catch (err) {
        console.log("Error while adding review:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
     }
     
  });
  module.exports = router;