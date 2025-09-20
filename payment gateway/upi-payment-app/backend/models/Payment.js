const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  client_txn_id: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);