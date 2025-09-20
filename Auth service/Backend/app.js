
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieSession = require('cookie-session');
require("dotenv").config();
require("./models/mongo.js");

//const authRoute = require("./routes/auth.js");
const passportSetup = require("./routes/passport.js");
const Costumerlogin = require("./routes/cLogin.js");
const Orglogin = require("./routes/oLogin.js");
const Branchlogin = require("./routes/bLogin.js"); 
const Branchsignup = require("./routes/bSignUp.js"); 
const Costumersignup = require("./routes/cSignUp.js"); 
const Orgsignup = require("./routes/oSignUp.js");
const passport = require("passport");
const authRoute = require("./routes/auth.js");
const orgauth = require("./routes/orgAuth.js");
const cookieParser = require("cookie-parser");
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(session({
  secret: "e4d1c3b7a8f9e6b5d2c1f0a3b8e7d6c4",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/Costumerlogin", Costumerlogin);
app.use("/Orglogin", Orglogin);
app.use("/Branchlogin", Branchlogin);
app.use("/Branchsignup", Branchsignup);
app.use("/Costumersignup", Costumersignup);
app.use("/Orgsignup", Orgsignup);
app.use("/auth", authRoute);
app.use("/orgauth", orgauth);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

//app.use("/forgot-password", require("./routes/forgotPassword"));
const forgotPasswordRoutes = require("./routes/forget-password");
const orgforgotPasswordRoutes = require("./routes/orgforget-password");
const branchforgotPasswordRoutes = require("./routes/branchforget-password");
app.use("/forgot-password", forgotPasswordRoutes);
app.use("/orgforgot-password", orgforgotPasswordRoutes);
app.use("/branchforgot-password", branchforgotPasswordRoutes);

app.get("/check-session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/logout", async (req, res) => {
  try {
    await req.logout();
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
});


// Protected Route Example (Requires JWT)
// const authMiddleware = require("./middleware/authMiddleware"); // JWT middleware
// app.get("/protected-route", authMiddleware, (req, res) => {
//   res.json({ message: "Welcome to the protected route!", user: req.user });
// });

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

