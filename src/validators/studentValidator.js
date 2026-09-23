const { body } = require('express-validator');

const validateStudent = [
  body('studentId').trim().notEmpty().withMessage('Student ID is required'),
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('gender').trim().notEmpty().withMessage('Gender is required'),
  body('age').isInt({ min: 5, max: 100 }).withMessage('Age must be between 5 and 100'),
  body('classLevel').trim().notEmpty().withMessage('Class level is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('attendance').isInt({ min: 0, max: 100 }).withMessage('Attendance must be between 0 and 100'),
  body('previousScore').isInt({ min: 0, max: 100 }).withMessage('Previous score must be between 0 and 100'),
  body('assignmentScore').isInt({ min: 0, max: 100 }).withMessage('Assignment score must be between 0 and 100'),
  body('studyHours').isInt({ min: 0, max: 24 }).withMessage('Study hours must be between 0 and 24'),
  body('participation').isInt({ min: 0, max: 100 }).withMessage('Participation must be between 0 and 100')
];

const validateStudentUpdate = [
  body('studentId').optional().trim().notEmpty().withMessage('Student ID cannot be empty'),
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('gender').optional().trim().notEmpty().withMessage('Gender cannot be empty'),
  body('age').optional().isInt({ min: 5, max: 100 }).withMessage('Age must be between 5 and 100'),
  body('classLevel').optional().trim().notEmpty().withMessage('Class level cannot be empty'),
  body('department').optional().trim().notEmpty().withMessage('Department cannot be empty'),
  body('attendance').optional().isInt({ min: 0, max: 100 }).withMessage('Attendance must be between 0 and 100'),
  body('previousScore').optional().isInt({ min: 0, max: 100 }).withMessage('Previous score must be between 0 and 100'),
  body('assignmentScore').optional().isInt({ min: 0, max: 100 }).withMessage('Assignment score must be between 0 and 100'),
  body('studyHours').optional().isInt({ min: 0, max: 24 }).withMessage('Study hours must be between 0 and 24'),
  body('participation').optional().isInt({ min: 0, max: 100 }).withMessage('Participation must be between 0 and 100')
];

module.exports = { validateStudent, validateStudentUpdate };
