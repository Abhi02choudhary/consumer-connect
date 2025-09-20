const jwt = require("jsonwebtoken");
const SECRET_KEY = "e4d1c3b7a8f9e6b5d2c1f0a3b8e7d6c4";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("🔹 Incoming Token:", token);

    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("❌ Invalid Token:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;