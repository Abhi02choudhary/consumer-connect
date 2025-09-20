// scripts/backfillTimestamps.js

const mongoose = require("mongoose");

// Schema definition with timestamps enabled
const ChatSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// Adjust collection name and URI as needed
const Chat = mongoose.model("Chat", ChatSchema);

const run = async () => {
  try {
    await mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/ChatService", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const Chats = await Chat.find({ createdAt: { $exists: false } });
    console.log(Chats);
    console.log(`Found ${Chats.length} Chats without timestamps.`);

    for (const Chat of Chats) {
      const timestamp = Chat._id.getTimestamp(); // extract from _id
      Chat.createdAt = timestamp;
      Chat.updatedAt = timestamp;
      await Chat.save();
    }

    console.log("✅ Backfill complete. All Chats now have timestamps.");
  } catch (err) {
    console.error("❌ Error during timestamp backfill:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();