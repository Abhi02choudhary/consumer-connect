
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/costumerSign.js");


router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed" }),
    async (req, res) => {
        try {
            const email = req.user.emails[0].value;

            // Check if email exists in the database
            const existingUser = await User.findOne({ email });


if (!existingUser) {
    console.log("User not registered");
    return res.redirect("http://localhost:5173");
}

console.log("Login successful");
console.log(email);
 res.redirect(`http://localhost:5175/${email}`);

} catch (error) {  
console.error("Google Auth Error:", error);
res.redirect("http://localhost:5173/Customerlogin");
}
}
);
router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
