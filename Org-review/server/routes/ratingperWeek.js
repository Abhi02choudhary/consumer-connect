const Review = require("../models/review");
const branch = require("../models/info");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.get("/:org_name/:cleanlocation", async (req, res) => {
  try {
    const branchId = await branch.findOne({
      branch_name: req.params.org_name,
      cleanlocation: req.params.cleanlocation,
    });
    if (!branchId) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const reviews = await Review.find({ branchId:branchId._id }).sort({ createdAt: 1 });

    const weeklyData = new Map();
    let total = 0;
    let count = 0;

    reviews.forEach(review => {
      const weekKey = moment(review.createdAt).isoWeek() + "-" + moment(review.createdAt).isoWeekYear();
      total += review.rating;
      count += 1;
      const avg = total / count;

      weeklyData.set(weekKey, avg); // overwrite to ensure cumulative
    });

    const result = Array.from(weeklyData, ([week, avgRating]) => ({ week, avgRating }));
   console.log(result);
    return res.json({
        avgRatingVsWeek: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;