const mongoose = require("mongoose");
const {postDB} = require("../mongo");
const PostSchema = new mongoose.Schema({
    privateID: { 
        type: String, 
        required: true },
    customerEmail: { 
        type: String, 
        required: true },
    postText: { 
        type: String, 
        required: true },
    imageUrl: { 
        type: String, 
        required: true },
    postAuthStatus: { 
        type: Boolean, 
        default: false }
}, { timestamps: true }); // 

module.exports = postDB.model("posts", PostSchema, "posts");