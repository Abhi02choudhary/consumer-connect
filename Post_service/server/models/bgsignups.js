const mongoose = require('mongoose');

const bgSchema = new mongoose.Schema({
    branch_name: { type: String},
    phone: { type: Number},
    email: { type: String},
    location: { type: String},
    idProof:{type:Object},
    password: { type: String},
    privateID: { type: String},
});
module.exports = mongoose.model("bgsignups", bgSchema);