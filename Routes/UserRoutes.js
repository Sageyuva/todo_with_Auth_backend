const UserModel = require("../Models/UserModel");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get("/getusers", (req, res) => {
    try {
        res.json("routes are working");
    } catch (error) {
        res.status(500).json({ "message": "error connecting route" });
    }
});

// Register user
router.post("/reguser", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
            return res.status(400).json({ "message": "User Already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ "message": "Error while creating user" });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ "message": "User login successful", "id": user._id });
        } else {
            res.status(400).json({ "message": "Wrong password" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Server Error" });
    }
});

module.exports = router;
