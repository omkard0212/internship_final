# Internship Portal

A comprehensive platform connecting students, companies, and universities for internship opportunities.

## Features

- Three types of users: Students, Companies, and Universities
- Student dashboard with internship tracking
- Company dashboard with student management
- University dashboard with placement statistics
- Review system for internship experiences
- Skill tracking and matching

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd internship-portal
```

2. Set up the backend:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Set up the frontend:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
internship-portal/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # React components
│   │   └── App.js         # Main application component
│   └── package.json
│
└── server/                 # Backend Node.js application
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    ├── server.js          # Main server file
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 