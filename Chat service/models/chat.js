import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        sender:{type:String},
        message:{type:String,required:true},
        timestamp: { type: Date, default: Date.now()}
    }
)
const ChatSchema = new Schema({
    BranchName: { type: String, required: true }, // Store branch details (e.g., Dmart branch)
    BranchID: { type: String, required: true },
    CustomerEmail:{type:String,required:true},
    CustomerName: { type: String, required: true }, // Customer's email or name
    Status: { type: String }, // Chat status
    Messages: [MessageSchema] // Array to store messages
  });


  const Chat = model("Chat", ChatSchema);
  export default Chat;