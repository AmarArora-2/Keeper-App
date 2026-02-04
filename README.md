# 📝 Keeper - Note Taking Application

![Keeper App Banner](https://via.placeholder.com/1200x300/D980E8/ffffff?text=Keeper+Notes+App)

> A beautiful, full-stack note-taking application built with the PERN stack featuring secure authentication, elegant UI, and seamless user experience.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://keeper-app-note.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/AmarArora-2/Keeper-App)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🌟 Features

✨ **Secure Authentication**
- JWT-based authentication system
- Google OAuth 2.0 integration with Passport.js
- Encrypted password storage using bcrypt

📝 **Note Management**
- Create, read, update, and delete notes
- Real-time data synchronization with backend
- Long-press delete confirmation for better UX

🎨 **Beautiful UI/UX**
- Stunning purple-pink gradient theme
- Glassmorphism design effects
- Smooth animations and transitions
- Material-UI components with custom styling
- Responsive design for all device sizes

⚡ **Performance & Deployment**
- Fast API response times (<200ms)
- PostgreSQL connection pooling
- Deployed on Vercel (frontend) and Render (backend)
- CI/CD pipeline with automatic deployments

## 🚀 Live Demo

**Frontend:** [https://keeper-app-note.vercel.app](https://keeper-app-note.vercel.app)  
**Backend API:** [https://keeper-app-4ce4.onrender.com](https://keeper-app-4ce4.onrender.com)

### Test Credentials
Email: demo@example.com
Password: Demo123!

*Or sign in with Google for instant access*

## 📸 Screenshots

<div align="center">
  <img src="./keeper-frontend/Screenshot/auth-page.png" alt="Authentication Page" width="45%">
  <img src="./keeper-frontend/Screenshot/notes-page.png" alt="Notes Page" width="45%">
</div>

<div align="center">
  <img src="./keeper-frontend/Screenshot/create-note.png" alt="Create Note" width="45%">
  <img src="./keeper-frontend/Screenshot/mobile-view.png" alt="Mobile View" width="45%">
</div>

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-007FFF?style=flat-square&logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18.x-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=json-web-tokens&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-OAuth-34E27A?style=flat-square&logo=passport&logoColor=white)

### DevOps
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-CI/CD-181717?style=flat-square&logo=github&logoColor=white)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn
- Git

### Clone the Repository

# Clone frontend
git clone link
cd keeper-frontend

# Clone backend
git clone link
cd keeper-backend

# Backend Setup
Install dependencies

    bash
    cd backend
    npm install
    Create PostgreSQL database

sql
    CREATE DATABASE keeper_app;
    Create database tables

sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_users_email ON users(email);

Create .env file in backend root:

# Server
NODE_ENV=development
PORT=5000

# Database (Local)
PG_USER=your_username
PG_HOST=localhost
PG_DATABASE=keeper_app
PG_PASSWORD=your_password
PG_PORT=5432

# Database (Production - for deployment)
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
CLIENT_URL=http://localhost:5173

# Get Google OAuth Credentials

1. Go to Google Cloud Console
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: http://localhost:5000/api/auth/google/callback
6. Copy Client ID and Client Secret to .env

Start backend server:
    npm start
    # or for development
    npm run dev

Server runs on: http://localhost:5000

# Frontend Setup:
    Install dependencies: cd frontend
    npm install

Create .env file in frontend root:
    VITE_API_URL=http://localhost:5000

Start development server: 
    npm run dev
    App runs on: http://localhost:5173

# Usage
1.    Sign Up / Sign In
2.    Create a new account with email and password
3.    Or use Google Sign-In for quick access
4.    Create Notes
5.    Click on the "Title" field to expand the form
6.    Enter note title and content
7.    Click the "+" button to save
8.    Edit Notes
9.    Click the edit icon (pencil) on any note
10.   Modify title or content
11.   Click save icon to update
12.   Delete Notes
13.   Long-press the delete icon (trash) for 1 second
14.   Note will be deleted with smooth animation
15.   Progress bar shows deletion status

# 🏗️ Project Structure
Frontend:

keeper-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx
│   │   ├── NotesPage.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Note.jsx
│   │   ├── CreateArea.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js
│   ├── CSS/
│   │   ├── Auth.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Note.css
│   │   ├── NotesPage.css
│   │   └── CreateArea.css
│   ├── AuthContext.jsx
│   ├── AuthProvider.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── vercel.json

Backend:
keeper-backend/
├── config/
│   ├── PostgreSQLDB.js
│   └── passport.js
├── routes/
│   ├── auth.js
│   └── notes.js
├── middleware/
│   └── auth.js
├── .env
├── .gitignore
├── package.json
└── server.js

# 🔌 API Endpoints:
Authentication:
    POST   /api/auth/register          - Register new user
    POST   /api/auth/login             - Login user
    GET    /api/auth/google            - Initiate Google OAuth
    GET    /api/auth/google/callback   - Google OAuth callback
    GET    /api/auth/verify            - Verify JWT token

Notes:
    GET    /api/notes                  - Get all notes (authenticated)
    POST   /api/notes                  - Create new note
    PUT    /api/notes/:id              - Update note
    DELETE /api/notes/:id              - Delete note

# 🚀 Deployment:

Frontend (Vercel)

1. Push code to GitHub:
    git add .
    git commit -m "Initial commit"
    git push origin main

2. Deploy on Vercel:

    Go to vercel.com
    Import your GitHub repository
    Add environment variable: VITE_API_URL=https://your-backend.onrender.com
    Deploy!

3. Create vercel.json:
    {
        "rewrites": [
            { "source": "/(.*)", "destination": "/index.html" }
        ]
    }

Backend (Render):

1. Push code to GitHub: 
    git add .
    git commit -m "Initial commit"
    git push origin main

2. Create PostgreSQL Database on Render:
    Go to render.com
    New → PostgreSQL
    Copy Internal Database URL

3. Deploy Backend:
    New → Web Service
    Connect GitHub repository
    Add environment variables:
        DATABASE_URL=<your-internal-db-url>
        JWT_SECRET=<your-secret>
        NODE_ENV=production
        CLIENT_URL=https://your-app.vercel.app
        GOOGLE_CLIENT_ID=<your-id>
        GOOGLE_CLIENT_SECRET=<your-secret>

    Deploy!

# Customization:

Change Theme Colors
Edit the CSS variables in your component files:
    :root {
    --purple-primary: #D980E8;
    --pink-primary: #FF8CE4;
    --lavender-light: #D599FF;
    --purple-deep: #A080E8;
    --blue-purple: #918CFF;
    }

# Modify Authentication Flow

Edit AuthProvider.jsx to customize login/logout behavior.

Add New Features:
    Tags/Categories for notes
    Search functionality
    Rich text editor
    Note sharing
    Dark mode
    Export notes as PDF

# Contributing
Contributions are welcome! Please follow these steps:

    Fork the repository
    Create a feature branch (git checkout -b feature/AmazingFeature)
    Commit your changes (git commit -m 'Add some AmazingFeature')
    Push to the branch (git push origin feature/AmazingFeature)
    Open a Pull Request

# Known Issues:
    Free tier on Render may cause 30-60 second cold start on first request
    Google OAuth requires proper callback URL configuration

# 👨‍💻 Author
    Amar Arora
    GitHub: https://github.com/AmarArora-2
    LinkedIn: https://www.linkedin.com/in/amar-arora-2a7c/
    Email: amararora456@gmail.com

# 🙏 Acknowledgments
    React - Frontend framework
    Material-UI - UI components
    Vercel - Frontend hosting
    Render - Backend hosting
    PostgreSQL - Database
    Google OAuth for authentication

<div align="center"> <p>Made with ❤️ using PERN Stack</p> <p>© 2026 Keeper App. All rights reserved.</p> </div> ```
