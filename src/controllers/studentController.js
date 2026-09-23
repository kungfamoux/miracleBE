const prisma = require('../config/prisma');

const createStudent = async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      gender,
      age,
      classLevel,
      department,
      attendance,
      previousScore,
      assignmentScore,
      studyHours,
      participation
    } = req.body;

    const studentExists = await prisma.student.findUnique({
      where: { studentId }
    });

    if (studentExists) {
      return res.status(400).json({ success: false, message: 'Student ID already exists' });
    }

    const student = await prisma.student.create({
      data: {
        studentId,
        firstName,
        lastName,
        gender,
        age,
        classLevel,
        department,
        attendance,
        previousScore,
        assignmentScore,
        studyHours,
        participation,
        createdBy: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { studentId: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {};

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          creator: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.student.count({ where })
    ]);

    res.json({
      success: true,
      students,
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

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        predictions: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (data.studentId && data.studentId !== student.studentId) {
      const studentExists = await prisma.student.findUnique({
        where: { studentId: data.studentId }
      });

      if (studentExists) {
        return res.status(400).json({ success: false, message: 'Student ID already exists' });
      }
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data
    });

    res.json({
      success: true,
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await prisma.student.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
