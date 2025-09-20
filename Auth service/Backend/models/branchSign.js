const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");
const { buffer } = require("stream/consumers");
// const { type } = require("os");

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
    cleanlocation:{
        type: String,
        require: true,
    },
    idProof:{
       data: Buffer,
       contentType: String,
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
    orgID:{
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
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });



// BSignupSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

//const bSignup =  mongoose.model("bSignup",BSignupSchema);
//const bSignup = mongoose.model("bSignup", BSignupSchema, "branchsigns"); 
//const bSignup = mongoose.model("bSignup", BSignupSchema);
const bSignup = mongoose.model("bSignup", BSignupSchema, 'bsignups');

module.exports= bSignup;