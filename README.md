# User Authentication System

A secure Node.js authentication system with MongoDB Atlas integration, featuring user registration, login functionality, and session management.

## 🚀 Features

- User Registration with validation
- Secure Login system
- MongoDB Atlas Database integration
- Password Hashing with bcrypt
- JWT (JSON Web Token) Authentication
- Session Management
- Responsive UI with Tailwind CSS

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication mechanism
- **bcrypt** - Password hashing
- **EJS** - Templating engine
- **Tailwind CSS** - Styling

## 📋 Prerequisites

- Node.js installed
- MongoDB Atlas account
- Git

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditya3singh/PRODIGY_BD_03.git
   cd PRODIGY_BD_03
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🔐 API Endpoints

- **POST /auth/register** - Register new user
- **POST /auth/login** - User login
- **GET /auth/profile** - Get user profile (Protected route)
- **GET /auth/logout** - Logout user

## �� Project Structure