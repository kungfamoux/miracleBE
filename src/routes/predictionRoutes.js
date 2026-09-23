const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getPredictions,
  getPrediction,
  getStudentPredictions
} = require('../controllers/predictionController');
const { validatePrediction } = require('../validators/predictionValidator');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post('/', authMiddleware, validatePrediction, validationMiddleware, createPrediction);
router.get('/', authMiddleware, getPredictions);
router.get('/student/:studentId', authMiddleware, getStudentPredictions);
router.get('/:id', authMiddleware, getPrediction);

module.exports = router;
