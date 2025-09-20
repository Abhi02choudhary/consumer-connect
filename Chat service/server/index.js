// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const {Server}  = require("socket.io");
// const cors = require("cors");
// // const { redirect } = require("server/reply");

// const app = express();
// const PORT = 8080;
// app.use(cors({
//     origin: "*",  // ✅ Allow all origins (change to specific origin if needed)
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true // ✅ Allow cookies/auth headers if needed
// }));

// // ✅ Handle preflight OPTIONS requests
// app.options("*", cors());

// // const corsOptions = {
// //     origin: "*", // ✅ Allow requests from any origin
// //     methods: ["GET", "POST", "PUT",  "DELETE", "OPTIONS"], // ✅ Allow all methods
// //     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow specific headers
// //     credentials: true // ✅ Allow cookies and authentication headers
// //   };
  
// //   app.use(cors(corsOptions)); 
// // app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from frontend

//   app.use(express.json());

// const server = http.createServer(app);
// const io = new Server(server);
// const ChatSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     BranchName: String,
//     BranchID: String,
//     CustomerEmail: String,
//     CustomerName: String,
//     Status: String,
//     Messages: [
//       {
//         sender: String,
//         message: String,
//         timestamp: { type: Date, default: Date.now }
//       }
//     ]
// }, { collection: "Chat" });

// const Chat = mongoose.model("Chat", ChatSchema);
// mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/ChatService", 
// ).then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

  
//   io.on("connection", (socket) => {
//       socket.on("joinChat", ({ chatID, userType, userID }) => {
//     socket.join(chatID);
//     console.log(`${userType} (${userID}) joined room: ${chatID}`);
//   });
//   socket.on("requestChatHistory", async ({ chatID }) => {
//     try {
//         const chat = await Chat.findById(chatID);
//         if (chat) {
//             socket.emit("chatHistory", chat.Messages);
//         } else {
//             socket.emit("chatHistory", []); // Send empty array if no chat found
//         }
//     } catch (error) {
//         console.error("Error fetching chat history:", error);
//         socket.emit("chatHistory", []);
//     }
// });


//   socket.on("sendMessage", async (data) => {
//     const { chatID, sender, message } = data;
//     console.log(message);
//     io.to(chatID).emit("receiveMessage", { sender, message, timestamp: new Date().toISOString() });

//     // Save message to MongoDB (Assuming you have a Chat model)
//     await Chat.findByIdAndUpdate(chatID, { $push: { Messages: { sender, message } } });
//   });

//   socket.on("leaveChat", ({ chatID, userType, userID }) => {
//     socket.leave(chatID);
//     console.log(`${userType} (${userID}) left room: ${chatID}`);
//   });
//     socket.on("startChatRequest",  async({ customerEmail, branchID }) => {
//         try {
//             console.log("new ans",socket.id);
//             let chat = new Chat({
//                 _id: socket.id,
//                 BranchName: "Dmart",
//                 BranchID: branchID,
//                 CustomerName: customerEmail.split("@")[0],
//                 CustomerEmail: customerEmail,
//                 Status: "Active",
//                 Messages: []
//             });

//             await chat.save();
//             console.log("New chat created:", chat);

//             // Emit redirect event
//             io.emit("redirect", `http://localhost:5173/branch/${chat._id}`);
//         } catch (err) {
//             console.error("Error creating chat:", err);
//             io.emit("error", "Chat creation failed");
//         }
//     });

//     socket.on("user", async (messageData) => {
//         console.log(`New message in chat ${messageData.chatID}:`, messageData);

//         try {
//             // Find the chat document and update it by pushing the new message
//             const chat = await Chat.findById(messageData.chatID);
            
//             if (!chat) {
//                 console.log("Chat not found:", messageData.chatID);
//                 return;
//             }

//             // Push new message into the Messages array
//             chat.Messages.push({
//                 sender: messageData.sender,
//                 message: messageData.message,
//                 timestamp: messageData.timestamp
//             });

//             // Save updated chat document
//             await chat.save();

//             console.log("Message saved in DB:", messageData);

//             // Broadcast message to the chat room
//             io.to(messageData.chatID).emit("receiveMessage", messageData);
//         } catch (error) {
//             console.error("Error saving message to DB:", error);
//         }
//     });

  
// });

  
//   app.get("/chat/:email/:branchID", async (req, res) => {
//     const customerEmail = req.params.email;
//     const {branchID} = req.params;
//     let chat = await Chat.findOne({ 
//          CustomerEmail:customerEmail,
//          BranchID:branchID
//     });
//      console.log(chat);
//     try {
       
