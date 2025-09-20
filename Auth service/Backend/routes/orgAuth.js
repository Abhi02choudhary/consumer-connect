const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/orgSign.js");

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed" }),
    async (req, res) => {
        try {
            const email = req.user.emails[0].value;
            const existingUser = await User.findOne({ email });

if (!existingUser) {
    console.log("User not registered");
    return res.redirect("http://localhost:5173/Orglogin");
}

console.log("Login successful");

 res.redirect('http://localhost:5173/');

} catch (error) {
console.error("Google Auth Error:", error);
res.redirect("http://localhost:5173/Orglogin");
}
}
);

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
