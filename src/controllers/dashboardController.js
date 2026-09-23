const {
  getStatistics,
  getPerformanceDistribution: getPerformanceDist,
  getRiskDistribution: getRiskDist
} = require('../services/dashboardService');

const getDashboardStatistics = async (req, res) => {
  try {
    const statistics = await getStatistics();
    res.json({ success: true, statistics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getPerformanceDistribution = async (req, res) => {
  try {
    const distribution = await getPerformanceDist();
    res.json({ success: true, distribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getRiskDistribution = async (req, res) => {
  try {
    const distribution = await getRiskDist();
    res.json({ success: true, distribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboardStatistics,
  getPerformanceDistribution,
  getRiskDistribution
};
