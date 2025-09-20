const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");
const { buffer } = require("stream/consumers");
// const { type } = require("os");

let OSignupSchema = new mongoose.Schema({
    
   companyName:{
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
    domain:{
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




// OSignupSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const oSignup =  mongoose.model("oSignup",OSignupSchema);
module.exports= oSignup;