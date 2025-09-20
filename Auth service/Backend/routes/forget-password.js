const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/costumerSign.js");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        console.log("Request Body:", req.body); 

        const { email } = req.body;
        if (!email) {
            console.log("No email");
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found!");
            return res.status(404).json({ message: "user not found" });
        }

        console.log("user found:", user.email);

      
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: { 
                user: "maahivaghela05@gmail.com", 
                pass: "llfl szph zjpr oanp" 
            },
        });

        const mailOptions = {
            to: user.email,
            from: "maahivaghela05@gmail.com",
            subject: "Password Reset",
            text: `You requested a password reset.\n\nClick the link below to reset your password:\n\nhttp://localhost:5173/reset-password/${resetToken}  If you did not request this, ignore this email.`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Reset email sent to:", user.email);

        res.status(200).json({ message: "Reset link sent to email" });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.post("/reset-password/:token", async (req, res) => {
    try {
        console.log("Reset Password Request Received");
        console.log("Request Params:", req.params);
        console.log("Request Body:", req.body);

        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            console.log("Invalid or expired token");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

       // const hashedPassword = await bcrypt.hash(newPassword, 10);
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        console.log("Password successfully reset for:", user.email);
        res.status(200).json({ message: "Password successfully reset" });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;