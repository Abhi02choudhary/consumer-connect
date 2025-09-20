const mongoose = require("mongoose");
const { branchProfileDB } = require("../mongo");
let reviewSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
      },
    email:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    org_name:{
        type:String,
        required: true,
    },
    rating: {
        type: Number, 
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      cleanlocation:{
        type: String,
        required:true,
      }
    }, { timestamps: true });

    const review = branchProfileDB.model("review", reviewSchema, "review");
    module.exports = review;