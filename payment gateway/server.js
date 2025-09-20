const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net");
const app = express();

app.use(express.json());
app.use(cors());
const tempStore = {};
const MERCHANT_KEY="96434309-7796-489d-8924-ab56988a6076"
const MERCHANT_ID="PGTESTPAYUAT86"

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const MERCHANT_BASE_URL="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
const MERCHANT_STATUS_URL="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status"


const redirectUrl="http://localhost:8085/status"

const successUrl="http://localhost:5177/payment-success"
const failureUrl="http://localhost:5177/payment-failure"


app.post('/create-order', async (req, res) => {

    const {name, mobileNumber, amount,email} = req.body;
    const orderId = uuidv4()
  console.log(req.body);
    //payment
    const paymentPayload = {
        email: email,
        merchantId : MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount : amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    }
    tempStore[orderId] = email;

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string  = payload + '/pg/v1/pay' + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url:MERCHANT_BASE_URL,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data :{
            request : payload
        }
    }
    try {
        
        const response = await axios.request(option);
        // console.log(response.data.data.instrumentResponse.redirectInfo.url)
         res.status(200).json({msg : "OK", url: response.data.data.instrumentResponse.redirectInfo.url})
    } catch (error) {
        // console.log("error in payment", error)
        res.status(500).json({error : 'Failed to initiate payment'})
    }

});


app.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;

    const keyIndex = 1
    const string  = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'GET',
        url:`${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    }

    axios.request(option).then(async(response) => {
        if (response.data.success === true){
            console.log(tempStore[merchantTransactionId]);
            const email = tempStore[merchantTransactionId];
            const privateID = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number

 
const transporter = nodemailer.createTransport({
    service:'gmail',
     auth: {
         user: 'dhruvishah116122@gmail.com',
         pass: 'uxihxgezpzalaexn'
     },
     tls: {
         rejectUnauthorized: false // Ignore self-signed certificates (if necessary)
     }
 });

  const mailOptions = {
    from: '"ConsumerConnect 🤝" <yourgmail@gmail.com>',
    to: email,
    subject: '🎉 Your Org ID for ConsumerConnect',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background: #fdfdfd;">
        <h2 style="color: #2a9d8f;">Dear Organisation, 👋</h2>
        <p style="font-size: 16px;">
          Thank you for registering on <strong>ConsumerConnect</strong>. We're thrilled to have you on board! 🎊
        </p>
        <p style="font-size: 16px;">
          Please find below your <strong>Org ID</strong>. Make sure to keep it <em>confidential</em> and share it only with your corresponding branches. 🔐
        </p>
        <p style="font-size: 18px; color: #264653; background: #e0f7fa; padding: 10px 15px; border-radius: 6px; display: inline-block;">
          🔑 <strong>Org ID:</strong> ${privateID}
        </p>
        <br><br>
        <p style="font-size: 16px;">Warm regards,<br><strong>Team ConsumerConnect 💼</strong></p>
      </div>
    `
  };
  try {
    await client.connect();

    const db = client.db("Authentication");
    const collection = db.collection("osignups");

    const result = await collection.findOneAndUpdate(
      { email: email },
      { $set: { privateID: privateID } },
      { returnDocument: "after" }
    );
console.log("result", result.privateID);
    if (result.privateID!=null) {
      console.log("✅ Updated Document:", result.privateID);
    } else {
      console.log("❌ No user found with email:", email);
    }

  } catch (err) {
    console.error("❌ Error:", err);
  }
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }

            return res.redirect(successUrl)
        }else{
            return res.redirect(failureUrl)
        }
    })
});


app.listen(8085, () => {
  console.log('Server is running on port 8000');
});