const express = require("express");
const { exec } = require("child_process");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net");
const client1 = new MongoClient("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net");

const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ storage: multer.memoryStorage() });
const {Kafka}  = require('kafkajs');
const app = express();
app.use(express.json());
app.use(cors());
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name: "duwzapskx",
    api_key: "923279461271425",
    api_secret: "sQI2bNLzrg5PDwlpihKewkmrUE8"
});

// 🔹 Configure Multer for file uploads

// ✅ Create separate MongoDB connections
const postDB = mongoose.createConnection("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/PostService", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
postDB.on("connected", () => console.log("✅ Connected to postDB"));
postDB.on("error", (err) => console.error("❌ Error connecting to postDB:", err));


const authDB = mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


// ✅ Define models for each database
const postSchema = new mongoose.Schema({
    privateID: String,
    customerEmail: String,
    postText: String,
    imageUrl: String,
    postAuthStatus: Boolean
}, { timestamps: true }); // <-- correct place for timestamps

const Post = postDB.model("Post", postSchema);

async function savePost(privateID, customerEmail, postText, imageUrl, postAuthStatus) {
    try {
        const newPost = new Post({privateID, customerEmail, postText, imageUrl, postAuthStatus });
       const savedPost=
        await newPost.save();
        console.log("✅ Post saved successfully!");
        return savedPost._id;
    } catch (error) {
        console.error("❌ Error saving post:", error);
    }
}
const Branch = mongoose.model("bsignups", new mongoose.Schema({
    branch_name: { type: String},
    phone: { type: Number},
    email: { type: String},
    location: { type: String},
    idProof:{type:Object},
    password: { type: String},
    privateID: { type: String},
}));
const axios = require("axios");
const http = require("http");



async function authenticateBill(postText, uploadedUrl) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ postText, uploadedUrl });

        const options = {
            hostname: "127.0.0.1",
            port: 5000,
            path: "/authenticate",
            method: "POST",
            headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(postData) },
        };

        const req = http.request(options, (res) => {
            let data = "";

            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                const response = JSON.parse(data);
                console.log("✅ ML Response:", response);

                if (response.success) {//product,branchID,customerEmail,amount,status
                    resolve(response); // Return true if success
                } else {
                    resolve(false);
                }
            });
        });

        req.on("error", (error) => {
            console.error("❌ Error calling ML API:", error);
            resolve(false); // Return false on error
        });

        req.write(postData);
        req.end();
    });
}


app.get('/:privateID/postListBranch', async (req, res) => {
    const  privateID = req.params.privateID;
    console.log(privateID);
    if (!privateID) {
      return res.status(400).json({ error: 'Missing email in query' });
    }
  
    try {
      await client1.connect();
      const db = client1.db('PostService');
      const collection = db.collection('posts');
  
      const posts = await collection.find({privateID: privateID }).toArray();
      console.log(posts);
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// ✅ POST endpoint with file upload
app.get('/:email/postList', async (req, res) => {
    const  email = req.params.email;
    console.log(email);
    if (!email) {
      return res.status(400).json({ error: 'Missing email in query' });
    }
  
    try {
      await client1.connect();
      const db = client1.db('PostService');
      const collection = db.collection('posts');
  
      const posts = await collection.find({customerEmail: email }).toArray();
      console.log(posts);
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post("/post-data",upload.array("attachments"), async (req, res) => {
    const { privateID, postText,email } = req.body;
    const imagePath = req.file?.path;
  console.log(privateID);console.log(postText);console.log(imagePath);
    if (!privateID  || !postText) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
              let stream = cloudinary.uploader.upload_stream(
                { folder: "user_posts" }, 
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result.secure_url); // Return Cloudinary URL
                }
              );
              streamifier.createReadStream(file.buffer).pipe(stream);
            });
          });
      
          const uploadedUrls = await Promise.all(uploadPromises);
      
          console.log("✅ Uploaded to Cloudinary:", uploadedUrls);
        // Call Python ML script with Cloudinary URL
        
const response=await authenticateBill(postText,uploadedUrls[0]);
console.log("res in post-data fun");
        console.log(response);
        const postID=await savePost(privateID, email, postText, uploadedUrls[0], response.success);
        if(response){
            await client.connect();
          const db=  client.db("StatusService");
          console.log(response);
           await triggerNotifier(postID);
            const result = await db.collection("Status").insertOne({
                privateID,
                email,
                product:response.message.Name,
                amount:response.message.Amount,
                status:"Active",
                createdAt: new Date(),
              });
          
            return res.json({ success: true });
        }
        else{
            return res.json({ success: false });
        }
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
    }
});

// ✅ Route to search for branch names when typing @ (Uses `Authentication` DB)
app.get("/mention-search", async (req, res) => {
    const query = req.query.q;

    // console.log("Query received:", query); // Debugging log

    if (!query) {
        return res.json([]);
    }

    try {
        const branches = await Branch.find({
            branch_name: { $regex: `^${query}`, $options: "i" } // Match from the start
        }).limit(5);


        res.json(branches.map(branch => ({
            name: branch.branch_name,
            privateID: `${branch.privateID}`
        })));
    } catch (error) {
        console.error("Error searching branches:", error);
        res.status(500).json({ error: "Failed to fetch branches" });
    }
});
const kafka = new Kafka({
    clientId: "post-notifier",
    brokers: ["localhost:9092"],
});
// Kaka notification pipeline
async function triggerNotifier(postID){

const producer = kafka.producer();
const runProducer = async()=>{
    await producer.connect();
    await producer.send({
        topic: "post-notifications",
        messages: [{ value:postID.toString() }],
    });
    
  console.log('Message sent successfully!');
  await producer.disconnect(); // Disconnect the pro
}
runProducer().catch(console.error);
}
// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});