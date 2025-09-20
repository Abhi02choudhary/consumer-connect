const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const branch = require("../models/info");

router.get("/:org_name/:cleanlocation", async (req, res) => {
  const { org_name, cleanlocation } = req.params;

  try {
    console.log("Received request for:", org_name, cleanlocation);

    // Use case-insensitive matching with regex
    const reqbranch = await branch.findOne({
      branch_name: { $regex: new RegExp(`^${org_name}$`, "i") },
      cleanlocation: { $regex: new RegExp(`^${cleanlocation}$`, "i") },
    });

    if (!reqbranch) {
      console.log("Branch not found for:", org_name, cleanlocation);
      return res.status(404).json({ message: "Branch not found" });
    }

    const privateID = reqbranch.privateID;
    console.log("Found privateID:", privateID);

    const aggregation = await Post.aggregate([
      {
        $match: {
          privateID: privateID,
        },
      },
      {
        $group: {
          _id: "$postAuthStatus", // true or false
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      authenticated: 0,
      unauthenticated: 0,
    };

    aggregation.forEach(item => {
      if (item._id === true) stats.authenticated = item.count;
      else stats.unauthenticated = item.count;
    });

    console.log("Final Auth Status Stats:", stats);

    //res.status(200).json();
    return res.status(200).json({
      complaintsByType: stats,
    });
  } catch (err) {
    console.error("Error in authStatusStats route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;