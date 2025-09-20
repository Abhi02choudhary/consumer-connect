

// const express = require("express");
// const router = express.Router();
// const User = require('../models/review');
// const branch = require('../models/info');

// router.get("/:org_name/:cleanlocation", async (req, res) => {
//   try {
//     const { org_name, cleanlocation } = req.params;

//     const branchReview = await User.find({ org_name, cleanlocation });
//     const branchData = await branch.findOne({ branch_name: org_name, cleanlocation });

//     if (!branchData) {
//       console.log("Branch not found for: ", org_name, cleanlocation);
//       return res.status(404).json({ message: "Wrong url" });
//     }

//     console.log("Branch Data:", branchData);
//     console.log("Reviews:", branchReview);

//     res.status(200).json({
//       branchData,
//       reviews: branchReview
//     });

//   } catch (error) {
//     console.error("Error fetching branch data:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const User = require('../models/review');
const branch = require('../models/info');
const mongoose = require('mongoose'); // Make sure mongoose is required

router.get("/:org_name/:cleanlocation", async (req, res) => {
  try {
    const { org_name, cleanlocation } = req.params;
    console.log("Params received:", org_name, cleanlocation);
    
    const branchReview = await User.find({ org_name, cleanlocation });
    const branchData = await branch.findOne({ branch_name: org_name, cleanlocation });

    if (!branchData) {
      console.log("Branch not found for:", org_name, cleanlocation);
      return res.status(404).json({ message: "Wrong url" });
    }

    console.log("Branch Data:", branchData);
    console.log("Reviews:", branchReview);

    // Aggregate complaints per month from reviews based on branchId
    // const complaints = await User.aggregate([
    //   {
    //     $match: {
    //       branchId: new mongoose.Types.ObjectId(branchData._id)
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         year: { $year: "$createdAt" },
    //         month: { $month: "$createdAt" }
    //       },
    //       count: { $sum: 1 }
    //     }
    //   },
    //   { $sort: { "_id.year": 1, "_id.month": 1 } }
    // ]);

    // const formattedComplaints = complaints.map(item => ({
    //   month: `${item._id.month}-${item._id.year}`,
    //   count: item.count
    // }));

    // Return a single, combined response.
    //console.log(formattedComplaints);
    return res.status(200).json({
      branchData,
      reviews: branchReview,
      //complaintsByMonth: formattedComplaints
    });

  } catch (error) {
    console.error("Error fetching branch data:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;