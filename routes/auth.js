const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the User model is correct
const nodemailer = require("nodemailer");
const router = express.Router();

// 🔐 Secret Key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ✅ Middleware for Authentication
const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token; // Ensure `cookie-parser` is used in `app.js/server.js`
    if (!token) {
        return res.status(401).json({ status: "error", message: "Access Denied! No token provided." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: "error", message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

// ✅ Middleware for Role-Based Authorization
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ status: "error", message: "Forbidden: You don't have permission." });
        }
        next();
    };
};

// ✅ **GET Register Page**
router.get("/register", (req, res) => {
    res.render("register"); // Ensure views/register.ejs exists
});

// ✅ **GET Login Page**
router.get("/login", (req, res) => {
    res.render("login"); // Ensure views/login.ejs exists
});

// ✅ Register User (POST)
router.post("/register", async (req, res) => {
    try {
        console.log("Registration body:", req.body);
        const { username, email, password, confirmPassword } = req.body;

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ 
                status: "error", 
                message: "All fields are required!" 
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ 
                status: "error", 
                message: "Passwords do not match!" 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                status: "error", 
                message: "User already exists!" 
            });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        
        await newUser.save();
        console.log("New user saved successfully:", {
            username: newUser.username,
            email: newUser.email
        });

        return res.status(201).json({
            status: "success",
            message: "Registration successful! Please login."
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ 
            status: "error", 
            message: err.message || "Server error! Please try again later." 
        });
    }
});

// ✅ Login User (POST)
router.post("/login", async (req, res) => {
    try {
        console.log("Login body:", req.body);
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                status: "error", 
                message: "Email and password are required!" 
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ 
                status: "error", 
                message: "User not found!" 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid credentials!" 
            });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        res.json({ 
            status: "success", 
            message: "Login successful!",
            redirect: "/auth/profile"
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ 
            status: "error", 
            message: "Server error! Please try again later." 
        });
    }
});

// ✅ Forgot Password (POST) - Sends Reset Link
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: "error", message: "User not found!" });
        }

        const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "15m" });

        // Email Configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            text: `Click the link to reset your password: http://localhost:3000/auth/reset-password/${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ status: "error", message: "Email not sent!" });
            }
            res.json({ status: "success", message: "✅ Password reset link sent to your email!" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error!" });
    }
});

// ✅ Reset Password (POST) - Resets User Password
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ status: "error", message: "Passwords do not match!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid or expired token!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ status: "success", message: "✅ Password reset successful! Please log in." });
    } catch (err) {
        res.status(400).json({ status: "error", message: "Invalid or expired token!" });
    }
});

// ✅ Profile (Protected Route)
router.get("/profile", authenticateToken, (req, res) => {
    res.render("profile");
});

// ✅ Admin-Only Route (Protected)
router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json({ status: "success", message: "Welcome, Admin! You have access to this protected route." });
});

// ✅ Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth/login");
});

module.exports = router;
