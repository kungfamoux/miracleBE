# Student Prediction System Backend

A comprehensive Node.js/Express backend with Prisma ORM and PostgreSQL for a student performance prediction system with authentication, student management, prediction engine, and analytics dashboard.

## Features

- **Authentication**: JWT-based authentication with register, login, logout, and current user endpoints
- **Student Management**: Full CRUD operations with search and pagination
- **Prediction Engine**: Weighted algorithm using attendance, previous scores, assignments, study hours, and participation
- **Dashboard Analytics**: Statistics, performance distribution, and risk distribution
- **User Management**: Admin/teacher roles with user CRUD operations
- **Security**: Password hashing with bcrypt, JWT tokens, CORS, input validation

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (input validation)
- cors (Cross-Origin Resource Sharing)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── predictionController.js
│   │   ├── dashboardController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── predictionRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── predictionService.js
│   │   └── dashboardService.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── studentValidator.js
│   │   └── predictionValidator.js
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

3. Initialize Prisma and push schema:
```bash
npx prisma generate
npx prisma db push
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Students
- `GET /api/students` - Get all students with pagination and search (protected)
- `POST /api/students` - Create new student (protected)
- `GET /api/students/:id` - Get single student (protected)
- `PUT /api/students/:id` - Update student (protected)
- `DELETE /api/students/:id` - Delete student (protected)

### Predictions
- `GET /api/predictions` - Get all predictions (protected)
- `POST /api/predictions` - Create prediction (protected)
- `GET /api/predictions/:id` - Get single prediction (protected)
- `GET /api/predictions/student/:studentId` - Get student predictions (protected)

### Dashboard
- `GET /api/dashboard/statistics` - Get dashboard statistics (protected)
- `GET /api/dashboard/performance` - Get performance distribution (protected)
- `GET /api/dashboard/risk` - Get risk distribution (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get single user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

## Prediction Algorithm

The prediction system uses a weighted algorithm:

- Attendance: 20%
- Previous Score: 30%
- Assignment Score: 15%
- Study Hours: 15% (normalized from 0-24 to 0-100)
- Participation: 20%

### Performance Levels
- 85-100: Excellent
- 70-84: Good
- 50-69: Average
- 40-49: Fair
- 0-39: Poor

### Risk Levels
- 60-100: Low Risk
- 40-59: Moderate Risk
- 0-39: High Risk

## Database Schema

### User
- id (UUID)
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: admin/teacher)
- createdAt (DateTime)
- updatedAt (DateTime)

### Student
- id (UUID)
- studentId (String, unique)
- firstName (String)
- lastName (String)
- gender (String)
- age (Int)
- classLevel (String)
- department (String)
- attendance (Int, 0-100)
- previousScore (Int, 0-100)
- assignmentScore (Int, 0-100)
- studyHours (Int, 0-24)
- participation (Int, 0-100)
- createdBy (UUID, foreign key)
- createdAt (DateTime)
- updatedAt (DateTime)

### Prediction
- id (UUID)
- student (UUID, foreign key)
- predictedScore (Int)
- performanceLevel (String)
- riskLevel (String)
- confidence (Int)
- features (JSON)
- recommendation (String)
- createdBy (UUID, foreign key)
- createdAt (DateTime)

## Validation Rules

- Student ID: Required, unique
- First Name: Required, minimum 2 characters
- Age: Required, 5-100
- Attendance: 0-100
- Previous Score: 0-100
- Assignment Score: 0-100
- Study Hours: 0-24
- Participation: 0-100
- Email: Valid email format, unique
- Password: Minimum 6 characters

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation on all endpoints
- CORS configuration
- Environment variable management

## License

ISC
