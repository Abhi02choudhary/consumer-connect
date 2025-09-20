
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");
const { buffer } = require("stream/consumers");
// const { type } = require("os");

let CSignupSchema = new mongoose.Schema({
    
   name:{
        type: String,
        require: true,
        
    },
    phone:{
        type: Number,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
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
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });






const cSignup =  mongoose.model("cSignup",CSignupSchema);
module.exports= cSignup;