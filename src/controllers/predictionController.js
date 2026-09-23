const prisma = require('../config/prisma');
const { calculatePrediction } = require('../services/predictionService');

const createPrediction = async (req, res) => {
  try {
    const { studentId } = req.body;

    const student = await prisma.student.findUnique({
      where: { studentId }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const predictionData = calculatePrediction(student);

    const prediction = await prisma.prediction.create({
      data: {
        student: student.id,
        predictedScore: predictionData.predictedScore,
        performanceLevel: predictionData.performanceLevel,
        riskLevel: predictionData.riskLevel,
        confidence: predictionData.confidence,
        features: predictionData.features,
        recommendation: predictionData.recommendation,
        createdBy: req.user.id
      },
      include: {
        studentRef: {
          select: {
            id: true,
            studentId: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Prediction created successfully',
      prediction
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getPredictions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      prisma.prediction.findMany({
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          studentRef: {
            select: {
              id: true,
              studentId: true,
              firstName: true,
              lastName: true
            }
          },
          creator: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.prediction.count()
    ]);

    res.json({
      success: true,
      predictions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getPrediction = async (req, res) => {
  try {
    const { id } = req.params;

    const prediction = await prisma.prediction.findUnique({
      where: { id },
      include: {
        studentRef: {
          select: {
            id: true,
            studentId: true,
            firstName: true,
            lastName: true,
            gender: true,
            age: true,
            classLevel: true,
            department: true
          }
        },
        creator: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }

    res.json({ success: true, prediction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getStudentPredictions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { studentId }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const predictions = await prisma.prediction.findMany({
      where: { student: student.id },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      predictions,
      student: {
        id: student.id,
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPrediction,
  getPredictions,
  getPrediction,
  getStudentPredictions
};
