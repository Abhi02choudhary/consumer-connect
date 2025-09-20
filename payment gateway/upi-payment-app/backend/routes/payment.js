const express = require('express');
const axios = require('axios');
const Payment = require('../models/Payment');
const router = express.Router();

const API_KEY = 'bdbd6d45-9066-49ab-8ec6-738f3f802aa6';
const MERCHANT_VPA = '8160935021@ybl';

router.post('/initiate', async (req, res) => {
  const { amount } = req.body;
  const txn_id = Date.now().toString();

  const payload = {
    key: API_KEY,
    client_txn_id: txn_id,
    amount: amount.toString(),
    p_info: 'Product Payment',
    customer_name: 'Customer',
    customer_email: 'customer@example.com',
    customer_mobile: '9999999999',
    redirect_url: 'http://localhost:3000/receipt',
    udf1: 'test',
    upi_id: MERCHANT_VPA,
  };

  try {
    const response = await axios.post(
      'https://merchant.upigateway.com/api/create_order',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    await Payment.create({ client_txn_id: txn_id, amount, status: 'PENDING' });

    res.json({ qr_url: response.data.qr_url, txn_id });
  } catch (err) {
    console.error(err);
    res.status(500).send('UPI Gateway error');
  }
});

router.post('/check', async (req, res) => {
  const { txn_id } = req.body;

  try {
    const response = await axios.post(
      'https://merchant.upigateway.com/api/check_order_status',
      {
        key: API_KEY,
        client_txn_id: txn_id,
        txn_date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const status = response.data.data.status;
    await Payment.findOneAndUpdate({ client_txn_id: txn_id }, { status });

    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).send('Status check failed');
  }
});

module.exports = router;