const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");
const { buffer } = require("stream/consumers");
// const { type } = require("os");
const { authDB } = require("../mongo");
let BSignupSchema = new mongoose.Schema({
    
    branch_name:{
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: Number,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    location:{
        type: String,
        require: true,
    }, 
    idProof:{
       data: Buffer,
       contentType: String
       // require: true,
    }, 
    password: { 
        type: String, 
        required: true, 
    },
    privateID:{
        type: String,
        require:true,
       
    },
    shortBio:{
        type: String,
        require:true,
    },
    longBio:{
        type: String,
        require:true,
    },
    cleanlocation:{
        type: String,
        require: true,
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });



const bSignup = authDB.model("bSignup", BSignupSchema, 'bsignups');

module.exports= bSignup;