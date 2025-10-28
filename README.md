CipherStudio - Browser-Based React IDE 🚀
https://img.shields.io/badge/CipherStudio-React%2520IDE-blue
https://img.shields.io/badge/version-1.0.0-green
https://img.shields.io/badge/license-MIT-brightgreen

A powerful, browser-based React IDE that lets you write, preview, and manage React projects directly in your browser - no setup required!

✨ Features
🎯 Core Features
📝 Code Editor - Write React code with syntax highlighting and auto-completion

👀 Live Preview - Real-time preview of your React components

📁 File Management - Create, delete, and organize project files

💾 Project Persistence - Save and load projects from cloud storage

🔐 User Authentication - Secure login/register system

🚀 Advanced Features
🌙 Dark/Light Theme - Toggle between themes for comfortable coding

⚡ Real-time Updates - See changes instantly as you type

📱 Responsive Design - Works perfectly on desktop and tablet

🔄 Auto-save - Automatic project saving (toggle on/off)

🎨 Tailwind CSS - Built-in Tailwind support for styling

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks

Vite - Fast build tool and dev server

Tailwind CSS - Utility-first CSS framework

Sandpack - Code editor and preview component

React Router - Client-side routing

Lucide React - Beautiful icons

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database for project storage

JWT - Authentication tokens

bcryptjs - Password hashing

Mongoose - MongoDB object modeling

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

MongoDB (local or Atlas)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/your-username/cipherstudio.git
cd cipherstudio
Backend Setup

bash
cd backend
npm install

# Create environment file
cp .env.example .env
Frontend Setup

bash
cd ../frontend
npm install
Environment Configuration

Backend (.env)

env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
Frontend (.env)

env
VITE_API_BASE_URL=http://localhost:5000
Running the Application
Start Backend Server

bash
cd backend
npm run dev
Server will run on http://localhost:5000

Start Frontend Development Server

bash
cd frontend
npm run dev
Application will open on http://localhost:3000

Access the Application

Open your browser and go to http://localhost:3000

Register a new account or login

Start creating React projects!


```cipherstudio/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── projectRoutes.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── IDE.jsx
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js




🎮 How to Use
1. Authentication
Register: Create a new account with username, email, and password

Login: Sign in to access your projects

2. Project Management
Create Project: Click "New Project" from dashboard

Open Project: Click on any project card to open the IDE

Edit Project: Click edit icon to rename projects

Delete Project: Click trash icon to remove projects

3. Coding in IDE
File Explorer: Left sidebar to manage files

Code Editor: Middle section for writing code

Live Preview: Right section to see output

New Files: Click "New File" to add components, styles, etc.

4. Features in Action
Real-time Changes: Type code and see instant updates

Multiple Files: Work with JSX, JavaScript, CSS files

Auto-save: Projects automatically save (can be toggled)

Theme Toggle: Switch between dark/light modes

🔌 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

Projects
GET /api/projects - Get user's projects

POST /api/projects - Create new project

GET /api/projects/:projectId - Get specific project

PUT /api/projects/:projectId - Update project

DELETE /api/projects/:projectId - Delete project

🎯 Default Project Structure
When you create a new project, you get these starter files:

text
📁 Your Project
├── 🟦 App.jsx (Main component)
├── 🟨 index.js (Entry point)
├── 🟪 index.css (Styles)
└── 📄 package.json (Dependencies)
🛠 Development
Backend Development
bash
cd backend
npm run dev  # Development with nodemon
npm start    # Production
npm test     # Run tests
Frontend Development
bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Code linting
Environment Variables
Backend (.env)

env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/cipherstudio

# Security
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=30d
BCRYPT_SALT_ROUNDS=12

# CORS
FRONTEND_URL=http://localhost:3000
Frontend (.env)

env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=CipherStudio
VITE_APP_VERSION=1.0.0
🚀 Deployment
Backend Deployment (Render/Railway)
Push code to GitHub

Connect repository to Render/Railway

Set environment variables

Deploy!

Frontend Deployment (Vercel/Netlify)
Build the project: npm run build

Deploy dist folder to Vercel/Netlify

Set environment variables

Configure redirects for SPA

MongoDB Setup
Local: Install MongoDB locally

Atlas: Create free cluster on MongoDB Atlas

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

Code Style
Use consistent formatting

Follow React best practices

Add comments for complex logic

Test your changes thoroughly

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Troubleshooting
Common Issues
Tailwind CSS not working

Check PostCSS configuration

Verify Tailwind directives in CSS

Restart development server

MongoDB connection issues

Check if MongoDB is running

Verify connection string in .env

Ensure network access for Atlas

Authentication errors

Check JWT secret

Verify password hashing

Clear browser localStorage

Sandpack not updating

Check file paths start with /

Verify dependencies in customSetup

Check browser console for errors

Getting Help
Check the browser console for errors

Verify all environment variables are set

Ensure all dependencies are installed

Check network tab for failed API calls

🌟 Future Enhancements
GitHub integration

Collaborative editing

More templates (Next.js, Vue, etc.)

Export to GitHub functionality

Folder structure support

Component library

Deployment options

Code formatting

Keyboard shortcuts

📞 Support
If you encounter any issues or have questions:

Check the troubleshooting section

Search existing issues

Create a new issue with details about your problem

🙏 Acknowledgments
Sandpack for the amazing code editor

Tailwind CSS for the utility-first CSS

Lucide for beautiful icons

Vite for the fast build tool

Built with ❤️ using React, Node.js, and MongoDB

Start coding your next React project instantly with CipherStudio! 🎉

