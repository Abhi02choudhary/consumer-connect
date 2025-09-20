const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/protected-route", authMiddleware, (req, res) => {
    console.log("access granted for:", req.user);
    res.json({ message: "protected data accessed", user: req.user });
});

module.exports = router;