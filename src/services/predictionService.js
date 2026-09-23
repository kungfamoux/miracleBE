const calculatePrediction = (student) => {
  const { attendance, previousScore, assignmentScore, studyHours, participation } = student;

  // Weighted calculation
  const attendanceWeight = 0.20;
  const previousScoreWeight = 0.30;
  const assignmentScoreWeight = 0.15;
  const studyHoursWeight = 0.15;
  const participationWeight = 0.20;

  // Normalize study hours (0-24 to 0-100)
  const normalizedStudyHours = (studyHours / 24) * 100;

  // Calculate predicted score
  const predictedScore = Math.round(
    (attendance * attendanceWeight) +
    (previousScore * previousScoreWeight) +
    (assignmentScore * assignmentScoreWeight) +
    (normalizedStudyHours * studyHoursWeight) +
    (participation * participationWeight)
  );

  // Determine performance level
  let performanceLevel;
  if (predictedScore >= 85) {
    performanceLevel = 'Excellent';
  } else if (predictedScore >= 70) {
    performanceLevel = 'Good';
  } else if (predictedScore >= 50) {
    performanceLevel = 'Average';
  } else if (predictedScore >= 40) {
    performanceLevel = 'Fair';
  } else {
    performanceLevel = 'Poor';
  }

  // Determine risk level
  let riskLevel;
  if (predictedScore >= 60) {
    riskLevel = 'Low';
  } else if (predictedScore >= 40) {
    riskLevel = 'Moderate';
  } else {
    riskLevel = 'High';
  }

  // Calculate confidence based on data completeness
  const confidence = Math.min(100, Math.round(
    (attendance > 0 ? 20 : 0) +
    (previousScore > 0 ? 30 : 0) +
    (assignmentScore > 0 ? 15 : 0) +
    (studyHours > 0 ? 15 : 0) +
    (participation > 0 ? 20 : 0)
  ));

  // Generate recommendation
  let recommendation;
  if (riskLevel === 'High') {
    recommendation = 'Student is at high risk of poor performance. Immediate intervention recommended.';
  } else if (riskLevel === 'Moderate') {
    recommendation = 'Student may need additional support to improve performance.';
  } else {
    recommendation = 'Student is expected to maintain satisfactory performance.';
  }

  return {
    predictedScore,
    performanceLevel,
    riskLevel,
    confidence,
    features: {
      attendance,
      previousScore,
      assignmentScore,
      studyHours,
      participation
    },
    recommendation
  };
};

module.exports = { calculatePrediction };
