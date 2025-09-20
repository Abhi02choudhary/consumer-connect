const mongoose = require("mongoose");

const authDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Authentication",
  
);

const branchProfileDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/BranchProfile",
  
);

const postDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/PostService",
  
);

const statusDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/StatusService",
);
module.exports = {
  authDB,
  branchProfileDB,
  postDB,
  statusDB,
};