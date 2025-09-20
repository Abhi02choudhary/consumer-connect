const express = require("express");
const router = express.Router();
const branch = require("../models/info");
const Status = require("../models/status"); // Your status schema

// GET route for active/resolved complaint count per branch
router.get("/:org_name/:cleanlocation", async (req, res) => {
  const { org_name, cleanlocation } = req.params;

  try {
    const reqbranch = await branch.findOne({ branch_name: org_name, cleanlocation });

    if (!reqbranch) {
      console.log("Branch not found for given org_name and cleanlocation.");
      return res.status(404).json({ message: "Branch not found" });
    }

    const privateID = reqbranch.privateID;

    const result = await Status.aggregate([
      {
        $match: { privateID },
      },
      {
        $group: {
          _id: "$status", 
          count: { $sum: 1 },
        },
      },
    ]);

  
    const formatted = {
      Active: 0,
      Resolved: 0,
    };

    result.forEach((item) => {
      if (item._id === "Active") formatted.Active = item.count;
      if (item._id === "Resolved") formatted.Resolved = item.count;
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching status counts", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router; 