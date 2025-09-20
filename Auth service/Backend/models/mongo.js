require("dotenv").config(); 

console.log(" MONGO_URI:", process.env.MONGO_URI); 

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined! Check your .env file.");
    process.exit(1); 
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(" MongoDB Connected Successfully!");
}).catch((err) => {
    console.error(" MongoDB Connection Failed:", err);
});
module.exports = mongoose;