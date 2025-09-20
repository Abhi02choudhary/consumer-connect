const express = require("express");
const router = express.Router();
const User = require('../models/review');
const branch = require('../models/info');

router.get("/:org_name/:cleanlocation", async (req, res) => {
  try {
    const { org_name, cleanlocation } = req.params;

    const branchReview = await User.find({ org_name, cleanlocation });
    console.log("Reviews:", branchReview);

    res.status(200).json({
      reviews: branchReview
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;