const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/payment');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/upi-payments')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5005, () => {
  console.log('Server running on port 5005');
});