//         if (chat) {
           
//             // ✅ Chat exists → Redirect to existing chat
//             return res.json({ redirectUrl:`http://localhost:5173/branch/${chat._id}`});
//             // return res.redirect(`http://localhost:5173/branch/${chat._id}`);
//         } else {
//             // ✅ No chat exists → Start WebSocket Connection
//             console.log("hello");
//           //  io.emit("startChatRequest", { customerEmail, branchID });
//             res.json({ startSocket: true, customerEmail, branchID });
//         }
//     } catch (error) {
//         console.error("Error checking/creating chat:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//  app.get("/chat/:email",async(req,res)=>{
//     const customerEmail=req.params.email;
//     try {
//         const branches = await Chat.find({ CustomerEmail: customerEmail });
//         // console.log(branches);
//     if (!branches.length) {
//         return res.status(404).json({ message: "No chats found for this customer." });
//       }
  
//       res.json(branches);
//     } catch (error) {
//       console.error("Error fetching customer chats:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//  })
//  app.get("/Branchchat/:id",async(req,res)=>{
//     const branchID=req.params.id;
//     try {
//         const customers = await Chat.find({ BranchID:branchID });
//         //  console.log(branchID);
//     if (!customers.length) {
//         return res.status(404).json({ message: "No chats found for this customer." });
//       }
  
//       res.json(customers);
//     } catch (error) {
//       console.error("Error fetching customer chats:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//  })
//   server.listen(8080, () => {
//     console.log("Server running on http://localhost:8080");
// });

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const {Server}  = require("socket.io");
const cors = require("cors");
// const { redirect } = require("server/reply");
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net";  // Update if needed
  const client = new MongoClient(MONGO_URI);
  const client1 = new MongoClient(MONGO_URI);
 
const app = express();
const PORT = 8081;
app.use(cors({
    origin: "*",  // ✅ Allow all origins (change to specific origin if needed)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // ✅ Allow cookies/auth headers if needed
}));

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

// const corsOptions = {
//     origin: "*", // ✅ Allow requests from any origin
//     methods: ["GET", "POST", "PUT",  "DELETE", "OPTIONS"], // ✅ Allow all methods
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow specific headers
//     credentials: true // ✅ Allow cookies and authentication headers
//   };
  
//   app.use(cors(corsOptions)); 
// app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from frontend

  app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);
const ChatSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    BranchName: String,
    BranchID: String,
    CustomerEmail: String,
    CustomerName: String,
    Status: String,
    Messages: [
      {
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
      }
    ]
}, { collection: "Chat" });

