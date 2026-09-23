const express = require('express');
const router = express.Router();
const {
  getDashboardStatistics,
  getPerformanceDistribution,
  getRiskDistribution
} = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/statistics', authMiddleware, getDashboardStatistics);
router.get('/performance', authMiddleware, getPerformanceDistribution);
router.get('/risk', authMiddleware, getRiskDistribution);

module.exports = router;
