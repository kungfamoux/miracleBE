const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { validateStudent, validateStudentUpdate } = require('../validators/studentValidator');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post('/', authMiddleware, validateStudent, validationMiddleware, createStudent);
router.get('/', authMiddleware, getStudents);
router.get('/:id', authMiddleware, getStudent);
router.put('/:id', authMiddleware, validateStudentUpdate, validationMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;
