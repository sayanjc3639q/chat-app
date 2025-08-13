# Real-time Chat Application

A full-stack real-time chat application built with React.js, Node.js, Socket.IO, and MongoDB.

## Features

- User registration and authentication with JWT
- Real-time messaging using Socket.IO
- User search functionality
- One-to-one chat rooms
- Responsive design with Tailwind CSS
- Message history persistence
- Text-only messages (300 characters max)

## Project Structure

```
.
├── backend/                 # Backend server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── index.js           # Server entry point
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── context/       # React context
    │   └── utils/         # Utility functions
    └── index.html
```

## Prerequisites

- Node.js >= 16.0.0
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chat-application
   ```

2. Backend Setup:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. Frontend Setup:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env if your backend URL is different
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - MONGODB_URI
     - JWT_SECRET
     - PORT (optional)
     - FRONTEND_URL (your Netlify URL)

### Frontend (Netlify)

1. Login to Netlify
2. Import your GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     - VITE_API_URL (your Render backend URL)

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/chat_app
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Routes

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users/search?username=query` - Search users

### Messages
- GET `/api/messages/:userId` - Get chat history with user

## License

MIT
