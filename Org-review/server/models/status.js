const mongoose = require("mongoose");
const {statusDB} = require("../mongo");
const statusSchema = new mongoose.Schema({
  privateID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Resolved"],
    required: true,
  },
}, { timestamps: true });

module.exports = statusDB.model("Status", statusSchema, "Status");