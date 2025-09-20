const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    branchId: { type: String, required: true },
    customerEmail: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("posts", PostSchema);