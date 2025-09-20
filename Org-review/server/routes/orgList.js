const express = require("express");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose")
const path = require('path');
const Org = require('../models/info');

router.get("/", async(req,res)=>{
    try{
        const orgs = await Org.find();
        console.log(orgs);
        res.json(orgs);
    }
    catch(error){
        console.log(error);
    }
});
module.exports = router;