const Chat = mongoose.model("Chat", ChatSchema);
mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/ChatService", 
).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  
  io.on("connection", (socket) => {
      socket.on("joinChat", ({ chatID, userType, userID }) => {
    socket.join(chatID);
    console.log(`${userType} (${userID}) joined room: ${chatID}`);
  });
  socket.on("requestChatHistory", async ({ chatID }) => {
    try {
        const chat = await Chat.findById(chatID);
        if (chat) {
            socket.emit("chatHistory", chat.Messages);
        } else {
            socket.emit("chatHistory", []); // Send empty array if no chat found
        }
    } catch (error) {
        console.error("Error fetching chat history:", error);
        socket.emit("chatHistory", []);
    }
});


  socket.on("sendMessage", async (data) => {
    const { chatID, sender, message } = data;
    
    io.to(chatID).emit("receiveMessage", { sender, message, timestamp: new Date().toISOString() });

    // Save message to MongoDB (Assuming you have a Chat model)
    await Chat.findByIdAndUpdate(chatID, { $push: { Messages: { sender, message } } });
  });

  socket.on("leaveChat", ({ chatID, userType, userID }) => {
    socket.leave(chatID);
    console.log(`${userType} (${userID}) left room: ${chatID}`);
  });
    socket.on("startChatRequest",  async({ customerEmail, branchID }) => {
      await client.connect();
      const branchDb=client.db("Authentication").collection("bsignups");
        try {
          const branch= await branchDb.findOne({privateID:branchID});

            console.log("new ans",socket.id);
            console.log(branchID);
            let chat = new Chat({
                _id: socket.id,
                BranchName: branch.branch_name,
                BranchID: branchID,
                CustomerName: customerEmail.split("@")[0],
                CustomerEmail: customerEmail,
                Status: "Active",
                Messages: []
            });

            await chat.save();
            console.log("New chat created:", chat);

            // Emit redirect event
            io.emit("redirect", `http://localhost:5175/branch/${chat._id}`);
        } catch (err) {
            console.error("Error creating chat:", err);
            io.emit("error", "Chat creation failed");
        }
    });
    app.delete("/chat/:chatID", async (req, res) => {
      const { chatID } = req.params;
    
      try {
        const chat = await Chat.findById(chatID);
        await client1.connect();
        const statusDb = client1.db('StatusService');
        console.log("my chats");
        console.log(chat);
        const status = await statusDb.collection('Status').findOne({email:chat.CustomerEmail,privateID:chat.BranchID});
        const updateResult = await  statusDb.collection('Status').updateOne({email:chat.CustomerEmail,privateID:chat.BranchID}, {
          $set: { status: 'Resolved' }
        });
        console.log(updateResult);
    const deleted = await Chat.findOneAndDelete({ _id:chatID });

    if (updateResult!=null) {
      console.log('Status updated to Resolved.');
    } else {
      console.log('No matching document found.');
    }
        if (!deleted) {
          return res.status(404).json({ message: "Chat not found" });

        }
    
        res.status(200).json({ message: "Chat deleted successfully" });
      } catch (err) {
        console.error("Error deleting chat:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    socket.on("user", async (messageData) => {
        console.log(`New message in chat ${messageData.chatID}:`, messageData);

        try {
            // Find the chat document and update it by pushing the new message
            const chat = await Chat.findById(messageData.chatID);
            
            if (!chat) {
                console.log("Chat not found:", messageData.chatID);
                return;
            }

            // Push new message into the Messages array
            chat.Messages.push({
                sender: messageData.sender,
                message: messageData.message,
                timestamp: messageData.timestamp
            });

            // Save updated chat document
            await chat.save();

            console.log("Message saved in DB:", messageData);

            // Broadcast message to the chat room
            io.to(messageData.chatID).emit("receiveMessage", messageData);
        } catch (error) {
            console.error("Error saving message to DB:", error);
        }
    });

  
});

app.get("/chat/branchname/:chatID", async (req, res) => {
  try {
    const  chatID  = req.params.chatID;
    console.log(req.params.chatID);
    const chat = await Chat.findOne({ _id:chatID });
    console.log(chat);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      BranchName: chat.BranchName,
      // include more if needed
    });
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/chat/customername/:chatID", async (req, res) => {
  try {
    const  chatID  = req.params.chatID;
    console.log(req.params.chatID);
    const chat = await Chat.findOne({ _id:chatID });
    console.log(chat);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      CustomerName: chat.CustomerName,
      // include more if needed
    });
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ message: "Server error" });
  }
});
  app.get("/chat/:email/:branchID", async (req, res) => {
    const customerEmail = req.params.email;
    const {branchID} = req.params;
    let chat = await Chat.findOne({ 
         CustomerEmail:customerEmail,
         BranchID:branchID
    });
     console.log(chat);
    try {
       
        if (chat) {
           
            // ✅ Chat exists → Redirect to existing chat
            return res.json({ redirectUrl:`http://localhost:5175/branch/${chat._id}`});
            // return res.redirect(`http://localhost:5173/branch/${chat._id}`);
        } else {
            // ✅ No chat exists → Start WebSocket Connection
            console.log("hello");
          //  io.emit("startChatRequest", { customerEmail, branchID });
            res.json({ startSocket: true, customerEmail, branchID });
        }
    } catch (error) {
        console.error("Error checking/creating chat:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

 app.get("/chat/:email",async(req,res)=>{
    const customerEmail=req.params.email;
    try {
        const branches = await Chat.find({ CustomerEmail: customerEmail });
        // console.log(branches);
    if (!branches.length) {
        return res.status(404).json({ message: "No chats found for this customer." });
      }
  
      res.json(branches);
    } catch (error) {
      console.error("Error fetching customer chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
 })
 app.get("/Branchchat/:id",async(req,res)=>{
    const branchID=req.params.id;
    console.log(req.params);
    try {
        const customers = await Chat.find({ BranchID:branchID });
         console.log(customers);
    if (!customers.length) {
        return res.status(404).json({ message: "No chats found for this customer." });
      }
  
      res.json(customers);
    } catch (error) {
      console.error("Error fetching customer chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
 })
  server.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});