const prisma = require('../config/prisma');

const getStatistics = async () => {
  const [totalStudents, totalPredictions, predictions] = await Promise.all([
    prisma.student.count(),
    prisma.prediction.count(),
    prisma.prediction.findMany({
      select: { predictedScore: true, riskLevel: true }
    })
  ]);

  const averagePrediction = predictions.length > 0
    ? Math.round(predictions.reduce((sum, p) => sum + p.predictedScore, 0) / predictions.length)
    : 0;

  const highRiskStudents = predictions.filter(p => p.riskLevel === 'High').length;
  const moderateRiskStudents = predictions.filter(p => p.riskLevel === 'Moderate').length;
  const lowRiskStudents = predictions.filter(p => p.riskLevel === 'Low').length;

  return {
    totalStudents,
    totalPredictions,
    averagePrediction,
    highRiskStudents,
    moderateRiskStudents,
    lowRiskStudents
  };
};

const getPerformanceDistribution = async () => {
  const predictions = await prisma.prediction.findMany({
    select: { performanceLevel: true }
  });

  const distribution = {
    excellent: predictions.filter(p => p.performanceLevel === 'Excellent').length,
    good: predictions.filter(p => p.performanceLevel === 'Good').length,
    average: predictions.filter(p => p.performanceLevel === 'Average').length,
    fair: predictions.filter(p => p.performanceLevel === 'Fair').length,
    poor: predictions.filter(p => p.performanceLevel === 'Poor').length
  };

  return distribution;
};

const getRiskDistribution = async () => {
  const predictions = await prisma.prediction.findMany({
    select: { riskLevel: true }
  });

  const distribution = {
    low: predictions.filter(p => p.riskLevel === 'Low').length,
    moderate: predictions.filter(p => p.riskLevel === 'Moderate').length,
    high: predictions.filter(p => p.riskLevel === 'High').length
  };

  return distribution;
};

module.exports = {
  getStatistics,
  getPerformanceDistribution,
  getRiskDistribution
};
