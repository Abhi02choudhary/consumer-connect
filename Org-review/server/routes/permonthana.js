// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const branch = require("../models/info"); 
// const Post = require("../models/posts"); 

// router.get("/:org_name/:cleanlocation", async (req, res) => {
//     const { org_name, cleanlocation } = req.params;
//     const reqbranch = await branch.findOne({ branch_name: org_name, cleanlocation: cleanlocation });

//     try {
//         const result = await Post.aggregate([
//             {
//                 $match: {
//                     branchId: reqbranch.privateID
//                 }
//             },
//             {
//                 $group: {
//                     _id: {
//                         year: { $year: "$updatedAt" },
//                         month: { $month: "$updatedAt" }
//                     },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: {
//                     "_id.year": 1,
//                     "_id.month": 1
//                 }
//             }
//         ]);
//         const formatted = result.map(item => ({
//             month: `${item._id.month}-${item._id.year}`,
//             count: item.count
//         }));
//         console.log(formatted);
//         return res.status(200).json({
//             complaintsByMonth: formatted
//         });
//     } catch (error) {
//         console.error("Error in analytics route:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const branch = require("../models/info");
const Post = require("../models/posts");

router.get("/:org_name/:cleanlocation", async (req, res) => {
    const { org_name, cleanlocation } = req.params;

    console.log("Received request for:", org_name, cleanlocation);

    try {
        const reqbranch = await branch.findOne({ branch_name: org_name, cleanlocation });

        if (!reqbranch) {
            console.log("Branch not found for given org_name and cleanlocation.");
            return res.status(404).json({ message: "Branch not found" });
        }

        const privateID = reqbranch.privateID;
        console.log("Found privateID:", privateID);

        // Check if there are posts with this branchId
        const testPosts = await Post.find({ branchId: privateID });
        console.log("Found Posts Count:", testPosts.length);

        if (testPosts.length === 0) {
            console.log("No posts found for privateID:", privateID);
        }

        const result = await Post.aggregate([
            {
                $match: {
                    privateID: privateID
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$updatedAt" },
                        month: { $month: "$updatedAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        const formatted = result.map(item => ({
            month: `${item._id.month}-${item._id.year}`,
            count: item.count
        }));

        console.log("Final Complaint Data:", formatted);

        return res.status(200).json({
            complaintsByMonth: formatted
        });

    } catch (error) {
        console.error("Error in analytics route:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;