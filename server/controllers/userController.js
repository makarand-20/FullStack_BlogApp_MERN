const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");

// register user
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check for existing user
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({ message: "User already exists" });
    }
    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hash,
    });
    // Check for errors about user
    if (!user) {
        return res.status(400).json({ message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ message: "User created successfully", user });
    }
});

// login user
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exists" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
        }
    }, process.env.JWT_SECRET, 
    { expiresIn: "1d" });

    // Check for errors about token
    if (!token) {
        return res.status(400).json({ message: "Something went wrong | Invalide User" });
    }
    else {
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
        });
    }
});

//verify token
const verifyToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "Invalid token" });
            } 
            req.user = decodedToken.user;
            next();
        });
    }
    if (!token) {
        return res.status(400).json({ message: "No token, authorization denied" });
    }
});

// get current user
const userCurrent = asyncHandler(async (req, res) => {
    res.json(req.user);
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password -__v -createdAt -updatedAt");
    return res.status(200).json({ 
        UserCount: users.length,
        users
     });
});

// get user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password -__v -createdAt -updatedAt");
    if (user) {
        return res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});

module.exports = {
    userRegister,
    userLogin,
    verifyToken,
    userCurrent,
    getAllUsers,
    getUserById
};
