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

## 📁 Project Structure

```
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── profile.ejs
├── .env
├── .gitignore
├── server.js
└── README.md
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT for secure authentication
- HTTP-only cookies
- Input validation
- MongoDB Atlas security features

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/aditya3singh/PRODIGY_BD_03/issues).

## 👤 Author

**Aditya Singh**
- GitHub: [@aditya3singh](https://github.com/aditya3singh)

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🙏 Acknowledgments

- MongoDB Atlas Documentation
- Node.js Community
- Express.js Documentation


![Screenshot (805)](https://github.com/user-attachments/assets/fc0eb595-4faf-44f9-b752-ff29d9cb9062)
![Screenshot (806)](https://github.com/user-attachments/assets/d04ebc7c-ed83-4716-ad0d-7d7f41e944a3)
![Screenshot (807)](https://github.com/user-attachments/assets/ab9cca68-e052-4e69-b4b4-007961e7f3d7)


