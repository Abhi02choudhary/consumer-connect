const express = require('express');
const router = express.Router();
const Review = require('../models/review'); 
const branch = require('../models/info');
const mongoose = require('mongoose');

router.get('/:org_name/:cleanlocation', async (req, res) => {
    const { org_name, cleanlocation } = req.params;
  const reqbranchId = await branch.findOne({ branch_name: org_name, cleanlocation: cleanlocation });

  try {
    const complaints = await Review.aggregate([
      {
        $match: {
          branchId: new mongoose.Types.ObjectId(reqbranchId._id)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const formatted = complaints.map(item => ({
      month: `${item._id.month}-${item._id.year}`,
      count: item.count
    }));

    console.log(formatted);
    return res.status(200).json({
      complaintsByMonth: formatted
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});

module.exports = router;