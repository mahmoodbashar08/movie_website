// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
const app = express();
const multer = require("multer");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { log } = require("console");
const jwtSecretKey = process.env.JWT_SECRET;
const secretKey = jwt.sign({ key: "value" }, "random-secret", {
    expiresIn: "1d",
});

const payload = { username: "exampleuser" };
const options = { expiresIn: "14d" };

const token = jwt.sign(payload, jwtSecretKey, options);
console.log("use");
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

const User = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    profileImgPath: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

console.log("database");
// Set up storage for uploaded profile images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/profile-images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

console.log("photo");
// adding a new account
app.post("/api/register", upload.single("profileImage"), async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        console.log(username, password, email);
        // Check if username or email already exist in database
        const userWithUsername = await User.findOne({ where: { username } });
        const userWithEmail = await User.findOne({ where: { email } });

        if (userWithUsername && userWithEmail) {
            return res.status(400).json({ message: "Account already exists" });
        } else if (userWithUsername) {
            return res.status(400).json({ message: "Account name is taken" });
        } else if (userWithEmail) {
            return res.status(400).json({ message: "Email has an account" });
        }

        const user = await User.create({
            username,
            password,
            email,
            profileImgPath: req.file ? req.file.path : null,
        });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

console.log("validation");
// loging in and checking the validation
app.post("/api/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log("username", username);
        const user = await User.findOne({ where: { username } });
        console.log(user);

        if (!username || !password) {
            return res.status(400).json({ message: "Username or password missing" });
        }

        if (!user) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const payload = { username };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "14d" });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
});

console.log("error");
// Define error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(3001, () => {
    console.log("Server started on port 3001");
});
