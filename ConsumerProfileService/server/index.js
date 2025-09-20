const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8083;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Notifications";
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URL= "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net";  // Update if needed
  const client = new MongoClient(MONGO_URL);
  const client1 = new MongoClient(MONGO_URL);
  const client2 = new MongoClient(MONGO_URL);
  const client3 = new MongoClient(MONGO_URL);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catcm

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Schema & Model
const customerNotificationSchema = new mongoose.Schema({
  id: String,
  title: String,
  email:String,
  message: String,
  time: String,
  phone:Number,
  status: String,
  read: Boolean,
});

const CustomerNotification = mongoose.model(
  "customerNotifications",
  customerNotificationSchema,
  "customerNotifications" // explicitly point to correct collection
);
app.get("/customer/notifications/accept/:id",async(req,res)=>{
    const updated = await CustomerNotification.findOneAndUpdate(
        { id: req.params.id },
        { $set: { status: "accepted" , read: true } },
        { new: true } // returns updated doc
      );
      console.log("updated notification");
      console.log(updated);
     res.json(updated);
  })

// Route to fetch all notifications
app.get("/customer/notifications/:email", async (req, res) => {
  try {
    const notifications = await CustomerNotification.find({ email: req.params.email }).sort({ time: -1 });
    // console.log(req.params.email);
    // console.log(notifications);
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/:email/status', async (req, res) => {
  const email= req.params.email;
  console.log(email);
  try {
    await client.connect();
    const db = client.db("StatusService");
    const collection = db.collection('Status');

    const documents = await collection.find({email:email}).toArray();

    // Format the response for frontend
    const formatted = await Promise.all(
      documents.map(async (doc) => {
        const customer = await client2.db("Authentication").collection("csignups").findOne({ email: doc.email });
        const branch = await client1.db("Authentication").collection("bsignups").findOne({ privateID: doc.privateID });
    
        return {
          customerName: customer?.name || "Unknown",
          branchName: branch?.branch_name || "Unknown",
          productId: doc._id.toString(),
          productDetails: doc.product,
          status: doc.status,
          privateID:doc.privateID,
          customerEmail: doc.email
        };
      })
    );
    
console.log("formatted data",formatted);
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Start server
app.get("/:email/brandReview", async (req, res) => {
  const email=req.params.email;
  console.log(email);
  try {
    await client3.connect();
    const db = client3.db("BranchProfile");
    const collection = db.collection("review");

    const documents = await collection.find({email:email}).toArray();

    const formatted = documents.map((doc) => ({
      name: doc.org_name,
      rating: doc.rating,
      message: doc.comment,
    }));
    console.log("formatted data",formatted);
    res.status(200).json(formatted);
  }
  catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get("/:privateID/customerReview", async (req, res) => {
  const privateID=req.params.privateID;
  console.log(privateID);
  try {
    await client3.connect();
    const db = client3.db("BranchProfile");
    const collection = db.collection("review");

    const documents = await collection.find({branchID:privateID}).toArray();

    const formatted = documents.map((doc) => ({
      name: doc.name,
      rating: doc.rating,
      message: doc.comment,
    }));
    console.log("formatted data",formatted);
    res.status(200).json(formatted);
  }
  catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/review", async (req, res) => {
  const { customerName, branchName, productDetails, rating, reviewText,email,privateID } = req.body;
  console.log(req.body);
  console.log("review entered");
  const branch = await client1.db("Authentication").collection("bsignups").findOne({ privateID:privateID });

  try {
    await client3.connect();
    const db = client3.db("BranchProfile");
    const collection = db.collection("review");

    const newReview = {
      branchID: privateID,
      email: email,
      name:customerName,
      org_name:branchName,
      rating: rating,
      comment: reviewText,
      cleanlocation:await branch.location.trim().replace(/,/g, "").replace(/\s+/g, "")

    };

    const result = await collection.insertOne(newReview);
    console.log(result);
    res.status(201).json("saved");
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});