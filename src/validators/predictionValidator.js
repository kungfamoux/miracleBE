const { body } = require('express-validator');

const validatePrediction = [
  body('studentId').trim().notEmpty().withMessage('Student ID is required')
];

module.exports = { validatePrediction };
