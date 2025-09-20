const express = require("express");
const port = 8086;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { authDB, branchProfileDB, postDB, statusDB} = require('./mongo')
const path = require('path');



app.use(express.json()); 
const authStatusStats = require("./routes/authvsunauth");

const monthana = require('./routes/monthana');
const orgList = require('./routes/orgList');
const review = require("./routes/reviewForm");
const orgdetails = require('./routes/indiInfo');
const orgreviews = require('./routes/indiReview');
const avgRatingAnalysis = require('./routes/ratingperWeek');
const monthvscom=require('./routes/permonthana');
const statusAnalysis = require('./routes/statusAnalysis')
app.use(cors({
  origin: "*", 
//   credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "CompanyProfile"]
}));

authDB.on('connected', ()=>{
    console.log("connected 1");
})

branchProfileDB.on('connected', ()=>{
    console.log("connected 2");
})

postDB.on('connected', ()=>{
    console.log("connected 3");
})

statusDB.on('connected',()=>{
    console.log("connected 4");
})

app.use('/', orgList);
app.use('/monthvscom', monthvscom);
app.use('/avgRatingAnalysis', avgRatingAnalysis);
app.use('/complainAnalysis', monthana);
app.use('/company', orgdetails);
app.use('/review', orgreviews);
app.use('/write-review', review);
app.use("/authStatusStats", authStatusStats);
app.use("/statusAnalysis",statusAnalysis)

app.listen(port, ()=>{
    console.log(`listing on ${port}`);
})